# Deployment Guide

This document outlines the deployment process for the Korext Open Source Hub (`oss.korext.com`).

> [!WARNING]
> **CRITICAL: GCP Project Selection**
> This application MUST be deployed to the **`korext-oss`** project. 
> DO NOT deploy to the `korext-platform` project (where the marketing site and SaaS app live). If deployed to `korext-platform`, the domain `oss.korext.com` will not resolve correctly.

## Prerequisites

Ensure you are authenticated with Google Cloud CLI:
```bash
gcloud auth login
```

Ensure your current project is set to `korext-oss`:
```bash
gcloud config set project korext-oss
```

## Deployment Command

The application is deployed using Google Cloud Run from source. Cloud Build will automatically build the standalone Next.js Docker container and deploy it.

Run the following command from the root of the `korext-oss` directory:

```bash
gcloud run deploy korext-oss \
  --source=. \
  --project=korext-oss \
  --region=us-central1 \
  --allow-unauthenticated \
  --port=8080 \
  --memory=512Mi \
  --min-instances=0 \
  --max-instances=3 \
  --quiet
```

## Domain Mapping

The domain `oss.korext.com` is permanently mapped to the `korext-oss` Cloud Run service within the `korext-oss` project. 

If this mapping is ever accidentally deleted, it must be recreated in the `korext-oss` project (NOT `korext-platform`):

```bash
gcloud beta run domain-mappings create \
  --service=korext-oss \
  --domain=oss.korext.com \
  --region=us-central1 \
  --project=korext-oss
```

DNS Configuration (for reference, already set up):
- `oss` CNAME `ghs.googlehosted.com.`
