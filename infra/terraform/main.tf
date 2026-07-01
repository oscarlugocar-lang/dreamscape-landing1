terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

locals {
  project = var.project_name
  env     = terraform.workspace
  tags    = merge(var.tags, {
    Environment = local.env
  })
}
