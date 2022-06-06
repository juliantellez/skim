resource "aws_cloudfront_origin_access_identity" "skim_www_access_identity" {
  comment = "access_identity_${local.bucket_name}"
}

resource "aws_cloudfront_distribution" "skim_www_distribution" {
  origin {
    domain_name = aws_s3_bucket.skim_www_bucket.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.skim_www_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Skim www CDN"
  default_root_object = "index.html"


  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
  }

  custom_error_response {
    error_code         = "404"
    response_code      = "200"
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    application = "${lookup(local.tags, "application")}"
    environment = "${lookup(local.tags, "environment")}"
    managed_by  = "${lookup(local.tags, "managed_by")}"
  }

  aliases = [
      local.domain_name
  ]

  viewer_certificate {
    cloudfront_default_certificate = false
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
    acm_certificate_arn = aws_acm_certificate.skim_www_certificate.arn
  }
}
