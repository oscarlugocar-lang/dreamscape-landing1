variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name for resource tagging"
  type        = string
  default     = "dreamscape"
}

variable "environment" {
  description = "Deployment environment (production/staging)"
  type        = string
  default     = "production"
}

variable "tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    project     = "dreamscape"
    managed_by  = "terraform"
    repository  = "oscarlugocar-lang/dreamscape-landing1"
  }
}
