---
layout: ../../layouts/Doc.astro
title: "Rebuilding FLIK's ledger"
description: "Replacing the ledger behind FLIK's money movements: from a dual-write experiment on Blnk to an in-house ledger with a back office for Finance."
---

## Situation

FLIK's ledger ran on PostgreSQL and Spanner with hand-rolled journaling. Throughput, double-entry enforcement and auditability were limiting, and the business needed to replace a live financial system without downtime and with instant rollback.

## The experiment: dual-write to Blnk

The first approach was to write every ledger event to both the existing ledger and Blnk, an open-source ledger, and prove that they agree before trusting the new one.

- **Documentation first.** A migration doc set of about 11,000 lines before any code.
- **Dual-write engine.** PostgreSQL first, with an asynchronous Blnk write, a retry table for sync failures, a kill-switch flag, eleven event types, an account-migration tool and a bulk client with exponential back-off.
- **Shadow validator.** A two-phase reconciliation (balances, then transactions) with zero tolerance, run daily on AWS Batch and on demand, comparing PostgreSQL against Blnk.
- **Account mapping and opening balances.** Ledger consolidation, an opening-balance migration, and split recollection transactions for principal and margin transparency.
- **Infrastructure.** Six GitHub Actions workflows deploying the Blnk API on App Runner, workers on EC2 and Typesense, with Secrets Manager and pre-deploy migrations; OpenTelemetry wired through.
- **Journaling redesign.** MDR and provider-fee capture with per-merchant margin, commission source moved to order completion, and a manual journal-entry tool for Finance with atomic multi-leg transactions.
- **Clearing the old path.** About 22,000 lines of Spanner code deleted across 130 files, including four deprecated services.

## The ledger that replaced it

The design that followed is an in-house ledger service built on upstream Blnk Core and driven by a versioned posting-rule book that Accounting owns. The shadow-run discipline carried over: it first ran beside the legacy ledger so the two could be compared before any cut-over.

- **Service design.** Port-and-adapter, with a deduplicating inbox, per-merchant ordering (a Postgres advisory lock), deterministic references and no personal data stored in Blnk.
- **Back office for Finance.** Posting rules and the chart of accounts moved from CSVs and a Google Sheet into the database, with draft, test gate and publish. Added: shipping and revenue reports, month-end close, receivables, Xero journal files, maker-checker approvals, monitors and Google sign-in with role enforcement.
- **Reconciliation.** Payment-gateway settlement reconciliation, a bank statement parser, automatic fetching of payment-gateway settlement reports, and refunds and disputes.
- **Rule-book version pinning**, so a flow never posts under mixed versions when the rules change mid-flow.
- **Daily close** that verifies Blnk's hash chain.
- **Per-merchant cut-over behind feature flags**, so each caller (shipping, the merchant dashboard, finance tools) can move off the legacy ledger independently.

## Results

74 merged pull requests on this theme. The Spanner path is gone, Finance can post correcting journals into historical periods, and as of late October 2026 the replacement ledger and its back office are built, with the legacy path switchable off per merchant.
