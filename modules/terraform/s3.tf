resource "aws_s3_bucket" "skim_www_bucket" {
  bucket = local.bucket_name
  acl    = "private"
  tags = {
    application = "${lookup(local.tags, "application")}"
    environment = "${lookup(local.tags, "environment")}"
    managed_by  = "${lookup(local.tags, "managed_by")}"
  }
}
