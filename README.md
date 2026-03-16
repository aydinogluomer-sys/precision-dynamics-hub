# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
PRD — [PROJECT NAME]

> Use this to plan before prompting. Paste relevant sections into Knowledge Base or use as reference when prompting.

1. Introduction
   Product Name: [Name]
   One-liner: [What it does in one sentence]
   Target Users: [Primary persona + secondary]
   Problem: [What pain point does it solve?]
2. User Flow

```
Landing Page → Sign Up → Onboarding → Dashboard → Core Action → Settings → Logout
```

Describe each step:
Landing: [What user sees, CTA]
Sign Up: [Email/password? Social? Which providers?]
Onboarding: [Any setup steps? Profile completion?]
Dashboard: [What data is shown? What actions available?]
Core Action: [The main thing users pay for / come to do]
Settings: [Profile, billing, preferences] 3. Core Features
Feature 1: [Name]
Description: [What it does]
User stories:
As a [role], I want to [action] so that [benefit].
Acceptance criteria:
[ ] [Specific testable condition]
[ ] [Specific testable condition]
Feature 2: [Name]
(same structure)
Feature 3: [Name]
(same structure) 4. Data Model
Users
Column Type Notes
id uuid PK
email text unique, not null
full_name text
role enum user, admin
created_at timestamptz default now()
[Resource]
Column Type Notes
id uuid PK
user_id uuid FK → users.id, ON DELETE CASCADE
title text not null
status enum draft, active, archived
created_at timestamptz default now()
updated_at timestamptz trigger
deleted_at timestamptz nullable, soft delete 5. Roles & Permissions
Action User Admin
View own data ✅ ✅
Edit own data ✅ ✅
View all data ❌ ✅
Delete data Own only All
Manage users ❌ ✅ 6. In Scope (MVP)
[ ] [Feature]
[ ] [Feature]
[ ] [Feature] 7. Out of Scope (Post-MVP)
[ ] [Feature — why deferred]
[ ] [Feature — why deferred] 8. Design Notes
Style: [minimalist / bold / playful]
Primary color: [hex]
Inspiration: [reference sites or screenshots]
Dark mode: [yes / no / later]
