terraform {
  backend "s3" {
    bucket = "dreamscape-terraform-state"
    key    = "dreamscape/terraform.tfstate"
    region = "us-east-1"
  }
}
