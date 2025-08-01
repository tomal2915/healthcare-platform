-- patient.schema.sql
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  encrypted_data BYTEA NOT NULL, -- Encrypted PHI
  data_key_id TEXT NOT NULL, -- KMS key ID for envelope encryption
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb, -- Non-PHI data
  audit_log_id UUID REFERENCES audit_logs(id)
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

CREATE INDEX idx_patients_metadata ON patients USING GIN(metadata);