
-- Create approval status enum
CREATE TYPE approval_status AS ENUM ('pending', 'approved', 'rejected');

-- Create seller approval tracking table
CREATE TABLE seller_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES sellers(id) ON DELETE CASCADE,
    odoo_partner_id INTEGER,
    approval_status approval_status DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    webhook_id TEXT UNIQUE, -- Unique identifier for webhook callbacks
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product approval tracking table
CREATE TABLE product_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meat_product_id UUID REFERENCES meat_products(id) ON DELETE CASCADE,
    odoo_product_id INTEGER,
    approval_status approval_status DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    webhook_id TEXT UNIQUE, -- Unique identifier for webhook callbacks
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create livestock approval tracking table
CREATE TABLE livestock_approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    livestock_listing_id UUID REFERENCES livestock_listings(id) ON DELETE CASCADE,
    odoo_product_id INTEGER,
    approval_status approval_status DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejected_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    webhook_id TEXT UNIQUE, -- Unique identifier for webhook callbacks
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product transaction history table
CREATE TABLE product_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    meat_product_id UUID REFERENCES meat_products(id) ON DELETE CASCADE,
    transaction_type TEXT NOT NULL, -- 'price_change', 'status_change', 'inventory_update', 'sale'
    old_value JSONB,
    new_value JSONB,
    change_reason TEXT,
    changed_by UUID REFERENCES sellers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add approval status to sellers table
ALTER TABLE sellers ADD COLUMN approval_status approval_status DEFAULT 'pending';
ALTER TABLE sellers ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE;

-- Add approval status to meat_products table
ALTER TABLE meat_products ADD COLUMN approval_status approval_status DEFAULT 'pending';
ALTER TABLE meat_products ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE;

-- Add approval status to livestock_listings table
ALTER TABLE livestock_listings ADD COLUMN approval_status approval_status DEFAULT 'pending';
ALTER TABLE livestock_listings ADD COLUMN approved_at TIMESTAMP WITH TIME ZONE;

-- Create indexes for better performance
CREATE INDEX idx_seller_approvals_webhook_id ON seller_approvals(webhook_id);
CREATE INDEX idx_product_approvals_webhook_id ON product_approvals(webhook_id);
CREATE INDEX idx_livestock_approvals_webhook_id ON livestock_approvals(webhook_id);
CREATE INDEX idx_product_transactions_product_id ON product_transactions(meat_product_id);
CREATE INDEX idx_sellers_approval_status ON sellers(approval_status);
CREATE INDEX idx_meat_products_approval_status ON meat_products(approval_status);
CREATE INDEX idx_livestock_listings_approval_status ON livestock_listings(approval_status);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_seller_approvals_updated_at 
    BEFORE UPDATE ON seller_approvals 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_approvals_updated_at 
    BEFORE UPDATE ON product_approvals 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_livestock_approvals_updated_at 
    BEFORE UPDATE ON livestock_approvals 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
