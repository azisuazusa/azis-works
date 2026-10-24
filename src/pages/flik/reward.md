---
layout: ../../layouts/Doc.astro
title: "Reward service"
description: "A loyalty system built from nothing in 2023: shoppers earn and spend rewards at participating merchants."
---

## Situation

FLIK wanted a loyalty programme where shoppers earn and spend rewards at participating merchants. No service existed.

## What I did

I bootstrapped a Go microservice with a PostgreSQL schema and shipped over fifteen endpoints:

- available rewards and history,
- calculate-and-store reward on checkout,
- estimation by rule (a rule engine keeps reward rules configurable without code changes),
- top-up, plus CSV and injection endpoints for operations,
- merchant reward lists for the homepage.

I put top-up on registration behind a feature flag. In 2025 I returned to add rule-overlap validation and merchant-dashboard configuration.

## Results

- 52 merged pull requests.
- The first transaction happened ten weeks after the bootstrap PR (4 September to 15 November 2023).
- In production: more than **210,000 reward transactions** for over **70,000 shoppers** across about 200 reward programmes, and roughly IDR 2bn of rewards issued.
- Peak: December 2023, nearly 30,000 shoppers in a single month.

Figures are rounded and come from production data as of 8 September 2026.
