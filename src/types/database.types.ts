export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      subscribers: {
        Row: {
          id: string;
          email: string;
          type: 'free' | 'paid';
          status: string;
          new_user: boolean;
          welcome_email_sent: boolean;
          subscription_date: string;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          type?: 'free' | 'paid';
          status?: string;
          new_user?: boolean;
          welcome_email_sent?: boolean;
          subscription_date?: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          type?: 'free' | 'paid';
          status?: string;
          new_user?: boolean;
          welcome_email_sent?: boolean;
          subscription_date?: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
