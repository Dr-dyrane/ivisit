import { supabase } from '../supabase';

export interface SubscriberData {
  email: string;
  type: 'free' | 'paid';
}

export interface SubscriberResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Submit subscriber email to Supabase
 */
export const submitSubscriber = async (
  email: string,
  type: 'free' | 'paid' = 'free'
): Promise<SubscriberResponse> => {
  try {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: '',
        error: 'Invalid email address'
      };
    }

    // Insert subscriber
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email, type }])
      .select();

    if (error) {
      // Check if duplicate email
      if (error.code === '23505' || error.message.includes('duplicate')) {
        return {
          success: false,
          message: '',
          error: 'This email is already subscribed'
        };
      }

      return {
        success: false,
        message: '',
        error: error.message || 'Failed to subscribe. Please try again.'
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        message: '',
        error: 'Failed to create subscription'
      };
    }

    // Trigger welcome email via Edge Function (fire and forget pattern)
    supabase.functions.invoke('sendWelcome', {
      body: { email }
    }).then(({ error }) => {
      if (error) console.error('Failed to send welcome email:', error);
    }).catch(err => {
      console.error('Error invoking welcome email function:', err);
    });

    return {
      success: true,
      message: 'Thank you! Check your inbox soon for early access.'
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      success: false,
      message: '',
      error: errorMessage
    };
  }
};

/**
 * Sign in with Google for Early Access
 */
export const signInWithGoogleForEarlyAccess = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/early-access`,
        queryParams: {
          prompt: 'select_account',
        },
      }
    });
    
    if (error) {
      console.error('Supabase OAuth error:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Google sign-in error:', error);
    
    // Handle common OAuth errors
    if (error instanceof Error) {
      if (error.message.includes('popup') || error.message.includes('window')) {
        throw new Error('Please allow popups for this site to use Google sign-in');
      }
      if (error.message.includes('access_denied')) {
        throw new Error('Google sign-in was cancelled. Please try again.');
      }
    }
    
    throw error;
  }
};

/**
 * Check if email is already subscribed
 */
export const checkSubscriberExists = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (error?.code === 'PGRST116') {
      // Row not found
      return false;
    }

    return !!data;
  } catch {
    return false;
  }
};
