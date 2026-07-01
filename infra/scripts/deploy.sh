#!/bin/bash
set -euo pipefail

ENV="${1:-production}"
echo "Deploying Dreamscape to $ENV environment..."

case "$ENV" in
  production)
    echo "Pushing to main to trigger GitHub Actions deploy..."
    git push origin main
    echo "Deploy triggered. Check: https://github.com/oscarlugocar-lang/dreamscape-landing1/actions"
    ;;
  staging)
    echo "Pushing to staging branch to trigger preview deploy..."
    git push origin staging
    echo "Deploy triggered for staging."
    ;;
  *)
    echo "Unknown environment: $ENV"
    echo "Usage: $0 {production|staging}"
    exit 1
    ;;
esac
