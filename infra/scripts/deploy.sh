#!/bin/bash
set -euo pipefail

ENV="${1:-production}"
echo "Deploying Dreamscape to $ENV environment..."

case "$ENV" in
  production)
    echo "Target: GitHub Pages (production)"
    echo "Push to main triggers automatic deploy via GitHub Actions"
    ;;
  staging)
    echo "Target: GitHub Pages (staging branch)"
    echo "Push to staging triggers preview deploy"
    ;;
  *)
    echo "Unknown environment: $ENV"
    echo "Usage: $0 {production|staging}"
    exit 1
    ;;
esac
