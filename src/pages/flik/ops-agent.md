---
layout: ../../layouts/Doc.astro
title: "An AI ops agent in Slack"
description: "An AI agent that lets FLIK's operations team investigate orders and run routine fixes from Slack, built so it never holds raw credentials or personal data."
---

## Situation

Operations and customer support ran shipping order actions through an older Slack bot with a hard-coded allow-list and code nobody owned. Anything that needed production data, such as why an order had no AWB, waited for an engineer to read logs and query the database by hand.

## What I built

An AI agent that lives in the operations Slack channel. It reads production logs and the deployed code, looks up orders, and runs routine fixes. I built it in late October and early November 2026, across the agent's own repository and the services it calls.

- **Skills, not one big prompt.** Each job is a separate skill with its own runbook and a small command-line tool: investigating a production report, known issues such as failed AWB creation, shipping order actions, order fixes, and merchant dashboard access.
- **Took over the old bot's order actions:** cancel, mark delivered, retry AWB creation, order reports and courier settings. The old bot stayed up for a parallel run.
- **Investigation, not just commands.** For a production report it reads logs and the deployed code and collects evidence. It opens a fix pull request only when an engineer asks, and ships it only after a person merges.

## Built to be safe

- **No raw credentials.** The agent calls a dedicated agent API with its own key, compared in constant time and never written to logs, and every request records which Slack user asked. Bulk updates are capped and leave an audit trail.
- **No personal data.** It reads production data only through read-only database views that mask names, phone numbers, addresses, bank and virtual-account numbers and identity numbers, and that drop credentials entirely. The same masking functions are used in every database, and direct access to the underlying tables is denied.
- **A person confirms every change.** Write actions wait for the person who asked to confirm in Slack.
- **Its own identity.** It commits and opens pull requests as its own GitHub App, not with a personal token that could reach every repository.
- **Safe operations.** Secrets come from AWS Secrets Manager, and a deploy waits until the agent is idle so no conversation is cut off mid-turn.

## Measured, not assumed

An hourly collector, which makes no model calls, feeds a weekly report for engineers: how many requests the agent handled, how many got a ✅ or ❌ reaction, satisfaction among those, cost per skill, and the most expensive requests that were not marked helpful. The estimated model cost is under $1 per request on average.

The report also says when its own numbers are not reliable yet: while few requests have a reaction, satisfaction is not treated as a result.

## What I tried and pulled back

The first release included a broad tech-support skill covering twelve known issues. It handed too many cases back to engineers, so I removed it a few days later and kept the narrow skills that can finish a job on their own.

## Results

Within its first two weeks the agent took over the old bot's order actions. Operations can now retry AWB creation, fix order statuses and AWB numbers, and grant merchant dashboard access from Slack, confirming each request themselves. 22 merged pull requests.
