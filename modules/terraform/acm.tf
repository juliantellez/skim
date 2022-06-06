resource "aws_acm_certificate" "skim_www_certificate" {
  domain_name       = local.domain_name
  validation_method = "DNS"

  tags = {
    application = "${lookup(local.tags, "application")}"
    environment = "${lookup(local.tags, "environment")}"
    managed_by  = "${lookup(local.tags, "managed_by")}"
  }

  lifecycle {
    create_before_destroy = true
  }
}
