---
layout: ../../layouts/Doc.astro
title: "FLIK Shipping: a logistics platform from PR #1"
description: "The shipping service I founded in February 2024 and built into a platform that carries about 50,000 orders a month."
---

<p class="actions"><a class="btn primary" href="https://flik.co.id/en/pengiriman-kilat" target="_blank" rel="noopener noreferrer">See the product page &#8599;</a></p>

## Situation

FLIK decided to offer its merchants a shipping product, initially on top of the Biteship aggregator. The repository was created on 13 February 2024 and was empty.

## What I did

Pull request #1 laid down the architecture (port-and-adapter Go on PostgreSQL) and the create-shipment-orders API. In the following weeks I added payment confirmation, courier order creation, availability checks, shipping amounts, order lists, print-label and invoice data, and pickup-time windows. Over the rest of 2024 the service grew delivery notifications by WhatsApp and e-mail, an extracted webhook service, improved scheduling, a cancel-order API, AWB handling, and OpenTelemetry on every repository adapter.

The service now covers rate-check, order creation, payment confirmation, scheduling, pickup windows, tracking, cancellation and refund, label printing, invoices, notifications, analytics and a public API. Background work runs on an in-house asynq worker backed by Redis; deployment is on AWS (App Runner and Batch). In September 2026 I removed the last Google Cloud Tasks code paths after the move to AWS.

Around it I built the pieces that make it a product rather than an API:

- An **analytics suite** for the merchant dashboard (shipping summary, funnel, delivery, courier and payment-type distributions).
- **Cross-border shipping** to Singapore and Malaysia through Ninja Express, including the data migrations and rate tables.
- **COD** (cash on delivery) as a first-class payment type, covered on [its own page](/flik/pricing-cod/).
- Direct **courier integrations**, covered [here](/flik/courier-integrations/).

## Results

<div class="table-scroll">

| | |
|---|---|
| First production order | 16 May 2024 |
| Orders processed since | ~390,000 (to early September 2026) |
| Per year | ~5,000 (2024) &rarr; ~78,000 (2025) &rarr; ~310,000 (2026, to early September) |
| Busiest months | ~50,000 orders a month (July and August 2026) |
| Merchants | 200+ |
| COD share of orders | ~83% in 2026 (about 5% in 2024) |
| Pull requests | 502 in the repository; most commits in the repo by a wide margin (562 vs 63 for the next contributor) |

</div>

Business figures are rounded and come from production data as of 8 September 2026.

## Stack

Go, PostgreSQL, Redis and asynq, AWS (App Runner, Batch, S3, Secrets Manager), OpenTelemetry, GitHub Actions.
