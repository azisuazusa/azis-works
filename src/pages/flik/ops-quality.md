---
layout: ../../layouts/Doc.astro
title: "Operations tooling and engineering quality"
description: "The tools that let a small operations team run a logistics business, and the CI and quality work around the code."
---

## Operations tooling

- **A Slack bot** for the operations team: bulk cancel, 3PL mapping updates, re-triggering order creation, AWB lookup, report downloads and invoice upload, with once-per-request alerting and concurrent force-cancel.
- **Webhook audit trail** as HTTP middleware: request and response bodies, headers, duration, provider auto-detection, request-ID correlation and an AWS Batch retention job. About 2.8 million webhook logs captured since January 2026.
- **Courier invoice reconciliation.** Parsers for each courier's spreadsheet format, approval and mismatch adjustment, a read/adjust API, and an admin dashboard for Finance that syncs approved invoices to the ledger. It replaced hand reconciliation of tens of thousands of line items.
- **Location tooling.** Postal-code checks, redzone and misroute handling, and area search.
- **Bulk multi-warehouse upload**, with the original uploaded file archived to S3 so Operations can investigate merchant disputes.
- **Database-trigger audit log** with before and after snapshots on the tables that drive pricing and courier behaviour, so "what changed and when" has an answer.

## Engineering quality

- **CI.** Reusable composite actions for test coverage and lint, unified App Runner and AWS Batch deploy workflows with service auto-detection, change detection to skip no-op deploys, and Jira auto-transition on release.
- **Feature flags.** Migrated from ConfigCat to go-feature-flag, and used kill-switch flags on every risky rollout (dual-write, journal entry, per-merchant overrides, ledger cut-over).
- **Observability.** OpenTelemetry on every repository adapter, and the APM to OTel migration.
- **Performance.** N+1 query elimination in courier lookups with batch processing.
- **Tests.** Integration-test suites per courier, API-based integration tests, and three dedicated unit-test coverage pushes.
- **Reviews.** 290 merged pull requests reviewed for colleagues.
