## Prerequisites
Before you start, install these:
-**Node.js 18+**-Check with `node -v`
-**npm**-Comes with Node
-**Git**-For cloning repo
-**Supabase account**-Free at supabase.com, each dev needs own project

## 1. Clone Repository
\`\`bash
git clone https://github.com/Sankofa-Digital-Studio/phekong-commerce-platform.git

## 2. Install Dependencies
\`\`bash
npm install
\`\`
This install all packages from `package.json`

## 3. Environemnt File Setup - IMPORTANT
**NEVER commit real keys to Git**

1. Copy the example file
\`\`bash
cp .env.example .env.local
\`\`

2. Open `.env.local` and add your keys using placeholders:
\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
\`\`

3. Get your keys from Supabase Dashboard, Settings then API
**Note:**Each developer must create their own Supabase project. Do not share keys

## 4. Run locally
\`\`bash
npm run dev
\`\`
Open http://localhost:3000 in your browser

## 5. Quality Check Commands - Run Before Every PR
These must pass or Vercel will reject your build:

\`\`bash
npm run lint #Checks code style
npm run typecheck #Checks TypeScript types
npm run build #Tests production build
npm run test:run #Runs Vitest unit tests
\`\`
All commands should finish with no errors

## Common issues & Fixes
**1. Missing script "type-check"**
Error: `npm error missing script:"type-check"`
Fix: Use `npm run typecheck`-no dash 

**2. Supabase keys not working**
Error:`Invalid API key` or blank page
Fix: Make sure `.env.local` exists and keys are copied correctly. Restart dev server after changing .env

## Security Warning
**DO NOT COMMIT SECRETS**
-`.env.local` is in .gitignore
-Only use placeholder values in docs and `.env.example`

