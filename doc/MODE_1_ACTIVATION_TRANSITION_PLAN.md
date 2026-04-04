# iVisit Transition Plan

## "Mode 1 Activation" - Triggered When `app.ivisit.ng` Goes Live

---

## Purpose

This document defines the structured transition from:

**Preview-based access (Expo-first)**  
to  
**Direct product access (Web/PWA-first)**

The goal is to make iVisit feel like a **real, immediate system**, not a preview or demo.

---

## Activation Trigger

This plan is executed when:

- `app.ivisit.ng` is live, stable, and usable end-to-end
- Core patient flow (`Request -> Track -> Coordinate`) works on web
- No blocking dependency on Expo for primary usage

---

## Phase 1 - Marketing Rewire

### Goal

Convert the marketing site into a **clean, trust-first entry point**

### Actions

#### 1. Primary CTA (Global)

Replace all primary CTAs with:

**Get Help**

#### 2. Routing

```text
ivisit.ng -> app.ivisit.ng
```

No routing to:

- `/login`
- `/emergency`
- Expo links

#### 3. Remove Preview Dependency from Main Flow

- Remove Expo from hero and main CTA areas
- Eliminate any messaging that suggests setup is required

#### 4. Reposition Expo (Secondary Only)

Move Expo to:

- Footer
- Bottom CTA section
- Optional fallback message

### Output

- Immediate, frictionless entry
- Clear user intent: `Get Help`
- No confusion between preview and product

---

## Phase 2 - App Entry Experience (Critical)

### Goal

Ensure `app.ivisit.ng` feels like **help is already in motion**

### Entry Rules

On load, do not show:

- login screen
- dashboard
- menus
- feature lists

### Required First State

User should immediately see:

**"Finding help near you..."**

or

**"Get help now"**

### Behavior

- Automatically request location
- Preload nearby responders/hospitals
- Minimize user decisions

### Output

User perception:

**"I opened this and something is already happening"**

---

## Phase 3 - Authentication Strategy

### Goal

Remove login friction from entry

### Flow

```text
User enters app
-> Starts help request
-> Then prompted: "Add your phone to continue"
```

### Implementation

- Phone-based OTP (recommended)
- Anonymous session allowed initially

### Constraints

- No forced login upfront
- No email/password as first interaction

### Output

- Faster engagement
- Reduced drop-off
- Identity captured contextually

---

## Phase 4 - Core Flow Alignment

### Goal

Match product behavior to marketing promise

### Core Flow

```text
Request -> Share -> Track -> Coordinate
```

### Rules

- Each step should transition automatically where possible
- System initiates actions, not user
- Feedback is always visible

### Example States

- `Finding help near you...`
- `Responder notified`
- `Tracking arrival (ETA 4 min)`

### Output

- No confusion
- No unnecessary choices
- Continuous forward motion

---

## Phase 5 - Expo Decommissioning (Partial)

### Goal

Retain Expo without affecting primary experience

### Expo Role

- Preview only
- Backup / fallback
- Demo tool

### Placement

- Footer
- Secondary CTA
- Support fallback

### Copy Example

**"Want to preview? Use Expo version"**

### Restrictions

- Never use Expo as primary CTA again
- Never surface Expo in hero

### Output

Expo becomes:

**a tool, not the product**

---

## Phase 6 - Provider Surface Separation

### Goal

Maintain clean system boundaries

### Domains

```text
app.ivisit.ng       -> patient experience
console.ivisit.ng   -> provider/admin
```

### Rules

- No provider UI in patient app
- No patient flow in console

### Output

- Clear ownership
- Scalable architecture

---

## Phase 7 - Production Validation

### Goal

Operate at production-grade confidence

### Marketing

```bash
npm run build
```

### App

- Flow validation (`Request -> Track`)
- Realtime sync check
- Location handling
- Error handling

### Console

- Provider onboarding flow
- Data integrity checks
- Role-based access

### Output

- Stable release pipeline
- Confidence in live environment

---

## Final Architecture

```text
ivisit.ng              -> marketing
app.ivisit.ng          -> patient app (web/PWA)
console.ivisit.ng      -> provider console
expo                   -> fallback preview
```

---

## End State

User journey:

```text
Visit ivisit.ng
-> Tap "Get Help"
-> app.ivisit.ng opens instantly
-> "Finding help near you..."
-> System coordinates response
```

---

## Final Principle

> The product must not ask:
> "What do you want to do?"
>
> The product must assume:
> "You need help. We are already helping you."
