locals {
  tags = {
    application = "skim_website"
    environment = var.environment
    managed_by  = "terraform"
  }

  bucket_name           = "skim-website"
}
