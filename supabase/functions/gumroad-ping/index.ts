import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-signature',
};

interface GumroadPayload {
  sale_id: string;
  email: string;
  product_name?: string;
  price?: number;
  license_key?: string;
  timestamp?: string;
  event?: string;
}

// Verify Gumroad webhook signature using HMAC-SHA256
async function verifySignature(
  bodyText: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const bodyData = encoder.encode(bodyText);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, bodyData);
  const computedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return computedSignature === signature;
}

export const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get signature from headers
    const signature = req.headers.get('x-signature');
    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'Missing X-Signature header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get application secret
    const appSecret = Deno.env.get('GUMROAD_APPLICATION_SECRET');
    if (!appSecret) {
      throw new Error('Missing GUMROAD_APPLICATION_SECRET environment variable');
    }

    // Get raw body for signature verification
    const bodyText = await req.text();

    // Verify signature
    const isValid = await verifySignature(bodyText, signature, appSecret);
    if (!isValid) {
      console.warn('Invalid signature received');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const payload: GumroadPayload = JSON.parse(bodyText);

    // Validate required fields
    if (!payload.sale_id || !payload.email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: sale_id, email' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase credentials');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if subscriber already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('subscribers')
      .select('id, type')
      .eq('email', payload.email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingSubscriber) {
      // Update existing subscriber to paid
      const { error: updateError } = await supabase
        .from('subscribers')
        .update({
          type: 'paid',
          sale_id: payload.sale_id,
          updated_at: new Date().toISOString(),
        })
        .eq('email', payload.email);

      if (updateError) {
        throw updateError;
      }
    } else {
      // Create new paid subscriber
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert({
          email: payload.email,
          type: 'paid',
          sale_id: payload.sale_id,
        });

      if (insertError) {
        throw insertError;
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: `Subscriber ${payload.email} marked as paid`,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Gumroad webhook error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};
