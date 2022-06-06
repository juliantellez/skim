terraform {
  required_version = ">= v1.2.2"

  backend "s3" {
    bucket  = "tf-state-store-skim"
    key     = "prod"
    region  = "us-east-1"
    encrypt = true
    profile = "personal"
  }
}
