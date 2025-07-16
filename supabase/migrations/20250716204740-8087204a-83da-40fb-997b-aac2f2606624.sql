-- Add missing odoo_partner_id column to customers table
ALTER TABLE public.customers ADD COLUMN odoo_partner_id INTEGER;