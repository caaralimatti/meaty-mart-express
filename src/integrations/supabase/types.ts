export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
      sellers: {
        Row: {
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
      [_ in never]: never
    }
    Enums: {
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
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
