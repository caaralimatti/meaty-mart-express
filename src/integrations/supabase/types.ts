export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      customers: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          location_latitude: number | null
          location_longitude: number | null
          phone_number: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          location_latitude?: number | null
          location_longitude?: number | null
          phone_number: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          location_latitude?: number | null
          location_longitude?: number | null
          phone_number?: string
          updated_at?: string
          user_id?: string | null
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
          id: string
          is_active: boolean | null
          name: string
          nutritional_info_id: string | null
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
          id?: string
          is_active?: boolean | null
          name: string
          nutritional_info_id?: string | null
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
          id?: string
          is_active?: boolean | null
          name?: string
          nutritional_info_id?: string | null
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
      order_items: {
        Row: {
          created_at: string
          id: string
          livestock_id: string | null
          order_id: string
          product_id: string | null
          product_type: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          livestock_id?: string | null
          order_id: string
          product_id?: string | null
          product_type: string
          quantity?: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          livestock_id?: string | null
          order_id?: string
          product_id?: string | null
          product_type?: string
          quantity?: number
          total_price?: number
          unit_price?: number
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
      orders: {
        Row: {
          created_at: string
          currency: string
          customer_id: string
          delivery_address: string | null
          id: string
          order_number: string
          payment_status: string
          status: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          currency?: string
          customer_id: string
          delivery_address?: string | null
          id?: string
          order_number: string
          payment_status?: string
          status?: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          currency?: string
          customer_id?: string
          delivery_address?: string | null
          id?: string
          order_number?: string
          payment_status?: string
          status?: string
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
      sellers: {
        Row: {
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_at: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          livestock_status: boolean | null
          meat_shop_status: boolean | null
          seller_name: string
          seller_type: Database["public"]["Enums"]["seller_type_enum"]
          updated_at: string
          user_id: string | null
          user_type: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Insert: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          livestock_status?: boolean | null
          meat_shop_status?: boolean | null
          seller_name: string
          seller_type: Database["public"]["Enums"]["seller_type_enum"]
          updated_at?: string
          user_id?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Update: {
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          livestock_status?: boolean | null
          meat_shop_status?: boolean | null
          seller_name?: string
          seller_type?: Database["public"]["Enums"]["seller_type_enum"]
          updated_at?: string
          user_id?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Relationships: []
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
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
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
      pricing_type_enum: ["Fixed", "Negotiable"],
      seller_type_enum: ["Meat", "Livestock", "Both"],
      transportation_type_enum: ["Aggregator", "Seller"],
      user_type_enum: ["customer", "seller"],
    },
  },
} as const
