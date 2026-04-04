# Sponsor Evaluation Guide

## Purpose

This guide is for sponsor, partner, or market-value review of the iVisit public surface.

The goal is to keep evaluation focused on the right layer:

- this repo evaluates public trust, clarity, positioning, and conversion
- the app repo evaluates real patient workflow
- the console repo evaluates provider workflow

## What This Repo Represents

This repository is the public front door for iVisit.

It should answer:

1. What iVisit is
2. How it helps in urgent moments
3. What a user should do next

It is not the single source of truth for the entire product runtime.

## Current Evaluation Standard

The marketing surface should feel:

- clear within 5 seconds
- calm under urgency
- mobile-first
- controlled, not experimental
- honest about preview access

## Recommended Review Flow

### 1. Hero

Check:

- product is understood immediately
- CTA is singular and obvious
- helper text does not create hesitation

Expected:

- primary action: `Try the App` or `Open iVisit`
- helper text: early preview framing

### 2. Preview Handoff

Check:

- CTA does not deep-link blindly
- user understands the one-time Expo Go step
- mobile uses a bottom sheet
- returning users can continue quickly

Expected:

- first-time state: `Install Expo Go`
- return state: `Open iVisit`

### 3. Mid-Page Product Proof

Check:

- live product preview feels real, not theatrical
- headings and labels remain human-readable
- emergency flow remains primary

Expected:

- live preview is framed as product proof
- no fake enterprise dashboard energy

### 4. Provider Positioning

Check:

- provider section reads as secondary audience support
- coordination value is clear
- onboarding CTA is concrete

### 5. Footer / Trust Completion

Check:

- support and legal routes are present
- no broken or dead-end actions
- no debug or internal artifacts are visible

## Repo Ownership Reminder

Use the correct repo for the correct evaluation:

- `ivisit`
  marketing and acquisition
- `ivisit-app`
  patient product and emergency flow
- `ivisit-console`
  provider operations and onboarding

## Technical Validation

Minimum check in this repo:

```bash
npm run build
```

This confirms the public marketing surface compiles as production output.

## Current Verdict

The marketing site is production-credible and suitable for sponsor review.

It is not yet the final end-state architecture because Expo preview is still in the acquisition path. That is a distribution-stage constraint, not a clarity or trust failure in the page itself.
