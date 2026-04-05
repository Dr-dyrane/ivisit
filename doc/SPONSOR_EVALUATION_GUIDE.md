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

- primary action: `Open iVisit`
- helper text: direct live-app framing

### 2. App Handoff

Check:

- CTA goes directly to the live patient app
- landing is clear for signed-out users
- the same app surface works on mobile, tablet, and desktop
- no preview or setup language leaks into the marketing journey

Expected:

- CTA target: `https://app.ivisit.ng`
- no Expo dependency in the primary handoff

### 3. Mid-Page Product Proof

Check:

- live product preview feels real, not theatrical
- `How it works` begins on the same first screen users see in the app
- headings and labels remain human-readable
- emergency flow remains primary

Expected:

- live preview is framed as product proof
- first-screen preview matches current app welcome copy and action hierarchy
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

The public handoff now routes directly into the live patient web app at `app.ivisit.ng`. Marketing, patient app, and provider console are now separable evaluation layers instead of a preview bridge.
