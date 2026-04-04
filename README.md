# iVisit Marketing Surface

This repository contains the public iVisit marketing site and web acquisition surface.

It is responsible for:
- marketing pages
- public SEO content
- legal/support pages
- Expo preview handoff
- web/PWA shell for public discovery

It does not own the full patient app or provider console runtime.

## Repo Boundaries

The iVisit product is split into three surfaces:

- `ivisit`
  Public marketing site and acquisition layer
- `ivisit-app`
  Canonical patient app built in Expo / React Native
- `ivisit-console`
  Provider operations and onboarding console

This boundary is intentional. It prevents flow drift between marketing, patient product, and provider workflows.

## Current UX Position

The marketing site is optimized for:

- fast 5-second clarity
- calm emergency-context language
- one primary action per decision point
- guided preview access through Expo Go

The current CTA flow is:

1. `Try the App`
2. Preview bridge
3. `Install Expo Go` or `Open iVisit`
4. Expo preview opens

On mobile, the preview bridge uses a bottom sheet. On desktop, it uses a centered dialog.

## Sponsor Evaluation Path

For sponsor or market-value review, evaluate in this order:

1. Marketing clarity in this repo
2. Patient product in sibling repo `../ivisit-app`
3. Provider workflow surface in sibling repo `../ivisit-console`

Recommended walkthrough:

1. Open the marketing homepage
2. Verify first-screen clarity and CTA behavior
3. Test the Expo preview bridge
4. Open the live patient preview from Expo Go
5. Review provider-facing positioning and onboarding CTA

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Quality Gates

This repo currently uses:

- `npm run build` for production build verification
- manual responsive review for sponsor-facing UX

Product hardening and deeper runtime confidence live primarily in `../ivisit-app`, where the emergency and visit flows are validated against the live contract surface.

## Key Files

- `src/pages/Home.tsx`
- `src/components/home/Hero.tsx`
- `src/components/layout/marketing/PreviewBridge.tsx`
- `src/components/layout/marketing/PreviewBridgeProvider.tsx`
- `src/constants/appLinks.ts`

## Related Documentation

- [doc/UI_AUDIT_REPORT.md](./doc/UI_AUDIT_REPORT.md)
- [doc/UI_COHERENCE_AUDIT_2.md](./doc/UI_COHERENCE_AUDIT_2.md)
- [doc/REVISED_ENTERPRISE_VALUATION.md](./doc/REVISED_ENTERPRISE_VALUATION.md)
- [doc/SPONSOR_EVALUATION_GUIDE.md](./doc/SPONSOR_EVALUATION_GUIDE.md)
