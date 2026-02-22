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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      customers: {
        Row: {
          balance: number | null
          city: string | null
          company: string | null
          created_at: string
          email: string | null
          id: number
          last_order: string | null
          name: string | null
          phone: string | null
        }
        Insert: {
          balance?: number | null
          city?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id?: number
          last_order?: string | null
          name?: string | null
          phone?: string | null
        }
        Update: {
          balance?: number | null
          city?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id?: number
          last_order?: string | null
          name?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      faq_analytics: {
        Row: {
          category: string | null
          created_at: string
          event_type: string
          id: string
          query: string | null
          question: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          event_type: string
          id?: string
          query?: string | null
          question?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          event_type?: string
          id?: string
          query?: string | null
          question?: string | null
        }
        Relationships: []
      }
      financial_documents: {
        Row: {
          ai_category_suggestion: string | null
          ai_summary: string | null
          amount: number | null
          category: string | null
          created_at: string
          currency: string | null
          doc_date: string | null
          doc_number: string | null
          doc_type: string
          due_date: string | null
          file_urls: string[] | null
          id: string
          notes: string | null
          payment_status: string | null
          source: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          total_amount: number | null
          updated_at: string
          vat_amount: number | null
          vat_rate: number | null
          vendor: string | null
        }
        Insert: {
          ai_category_suggestion?: string | null
          ai_summary?: string | null
          amount?: number | null
          category?: string | null
          created_at?: string
          currency?: string | null
          doc_date?: string | null
          doc_number?: string | null
          doc_type?: string
          due_date?: string | null
          file_urls?: string[] | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string
          vat_amount?: number | null
          vat_rate?: number | null
          vendor?: string | null
        }
        Update: {
          ai_category_suggestion?: string | null
          ai_summary?: string | null
          amount?: number | null
          category?: string | null
          created_at?: string
          currency?: string | null
          doc_date?: string | null
          doc_number?: string | null
          doc_type?: string
          due_date?: string | null
          file_urls?: string[] | null
          id?: string
          notes?: string | null
          payment_status?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          total_amount?: number | null
          updated_at?: string
          vat_amount?: number | null
          vat_rate?: number | null
          vendor?: string | null
        }
        Relationships: []
      }
      issues: {
        Row: {
          category: string | null
          cost: number | null
          created_at: string
          date: string | null
          detail: string | null
          id: string
          job: string | null
          machine: string | null
          resolution: string | null
          severity: string | null
          status: string | null
        }
        Insert: {
          category?: string | null
          cost?: number | null
          created_at?: string
          date?: string | null
          detail?: string | null
          id: string
          job?: string | null
          machine?: string | null
          resolution?: string | null
          severity?: string | null
          status?: string | null
        }
        Update: {
          category?: string | null
          cost?: number | null
          created_at?: string
          date?: string | null
          detail?: string | null
          id?: string
          job?: string | null
          machine?: string | null
          resolution?: string | null
          severity?: string | null
          status?: string | null
        }
        Relationships: []
      }
      machine_health: {
        Row: {
          created_at: string
          filter_life: number | null
          id: string
          name: string
          next_maintenance: number | null
          oil_level: number | null
          spindle_hours: number | null
          status: string | null
        }
        Insert: {
          created_at?: string
          filter_life?: number | null
          id?: string
          name: string
          next_maintenance?: number | null
          oil_level?: number | null
          spindle_hours?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string
          filter_life?: number | null
          id?: string
          name?: string
          next_maintenance?: number | null
          oil_level?: number | null
          spindle_hours?: number | null
          status?: string | null
        }
        Relationships: []
      }
      maintenance_logs: {
        Row: {
          cost: number | null
          created_at: string
          date: string
          detail: string | null
          duration: string | null
          id: string
          machine: string
          status: string | null
          technician: string | null
          type: string
        }
        Insert: {
          cost?: number | null
          created_at?: string
          date?: string
          detail?: string | null
          duration?: string | null
          id?: string
          machine: string
          status?: string | null
          technician?: string | null
          type?: string
        }
        Update: {
          cost?: number | null
          created_at?: string
          date?: string
          detail?: string | null
          duration?: string | null
          id?: string
          machine?: string
          status?: string | null
          technician?: string | null
          type?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          meeting_date: string
          meeting_time: string
          name: string
          notes: string | null
          phone: string | null
          status: string
          topic: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          meeting_date: string
          meeting_time: string
          name: string
          notes?: string | null
          phone?: string | null
          status?: string
          topic: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          meeting_date?: string
          meeting_time?: string
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string
          topic?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer: string | null
          deadline: string | null
          id: string
          order_date: string | null
          part_name: string | null
          progress: number | null
          quantity: number | null
          rfq_ref: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          customer?: string | null
          deadline?: string | null
          id: string
          order_date?: string | null
          part_name?: string | null
          progress?: number | null
          quantity?: number | null
          rfq_ref?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          customer?: string | null
          deadline?: string | null
          id?: string
          order_date?: string | null
          part_name?: string | null
          progress?: number | null
          quantity?: number | null
          rfq_ref?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_rfq_ref_fkey"
            columns: ["rfq_ref"]
            isOneToOne: false
            referencedRelation: "rfqs"
            referencedColumns: ["id"]
          },
        ]
      }
      raw_materials: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          spec: string | null
          stock: number | null
          unit: string | null
          unit_cost: number | null
          waste_rate: number | null
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          spec?: string | null
          stock?: number | null
          unit?: string | null
          unit_cost?: number | null
          waste_rate?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          spec?: string | null
          stock?: number | null
          unit?: string | null
          unit_cost?: number | null
          waste_rate?: number | null
        }
        Relationships: []
      }
      rfqs: {
        Row: {
          company: string | null
          created_at: string
          customer: string | null
          date: string | null
          email: string | null
          files: string[] | null
          id: string
          material: string | null
          notes: string | null
          phone: string | null
          quantity: number | null
          service: string | null
          status: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          email?: string | null
          files?: string[] | null
          id: string
          material?: string | null
          notes?: string | null
          phone?: string | null
          quantity?: number | null
          service?: string | null
          status?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          customer?: string | null
          date?: string | null
          email?: string | null
          files?: string[] | null
          id?: string
          material?: string | null
          notes?: string | null
          phone?: string | null
          quantity?: number | null
          service?: string | null
          status?: string | null
        }
        Relationships: []
      }
      tool_inventory: {
        Row: {
          category: string | null
          code: string
          created_at: string
          id: string
          min_stock: number | null
          name: string
          stock: number | null
          supplier: string | null
          unit_cost: number | null
        }
        Insert: {
          category?: string | null
          code: string
          created_at?: string
          id?: string
          min_stock?: number | null
          name: string
          stock?: number | null
          supplier?: string | null
          unit_cost?: number | null
        }
        Update: {
          category?: string | null
          code?: string
          created_at?: string
          id?: string
          min_stock?: number | null
          name?: string
          stock?: number | null
          supplier?: string | null
          unit_cost?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wbs: {
        Row: {
          created_at: string
          current_step: number | null
          customer: string | null
          deadline: string | null
          id: string
          machine: string | null
          part_name: string | null
          status: string | null
          total_qty: number | null
        }
        Insert: {
          created_at?: string
          current_step?: number | null
          customer?: string | null
          deadline?: string | null
          id: string
          machine?: string | null
          part_name?: string | null
          status?: string | null
          total_qty?: number | null
        }
        Update: {
          created_at?: string
          current_step?: number | null
          customer?: string | null
          deadline?: string | null
          id?: string
          machine?: string | null
          part_name?: string | null
          status?: string | null
          total_qty?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "staff" | "production" | "quality"
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
      app_role: ["admin", "staff", "production", "quality"],
    },
  },
} as const
