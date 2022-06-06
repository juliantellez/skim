locals {
  tags = {
    application = "skim_website"
    environment = var.environment
    managed_by  = "terraform"
  }

  bucket_name  = "skim-website"
  s3_origin_id = "s3-${local.bucket_name}-${var.environment}"

  domain_name  = "skimpost.com"
  route53_zone_id = "Z044922033VILUCT82WMW"
}
