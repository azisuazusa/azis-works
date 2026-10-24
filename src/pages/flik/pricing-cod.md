---
layout: ../../layouts/Doc.astro
title: "Pricing, COD and fee engine"
description: "The rules and configuration that let FLIK monetise shipping: COD fees, discounts, flat rates and return fees."
---

## Situation

With direct courier contracts, FLIK could set its own prices, COD fees and return policies. That needed an engine to calculate fees correctly per courier, per service and per merchant, and tools for the operations team to manage it.

## What I did

- **COD as a product.** A COD fee table and calculation, disbursement delayed by COD window, COD configured per courier service, and fee handling across payment and ledger.
- **Per-merchant overrides** for discounts and COD fees, plus the admin UI for them in the internal operations dashboard.
- **Flat-rate rules** for SiCepat, SPX and ID Express.
- **Return-fee computation.** Synchronous, idempotent fee persistence on RETURNED webhooks, using per-courier-service rule sets (stored as JSONB) with per-merchant overrides. I generalised the SiCepat flat rate onto the same rule pattern and deleted the dedicated tables after verifying the migration byte for byte.
- **Per-service volumetric divisors.** A hard-coded 6000 at roughly 47 call sites became a column per courier service, with multi-service fan-out grouped by divisor. That fixed margin distortion on Lion Parcel's large-parcel services, which use 4000.
- **Insurance** support with a typed rate result across all couriers.
- **Provider-discount tracking** so negotiated discounts are visible and can be passed on to merchants.

## Results

- COD went from a few hundred orders in 2024 to about **83% of orders in 2026**, roughly IDR 45bn collected in 2026 up to early September.
- In 2026 to early September the platform recorded roughly IDR 3.5bn of provider discounts passed on to merchants.
- Return fees (about 2,100 orders since August 2026) and flat rates are first-class ledger inputs rather than spreadsheet reconciliations.

Figures are rounded and come from production data as of 8 September 2026.
