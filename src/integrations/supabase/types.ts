export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      customer_profile_audit: {
        Row: {
          change_reason: string | null
          changed_by: string | null
          created_at: string | null
          customer_id: string | null
          field_name: string
          id: string
          new_value: string | null
          old_value: string | null
        }
        Insert: {
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          customer_id?: string | null
          field_name: string
          id?: string
          new_value?: string | null
          old_value?: string | null
        }
        Update: {
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          customer_id?: string | null
          field_name?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_profile_audit_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          aadhaar_number: string | null
          account_holder_name: string | null
          address: string | null
          bank_account_number: string | null
          business_address: string | null
          business_city: string | null
          business_logo_url: string | null
          business_pincode: string | null
          created_at: string
          delivery_addresses: Json | null
          email: string | null
          fcm_token: string | null
          fssai_license: string | null
          full_name: string
          gstin: string | null
          id: string
          ifsc_code: string | null
          location_latitude: number | null
          location_longitude: number | null
          notification_email: boolean | null
          notification_push: boolean | null
          notification_sms: boolean | null
          odoo_partner_id: number | null
          phone_number: string
          preferences: Json | null
          updated_at: string
          user_id: string | null
          user_type: string | null
        }
        Insert: {
          aadhaar_number?: string | null
          account_holder_name?: string | null
          address?: string | null
          bank_account_number?: string | null
          business_address?: string | null
          business_city?: string | null
          business_logo_url?: string | null
          business_pincode?: string | null
          created_at?: string
          delivery_addresses?: Json | null
          email?: string | null
          fcm_token?: string | null
          fssai_license?: string | null
          full_name: string
          gstin?: string | null
          id?: string
          ifsc_code?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          notification_email?: boolean | null
          notification_push?: boolean | null
          notification_sms?: boolean | null
          odoo_partner_id?: number | null
          phone_number: string
          preferences?: Json | null
          updated_at?: string
          user_id?: string | null
          user_type?: string | null
        }
        Update: {
          aadhaar_number?: string | null
          account_holder_name?: string | null
          address?: string | null
          bank_account_number?: string | null
          business_address?: string | null
          business_city?: string | null
          business_logo_url?: string | null
          business_pincode?: string | null
          created_at?: string
          delivery_addresses?: Json | null
          email?: string | null
          fcm_token?: string | null
          fssai_license?: string | null
          full_name?: string
          gstin?: string | null
          id?: string
          ifsc_code?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          notification_email?: boolean | null
          notification_push?: boolean | null
          notification_sms?: boolean | null
          odoo_partner_id?: number | null
          phone_number?: string
          preferences?: Json | null
          updated_at?: string
          user_id?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      data_deletion_requests: {
        Row: {
          created_at: string
          email: string | null
          id: string
          notes: string | null
          phone_number: string | null
          processed_at: string | null
          processed_by: string | null
          reason: string | null
          requested_at: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          notes?: string | null
          phone_number?: string | null
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          notes?: string | null
          phone_number?: string | null
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      delivery_fee_configs: {
        Row: {
          calibration_multiplier: number
          config_name: string
          created_at: string
          dynamic_multipliers: Json
          free_delivery_threshold: number | null
          id: string
          is_active: boolean
          last_modified_by: string | null
          max_fee: number
          max_serviceable_distance_km: number
          min_fee: number
          scope: string
          tier_rates: Json
          updated_at: string
          use_routing: boolean
          version: number
        }
        Insert: {
          calibration_multiplier?: number
          config_name?: string
          created_at?: string
          dynamic_multipliers?: Json
          free_delivery_threshold?: number | null
          id?: string
          is_active?: boolean
          last_modified_by?: string | null
          max_fee?: number
          max_serviceable_distance_km?: number
          min_fee?: number
          scope: string
          tier_rates?: Json
          updated_at?: string
          use_routing?: boolean
          version?: number
        }
        Update: {
          calibration_multiplier?: number
          config_name?: string
          created_at?: string
          dynamic_multipliers?: Json
          free_delivery_threshold?: number | null
          id?: string
          is_active?: boolean
          last_modified_by?: string | null
          max_fee?: number
          max_serviceable_distance_km?: number
          min_fee?: number
          scope?: string
          tier_rates?: Json
          updated_at?: string
          use_routing?: boolean
          version?: number
        }
        Relationships: []
      }
      dev_api_logs: {
        Row: {
          created_at: string | null
          endpoint: string | null
          error: string | null
          id: string
          method: string | null
          payload: Json | null
          status: number | null
        }
        Insert: {
          created_at?: string | null
          endpoint?: string | null
          error?: string | null
          id?: string
          method?: string | null
          payload?: Json | null
          status?: number | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string | null
          error?: string | null
          id?: string
          method?: string | null
          payload?: Json | null
          status?: number | null
        }
        Relationships: []
      }
      districts: {
        Row: {
          id: number
          name: string
          state_id: number
        }
        Insert: {
          id?: number
          name: string
          state_id: number
        }
        Update: {
          id?: number
          name?: string
          state_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "districts_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      edge_function_logs: {
        Row: {
          api_call_count: number | null
          caller_ip: unknown | null
          created_at: string | null
          created_by: string | null
          dry_run: boolean | null
          endpoint: string
          error_rate_percent: number | null
          flags: Json | null
          id: string
          latency_ms: number | null
          request: Json | null
          response: Json | null
          status: number
          ts: string | null
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          api_call_count?: number | null
          caller_ip?: unknown | null
          created_at?: string | null
          created_by?: string | null
          dry_run?: boolean | null
          endpoint: string
          error_rate_percent?: number | null
          flags?: Json | null
          id?: string
          latency_ms?: number | null
          request?: Json | null
          response?: Json | null
          status: number
          ts?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          api_call_count?: number | null
          caller_ip?: unknown | null
          created_at?: string | null
          created_by?: string | null
          dry_run?: boolean | null
          endpoint?: string
          error_rate_percent?: number | null
          flags?: Json | null
          id?: string
          latency_ms?: number | null
          request?: Json | null
          response?: Json | null
          status?: number
          ts?: string | null
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      feature_flag_changes: {
        Row: {
          change_reason: string | null
          changed_by: string | null
          created_at: string | null
          flag_name: string
          id: string
          new_value: boolean
          old_value: boolean | null
        }
        Insert: {
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          flag_name: string
          id?: string
          new_value: boolean
          old_value?: boolean | null
        }
        Update: {
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          flag_name?: string
          id?: string
          new_value?: boolean
          old_value?: boolean | null
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          created_at: string | null
          description: string | null
          enabled: boolean | null
          feature_name: string
          id: string
          target_user_percentage: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          feature_name: string
          id?: string
          target_user_percentage?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          enabled?: boolean | null
          feature_name?: string
          id?: string
          target_user_percentage?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      livestock_approvals: {
        Row: {
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_at: string | null
          created_at: string | null
          id: string
          livestock_listing_id: string | null
          odoo_product_id: number | null
          rejected_at: string | null
          rejection_reason: string | null
          submitted_at: string | null
          updated_at: string | null
          webhook_id: string | null
        }
        Insert: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          created_at?: string | null
          id?: string
          livestock_listing_id?: string | null
          odoo_product_id?: number | null
          rejected_at?: string | null
          rejection_reason?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          webhook_id?: string | null
        }
        Update: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          created_at?: string | null
          id?: string
          livestock_listing_id?: string | null
          odoo_product_id?: number | null
          rejected_at?: string | null
          rejection_reason?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          webhook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "livestock_approvals_livestock_listing_id_fkey"
            columns: ["livestock_listing_id"]
            isOneToOne: false
            referencedRelation: "livestock_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      livestock_images: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          is_live_capture: boolean | null
          livestock_listing_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          is_live_capture?: boolean | null
          livestock_listing_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          is_live_capture?: boolean | null
          livestock_listing_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "livestock_images_livestock_listing_id_fkey"
            columns: ["livestock_listing_id"]
            isOneToOne: false
            referencedRelation: "livestock_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      livestock_listings: {
        Row: {
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_at: string | null
          category: string
          created_at: string
          description: string | null
          district_id: number
          id: string
          name: string
          pricing_type: Database["public"]["Enums"]["pricing_type_enum"]
          seller_id: string
          state_id: number
          status: Database["public"]["Enums"]["listing_status_enum"] | null
          transportation_type: Database["public"]["Enums"]["transportation_type_enum"]
          unit_of_measure: string | null
          unit_price: number | null
          updated_at: string
          vaccination_report_url: string | null
          video_url: string | null
        }
        Insert: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          category: string
          created_at?: string
          description?: string | null
          district_id: number
          id?: string
          name: string
          pricing_type: Database["public"]["Enums"]["pricing_type_enum"]
          seller_id: string
          state_id: number
          status?: Database["public"]["Enums"]["listing_status_enum"] | null
          transportation_type: Database["public"]["Enums"]["transportation_type_enum"]
          unit_of_measure?: string | null
          unit_price?: number | null
          updated_at?: string
          vaccination_report_url?: string | null
          video_url?: string | null
        }
        Update: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          category?: string
          created_at?: string
          description?: string | null
          district_id?: number
          id?: string
          name?: string
          pricing_type?: Database["public"]["Enums"]["pricing_type_enum"]
          seller_id?: string
          state_id?: number
          status?: Database["public"]["Enums"]["listing_status_enum"] | null
          transportation_type?: Database["public"]["Enums"]["transportation_type_enum"]
          unit_of_measure?: string | null
          unit_price?: number | null
          updated_at?: string
          vaccination_report_url?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "livestock_listings_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "livestock_listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "livestock_listings_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      meat_product_images: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_url: string
          meat_product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url: string
          meat_product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string
          meat_product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meat_product_images_meat_product_id_fkey"
            columns: ["meat_product_id"]
            isOneToOne: false
            referencedRelation: "meat_products"
            referencedColumns: ["id"]
          },
        ]
      }
      meat_products: {
        Row: {
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_at: string | null
          created_at: string
          description: string | null
          extra_metadata: Json | null
          id: string
          is_active: boolean | null
          name: string
          nutritional_info_id: string | null
          odoo_product_id: number | null
          price: number
          seller_id: string
          stock: number | null
          updated_at: string
        }
        Insert: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          created_at?: string
          description?: string | null
          extra_metadata?: Json | null
          id?: string
          is_active?: boolean | null
          name: string
          nutritional_info_id?: string | null
          odoo_product_id?: number | null
          price: number
          seller_id: string
          stock?: number | null
          updated_at?: string
        }
        Update: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          created_at?: string
          description?: string | null
          extra_metadata?: Json | null
          id?: string
          is_active?: boolean | null
          name?: string
          nutritional_info_id?: string | null
          odoo_product_id?: number | null
          price?: number
          seller_id?: string
          stock?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meat_products_nutritional_info_id_fkey"
            columns: ["nutritional_info_id"]
            isOneToOne: false
            referencedRelation: "nutritional_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meat_products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_logs: {
        Row: {
          created_at: string | null
          customer_id: string | null
          delivered_at: string | null
          delivery_attempts: number | null
          delivery_method: string
          delivery_status: string | null
          error_message: string | null
          external_id: string | null
          id: string
          message: string
          notification_type: string
          recipient_email: string | null
          recipient_phone: string | null
          scheduled_at: string | null
          seller_id: string | null
          sent_at: string | null
          template_id: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          delivery_attempts?: number | null
          delivery_method: string
          delivery_status?: string | null
          error_message?: string | null
          external_id?: string | null
          id?: string
          message: string
          notification_type: string
          recipient_email?: string | null
          recipient_phone?: string | null
          scheduled_at?: string | null
          seller_id?: string | null
          sent_at?: string | null
          template_id?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          delivered_at?: string | null
          delivery_attempts?: number | null
          delivery_method?: string
          delivery_status?: string | null
          error_message?: string | null
          external_id?: string | null
          id?: string
          message?: string
          notification_type?: string
          recipient_email?: string | null
          recipient_phone?: string | null
          scheduled_at?: string | null
          seller_id?: string | null
          sent_at?: string | null
          template_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "notification_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          customer_id: string | null
          email_enabled: boolean | null
          id: string
          order_notifications: boolean | null
          promotion_notifications: boolean | null
          push_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          review_notifications: boolean | null
          seller_id: string | null
          sms_enabled: boolean | null
          system_notifications: boolean | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          email_enabled?: boolean | null
          id?: string
          order_notifications?: boolean | null
          promotion_notifications?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          review_notifications?: boolean | null
          seller_id?: string | null
          sms_enabled?: boolean | null
          system_notifications?: boolean | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          email_enabled?: boolean | null
          id?: string
          order_notifications?: boolean | null
          promotion_notifications?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          review_notifications?: boolean | null
          seller_id?: string | null
          sms_enabled?: boolean | null
          system_notifications?: boolean | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_preferences_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          delivery_methods: Json | null
          id: string
          is_active: boolean | null
          message_template: string
          template_name: string
          template_type: string
          template_variables: Json | null
          title_template: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          delivery_methods?: Json | null
          id?: string
          is_active?: boolean | null
          message_template: string
          template_name: string
          template_type: string
          template_variables?: Json | null
          title_template: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          delivery_methods?: Json | null
          id?: string
          is_active?: boolean | null
          message_template?: string
          template_name?: string
          template_type?: string
          template_variables?: Json | null
          title_template?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      nutritional_info: {
        Row: {
          calories_kcal_per_100g: number | null
          carbohydrates_g_per_100g: number | null
          created_at: string
          fat_g_per_100g: number | null
          id: string
          meat_type: string
          other_nutrients_json: Json | null
          protein_g_per_100g: number | null
        }
        Insert: {
          calories_kcal_per_100g?: number | null
          carbohydrates_g_per_100g?: number | null
          created_at?: string
          fat_g_per_100g?: number | null
          id?: string
          meat_type: string
          other_nutrients_json?: Json | null
          protein_g_per_100g?: number | null
        }
        Update: {
          calories_kcal_per_100g?: number | null
          carbohydrates_g_per_100g?: number | null
          created_at?: string
          fat_g_per_100g?: number | null
          id?: string
          meat_type?: string
          other_nutrients_json?: Json | null
          protein_g_per_100g?: number | null
        }
        Relationships: []
      }
      odoo_session_logs: {
        Row: {
          attempt_timestamp: string | null
          caller_ip: unknown | null
          created_at: string | null
          endpoint_called: string | null
          failure_reason: string | null
          id: string
          session_id: string | null
          set_cookie_seen: boolean | null
          success: boolean
          uid_present: boolean | null
          user_agent: string | null
        }
        Insert: {
          attempt_timestamp?: string | null
          caller_ip?: unknown | null
          created_at?: string | null
          endpoint_called?: string | null
          failure_reason?: string | null
          id?: string
          session_id?: string | null
          set_cookie_seen?: boolean | null
          success: boolean
          uid_present?: boolean | null
          user_agent?: string | null
        }
        Update: {
          attempt_timestamp?: string | null
          caller_ip?: unknown | null
          created_at?: string | null
          endpoint_called?: string | null
          failure_reason?: string | null
          id?: string
          session_id?: string | null
          set_cookie_seen?: boolean | null
          success?: boolean
          uid_present?: boolean | null
          user_agent?: string | null
        }
        Relationships: []
      }
      oms_configuration: {
        Row: {
          config_key: string
          config_type: string
          config_value: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          config_key: string
          config_type: string
          config_value: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          config_key?: string
          config_type?: string
          config_value?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          cut_preference: string | null
          id: string
          livestock_id: string | null
          order_id: string
          product_id: string | null
          product_name: string | null
          product_sku: string | null
          product_snapshot: Json | null
          product_type: string
          quantity: number
          special_requests: string | null
          total_price: number
          unit_price: number
          weight_preference: string | null
        }
        Insert: {
          created_at?: string
          cut_preference?: string | null
          id?: string
          livestock_id?: string | null
          order_id: string
          product_id?: string | null
          product_name?: string | null
          product_sku?: string | null
          product_snapshot?: Json | null
          product_type: string
          quantity?: number
          special_requests?: string | null
          total_price: number
          unit_price: number
          weight_preference?: string | null
        }
        Update: {
          created_at?: string
          cut_preference?: string | null
          id?: string
          livestock_id?: string | null
          order_id?: string
          product_id?: string | null
          product_name?: string | null
          product_sku?: string | null
          product_snapshot?: Json | null
          product_type?: string
          quantity?: number
          special_requests?: string | null
          total_price?: number
          unit_price?: number
          weight_preference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_routing_decisions: {
        Row: {
          algorithm_version: string
          decision_score: number | null
          failure_reason: string | null
          fallback_sellers: string[] | null
          id: string
          order_id: string | null
          primary_seller_id: string | null
          routing_completed_at: string | null
          routing_duration_ms: number | null
          routing_factors: Json | null
          routing_successful: boolean | null
        }
        Insert: {
          algorithm_version: string
          decision_score?: number | null
          failure_reason?: string | null
          fallback_sellers?: string[] | null
          id?: string
          order_id?: string | null
          primary_seller_id?: string | null
          routing_completed_at?: string | null
          routing_duration_ms?: number | null
          routing_factors?: Json | null
          routing_successful?: boolean | null
        }
        Update: {
          algorithm_version?: string
          decision_score?: number | null
          failure_reason?: string | null
          fallback_sellers?: string[] | null
          id?: string
          order_id?: string | null
          primary_seller_id?: string | null
          routing_completed_at?: string | null
          routing_duration_ms?: number | null
          routing_factors?: Json | null
          routing_successful?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "order_routing_decisions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_routing_decisions_primary_seller_id_fkey"
            columns: ["primary_seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      order_state_transitions: {
        Row: {
          from_status: Database["public"]["Enums"]["order_status_enum"] | null
          id: string
          metadata: Json | null
          notes: string | null
          order_id: string | null
          to_status: Database["public"]["Enums"]["order_status_enum"]
          transition_reason: string | null
          transitioned_at: string | null
          triggered_by_user_id: string | null
          triggered_by_user_type: string | null
        }
        Insert: {
          from_status?: Database["public"]["Enums"]["order_status_enum"] | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_id?: string | null
          to_status: Database["public"]["Enums"]["order_status_enum"]
          transition_reason?: string | null
          transitioned_at?: string | null
          triggered_by_user_id?: string | null
          triggered_by_user_type?: string | null
        }
        Update: {
          from_status?: Database["public"]["Enums"]["order_status_enum"] | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_id?: string | null
          to_status?: Database["public"]["Enums"]["order_status_enum"]
          transition_reason?: string | null
          transitioned_at?: string | null
          triggered_by_user_id?: string | null
          triggered_by_user_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_state_transitions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          accepted_at: string | null
          actual_delivery_time: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          completed_at: string | null
          confirmed_at: string | null
          created_at: string
          created_by: string | null
          currency: string
          customer_id: string
          delivery_address: string | null
          delivery_coordinates: unknown | null
          delivery_fee: number | null
          estimated_delivery_time: string | null
          expires_at: string | null
          id: string
          order_metadata: Json | null
          order_number: string
          payment_status: string
          special_instructions: string | null
          status: string
          status_enum: Database["public"]["Enums"]["order_status_enum"] | null
          subtotal: number | null
          tax_amount: number | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          actual_delivery_time?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id: string
          delivery_address?: string | null
          delivery_coordinates?: unknown | null
          delivery_fee?: number | null
          estimated_delivery_time?: string | null
          expires_at?: string | null
          id?: string
          order_metadata?: Json | null
          order_number: string
          payment_status?: string
          special_instructions?: string | null
          status?: string
          status_enum?: Database["public"]["Enums"]["order_status_enum"] | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          actual_delivery_time?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          completed_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          customer_id?: string
          delivery_address?: string | null
          delivery_coordinates?: unknown | null
          delivery_fee?: number | null
          estimated_delivery_time?: string | null
          expires_at?: string | null
          id?: string
          order_metadata?: Json | null
          order_number?: string
          payment_status?: string
          special_instructions?: string | null
          status?: string
          status_enum?: Database["public"]["Enums"]["order_status_enum"] | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      otp_rate_limits: {
        Row: {
          created_at: string
          id: string
          phone_number: string
          request_count: number
          updated_at: string
          window_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          phone_number: string
          request_count?: number
          updated_at?: string
          window_start?: string
        }
        Update: {
          created_at?: string
          id?: string
          phone_number?: string
          request_count?: number
          updated_at?: string
          window_start?: string
        }
        Relationships: []
      }
      otp_verifications: {
        Row: {
          attempts: number
          created_at: string
          expires_at: string
          id: string
          otp_code: string
          phone_number: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          attempts?: number
          created_at?: string
          expires_at: string
          id?: string
          otp_code: string
          phone_number: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          attempts?: number
          created_at?: string
          expires_at?: string
          id?: string
          otp_code?: string
          phone_number?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          customer_id: string
          gateway_response: Json | null
          gateway_transaction_id: string | null
          id: string
          order_id: string
          payment_method: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          customer_id: string
          gateway_response?: Json | null
          gateway_transaction_id?: string | null
          id?: string
          order_id: string
          payment_method: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          customer_id?: string
          gateway_response?: Json | null
          gateway_transaction_id?: string | null
          id?: string
          order_id?: string
          payment_method?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      product_approvals: {
        Row: {
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_at: string | null
          created_at: string | null
          id: string
          meat_product_id: string | null
          odoo_product_id: number | null
          rejected_at: string | null
          rejection_reason: string | null
          submitted_at: string | null
          updated_at: string | null
          webhook_id: string | null
        }
        Insert: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          created_at?: string | null
          id?: string
          meat_product_id?: string | null
          odoo_product_id?: number | null
          rejected_at?: string | null
          rejection_reason?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          webhook_id?: string | null
        }
        Update: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          created_at?: string | null
          id?: string
          meat_product_id?: string | null
          odoo_product_id?: number | null
          rejected_at?: string | null
          rejection_reason?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          webhook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_approvals_meat_product_id_fkey"
            columns: ["meat_product_id"]
            isOneToOne: false
            referencedRelation: "meat_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_review_stats: {
        Row: {
          average_rating: number | null
          last_updated: string | null
          product_id: string
          rating_1_count: number | null
          rating_2_count: number | null
          rating_3_count: number | null
          rating_4_count: number | null
          rating_5_count: number | null
          total_reviews: number | null
          verified_average_rating: number | null
          verified_reviews_count: number | null
        }
        Insert: {
          average_rating?: number | null
          last_updated?: string | null
          product_id: string
          rating_1_count?: number | null
          rating_2_count?: number | null
          rating_3_count?: number | null
          rating_4_count?: number | null
          rating_5_count?: number | null
          total_reviews?: number | null
          verified_average_rating?: number | null
          verified_reviews_count?: number | null
        }
        Update: {
          average_rating?: number | null
          last_updated?: string | null
          product_id?: string
          rating_1_count?: number | null
          rating_2_count?: number | null
          rating_3_count?: number | null
          rating_4_count?: number | null
          rating_5_count?: number | null
          total_reviews?: number | null
          verified_average_rating?: number | null
          verified_reviews_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_review_stats_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "meat_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          created_at: string | null
          customer_id: string | null
          helpful_count: number | null
          id: string
          is_verified_purchase: boolean | null
          moderated_at: string | null
          moderated_by: string | null
          moderation_reason: string | null
          moderation_status: string | null
          order_id: string | null
          order_item_id: string | null
          product_id: string | null
          rating: number
          review_images: Json | null
          review_text: string | null
          review_title: string | null
          unhelpful_count: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          helpful_count?: number | null
          id?: string
          is_verified_purchase?: boolean | null
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_reason?: string | null
          moderation_status?: string | null
          order_id?: string | null
          order_item_id?: string | null
          product_id?: string | null
          rating: number
          review_images?: Json | null
          review_text?: string | null
          review_title?: string | null
          unhelpful_count?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          helpful_count?: number | null
          id?: string
          is_verified_purchase?: boolean | null
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_reason?: string | null
          moderation_status?: string | null
          order_id?: string | null
          order_item_id?: string | null
          product_id?: string | null
          rating?: number
          review_images?: Json | null
          review_text?: string | null
          review_title?: string | null
          unhelpful_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "meat_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_transactions: {
        Row: {
          change_reason: string | null
          changed_by: string | null
          created_at: string | null
          id: string
          meat_product_id: string | null
          new_value: Json | null
          old_value: Json | null
          transaction_type: string
        }
        Insert: {
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          id?: string
          meat_product_id?: string | null
          new_value?: Json | null
          old_value?: Json | null
          transaction_type: string
        }
        Update: {
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          id?: string
          meat_product_id?: string | null
          new_value?: Json | null
          old_value?: Json | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_transactions_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_transactions_meat_product_id_fkey"
            columns: ["meat_product_id"]
            isOneToOne: false
            referencedRelation: "meat_products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_webhook_events: {
        Row: {
          created_at: string | null
          dry_run_data: Json | null
          duplicate_check_field: string | null
          duplicate_prevented: boolean | null
          duplicate_value: string | null
          event_data: Json | null
          event_source: string
          event_type: string
          id: string
          new_status: string | null
          old_status: string | null
          product_id: string | null
          seller_id: string | null
        }
        Insert: {
          created_at?: string | null
          dry_run_data?: Json | null
          duplicate_check_field?: string | null
          duplicate_prevented?: boolean | null
          duplicate_value?: string | null
          event_data?: Json | null
          event_source: string
          event_type: string
          id?: string
          new_status?: string | null
          old_status?: string | null
          product_id?: string | null
          seller_id?: string | null
        }
        Update: {
          created_at?: string | null
          dry_run_data?: Json | null
          duplicate_check_field?: string | null
          duplicate_prevented?: boolean | null
          duplicate_value?: string | null
          event_data?: Json | null
          event_source?: string
          event_type?: string
          id?: string
          new_status?: string | null
          old_status?: string | null
          product_id?: string | null
          seller_id?: string | null
        }
        Relationships: []
      }
      review_helpfulness: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          is_helpful: boolean
          review_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          is_helpful: boolean
          review_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          is_helpful?: boolean
          review_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "review_helpfulness_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_helpfulness_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "product_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_approvals: {
        Row: {
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_at: string | null
          created_at: string | null
          id: string
          odoo_partner_id: number | null
          rejected_at: string | null
          rejection_reason: string | null
          seller_id: string | null
          submitted_at: string | null
          updated_at: string | null
          webhook_id: string | null
        }
        Insert: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          created_at?: string | null
          id?: string
          odoo_partner_id?: number | null
          rejected_at?: string | null
          rejection_reason?: string | null
          seller_id?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          webhook_id?: string | null
        }
        Update: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          created_at?: string | null
          id?: string
          odoo_partner_id?: number | null
          rejected_at?: string | null
          rejection_reason?: string | null
          seller_id?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          webhook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seller_approvals_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_capacity: {
        Row: {
          acceptance_rate_percentage: number | null
          availability_status: string | null
          average_acceptance_time_seconds: number | null
          average_preparation_time_minutes: number | null
          current_active_orders: number | null
          current_daily_orders: number | null
          id: string
          is_currently_available: boolean | null
          last_capacity_check: string | null
          manual_override_until: string | null
          max_concurrent_orders: number | null
          max_daily_orders: number | null
          operating_hours: Json | null
          override_reason: string | null
          seller_id: string | null
          updated_at: string | null
        }
        Insert: {
          acceptance_rate_percentage?: number | null
          availability_status?: string | null
          average_acceptance_time_seconds?: number | null
          average_preparation_time_minutes?: number | null
          current_active_orders?: number | null
          current_daily_orders?: number | null
          id?: string
          is_currently_available?: boolean | null
          last_capacity_check?: string | null
          manual_override_until?: string | null
          max_concurrent_orders?: number | null
          max_daily_orders?: number | null
          operating_hours?: Json | null
          override_reason?: string | null
          seller_id?: string | null
          updated_at?: string | null
        }
        Update: {
          acceptance_rate_percentage?: number | null
          availability_status?: string | null
          average_acceptance_time_seconds?: number | null
          average_preparation_time_minutes?: number | null
          current_active_orders?: number | null
          current_daily_orders?: number | null
          id?: string
          is_currently_available?: boolean | null
          last_capacity_check?: string | null
          manual_override_until?: string | null
          max_concurrent_orders?: number | null
          max_daily_orders?: number | null
          operating_hours?: Json | null
          override_reason?: string | null
          seller_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seller_capacity_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: true
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      seller_profile_audit: {
        Row: {
          change_reason: string | null
          changed_by: string | null
          created_at: string | null
          field_name: string
          id: string
          new_value: string | null
          old_value: string | null
          seller_id: string | null
        }
        Insert: {
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          field_name: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          seller_id?: string | null
        }
        Update: {
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          field_name?: string
          id?: string
          new_value?: string | null
          old_value?: string | null
          seller_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seller_profile_audit_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      sellers: {
        Row: {
          aadhaar_number: string | null
          account_holder_name: string | null
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_at: string | null
          bank_account_number: string | null
          business_address: string | null
          business_city: string | null
          business_logo_url: string | null
          business_pincode: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          delivery_radius_km: number | null
          fcm_token: string | null
          fssai_license: string | null
          gstin: string | null
          id: string
          ifsc_code: string | null
          latitude: number | null
          livestock_status: boolean | null
          location_updated_at: string | null
          location_verified: boolean | null
          longitude: number | null
          meat_shop_status: boolean | null
          notification_email: boolean | null
          notification_push: boolean | null
          notification_sms: boolean | null
          odoo_seller_id: number | null
          seller_image_url: string | null
          seller_name: string
          seller_type: Database["public"]["Enums"]["seller_type_enum"]
          shop_image_url: string | null
          updated_at: string
          user_id: string | null
          user_type: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Insert: {
          aadhaar_number?: string | null
          account_holder_name?: string | null
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          bank_account_number?: string | null
          business_address?: string | null
          business_city?: string | null
          business_logo_url?: string | null
          business_pincode?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          delivery_radius_km?: number | null
          fcm_token?: string | null
          fssai_license?: string | null
          gstin?: string | null
          id?: string
          ifsc_code?: string | null
          latitude?: number | null
          livestock_status?: boolean | null
          location_updated_at?: string | null
          location_verified?: boolean | null
          longitude?: number | null
          meat_shop_status?: boolean | null
          notification_email?: boolean | null
          notification_push?: boolean | null
          notification_sms?: boolean | null
          odoo_seller_id?: number | null
          seller_image_url?: string | null
          seller_name: string
          seller_type: Database["public"]["Enums"]["seller_type_enum"]
          shop_image_url?: string | null
          updated_at?: string
          user_id?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Update: {
          aadhaar_number?: string | null
          account_holder_name?: string | null
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          bank_account_number?: string | null
          business_address?: string | null
          business_city?: string | null
          business_logo_url?: string | null
          business_pincode?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          delivery_radius_km?: number | null
          fcm_token?: string | null
          fssai_license?: string | null
          gstin?: string | null
          id?: string
          ifsc_code?: string | null
          latitude?: number | null
          livestock_status?: boolean | null
          location_updated_at?: string | null
          location_verified?: boolean | null
          longitude?: number | null
          meat_shop_status?: boolean | null
          notification_email?: boolean | null
          notification_push?: boolean | null
          notification_sms?: boolean | null
          odoo_seller_id?: number | null
          seller_image_url?: string | null
          seller_name?: string
          seller_type?: Database["public"]["Enums"]["seller_type_enum"]
          shop_image_url?: string | null
          updated_at?: string
          user_id?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Relationships: []
      }
      shopping_cart: {
        Row: {
          added_at: string | null
          customer_id: string | null
          id: string
          product_id: string | null
          quantity: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          added_at?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          quantity: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          added_at?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          quantity?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_cart_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_cart_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "meat_products"
            referencedColumns: ["id"]
          },
        ]
      }
      states: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_review: {
        Args: { moderator_id: string; target_review_id: string }
        Returns: boolean
      }
      calculate_endpoint_error_rate: {
        Args: { endpoint_name: string; time_window?: unknown }
        Returns: number
      }
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_endpoint_call_volume: {
        Args: { endpoint_name: string; time_window?: unknown }
        Returns: number
      }
      initialize_seller_capacity: {
        Args: { p_seller_id: string }
        Returns: boolean
      }
      reject_review: {
        Args: {
          moderator_id: string
          rejection_reason: string
          target_review_id: string
        }
        Returns: boolean
      }
      sanitize_log_data: {
        Args: { data: Json }
        Returns: Json
      }
      update_order_status: {
        Args: {
          p_new_status: Database["public"]["Enums"]["order_status_enum"]
          p_notes?: string
          p_order_id: string
          p_reason?: string
          p_triggered_by?: string
          p_user_type?: string
        }
        Returns: boolean
      }
      update_product_review_stats: {
        Args: { target_product_id: string }
        Returns: undefined
      }
      update_review_helpfulness_counts: {
        Args: { target_review_id: string }
        Returns: undefined
      }
      verify_purchase_for_review: {
        Args: {
          target_customer_id: string
          target_order_id?: string
          target_product_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      approval_status: "pending" | "approved" | "rejected"
      listing_status_enum:
        | "Pending Approval"
        | "Approved"
        | "Rejected"
        | "Sold"
        | "Inactive"
      order_status_enum:
        | "pending"
        | "accepted"
        | "confirmed"
        | "ready_for_pickup"
        | "out_for_delivery"
        | "delivered"
        | "cancelled"
        | "expired"
        | "failed"
      pricing_type_enum: "Fixed" | "Negotiable"
      seller_type_enum: "Meat" | "Livestock" | "Both"
      transportation_type_enum: "Aggregator" | "Seller"
      user_type_enum: "customer" | "seller"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      approval_status: ["pending", "approved", "rejected"],
      listing_status_enum: [
        "Pending Approval",
        "Approved",
        "Rejected",
        "Sold",
        "Inactive",
      ],
      order_status_enum: [
        "pending",
        "accepted",
        "confirmed",
        "ready_for_pickup",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "expired",
        "failed",
      ],
      pricing_type_enum: ["Fixed", "Negotiable"],
      seller_type_enum: ["Meat", "Livestock", "Both"],
      transportation_type_enum: ["Aggregator", "Seller"],
      user_type_enum: ["customer", "seller"],
    },
  },
} as const
