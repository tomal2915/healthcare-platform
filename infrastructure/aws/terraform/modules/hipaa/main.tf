# modules/hipaa/main.tf

resource "aws_kms_key" "phi_encryption_key" {
  description             = "KMS key for PHI data encryption"
  enable_key_rotation    = true
  policy                 = data.aws_iam_policy_document.kms_policy.json
}

resource "aws_cloudtrail" "hipaa_trail" {
  name                          = "hipaa-activity-trail"
  s3_bucket_name                = aws_s3_bucket.audit_logs.id
  include_global_service_events = true
  is_multi_region_trail        = true
  kms_key_id                   = aws_kms_key.phi_encryption_key.arn
  
  event_selector {
    read_write_type = "All"
    include_management_events = true
  }
}