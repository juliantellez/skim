resource "aws_route53_record" "skim_www_record" {
  zone_id = local.route53_zone_id
  name    = local.domain_name
  type    = "A"
  alias {
      name = aws_cloudfront_distribution.skim_www_distribution.domain_name
      zone_id = aws_cloudfront_distribution.skim_www_distribution.hosted_zone_id
      evaluate_target_health = false
  }
}
