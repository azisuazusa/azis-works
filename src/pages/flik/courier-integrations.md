---
layout: ../../layouts/Doc.astro
title: "Eight direct courier integrations"
description: "Moving routing from an aggregator to direct integrations with the couriers, from 0% of orders to more than 99%."
---

## Situation

Every FLIK Shipping order went through the Biteship aggregator. Margin, coverage and control over pricing, COD and returns were limited by what the aggregator exposed.

## What I did

I designed and built eight direct integrations. Each one has rate-check, order creation, tracking, cancellation, webhook handling with authentication middleware, status mapping and district-level coverage data, in the same port-and-adapter layout per provider.

<div class="table-scroll">

| Courier | What stood out | First direct order |
|---|---|---|
| Ninja Express | A CLI to migrate Ninja's zone and price database; cargo, insurance and weight rules; cross-border Singapore and Malaysia | Nov 2024 |
| J&T | Proof of delivery, status mapping, subdistrict lookup | Dec 2024 |
| JNE | A price-discrepancy flow, custom AWB numbers, proof of delivery from CNote, separate COD and non-COD customer IDs | May 2025 |
| ID Express | Misroute minimisation using city and postal-code recommendation, COD cover areas, rate limiting | May 2025 |
| Lion Parcel | Migration and mapping, whitelist rollout, journey-type status handling | Jul 2025 |
| SPX (Shopee Express) | Full integration, district migration, evidence-proof webhooks, lost-and-damage status | Dec 2025 |
| SiCepat | A flat-rate pricing model, 997+ district mapping, a location-sync CLI | Jul 2026 |
| AnterAja | Kemendagri-code district mapping verified at 96%+ exact match, insurance support | Aug 2026 (integration merged) |

</div>


## Results

The share of orders that go direct moved from **0% (October 2024)** to 37% (December 2024), 97% (June 2025) and **above 98.9% every month of 2026**. Direct integration removes the aggregator's margin and gives FLIK control over pricing, COD and returns, which the [pricing work](/flik/pricing-cod/) then built on.

Each courier also has its own integration-test suite.
