# C2B Salary Benchmark Dashboard 2026

Dashboard salarial com autenticação Microsoft SSO (Entra ID) e upload direto de ficheiros Excel.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Register app in Microsoft Entra ID

1. Go to [entra.microsoft.com](https://entra.microsoft.com) → **App registrations** → **New registration**
2. **Name:** `C2B Salary Dashboard`
3. **Supported account types:** "Accounts in this organizational directory only" (Single tenant)
4. **Redirect URI:** Web → `http://localhost:3000/api/auth/callback/azure-ad`
5. Click **Register**

After creation:
- Copy **Application (client) ID**
- Copy **Directory (tenant) ID** from Overview page
- Go to **Certificates & secrets** → **New client secret** → Copy the **Value**

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
AZURE_AD_CLIENT_ID=<your-client-id>
AZURE_AD_CLIENT_SECRET=<your-client-secret>
AZURE_AD_TENANT_ID=<your-tenant-id>
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → Sign in with your @caretobeauty.com Microsoft account.

---

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "C2B Salary Dashboard"
git remote add origin https://github.com/your-org/c2b-salary-dashboard.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Import project from GitHub
2. Add environment variables (same as `.env.local`):
   - `AZURE_AD_CLIENT_ID`
   - `AZURE_AD_CLIENT_SECRET`
   - `AZURE_AD_TENANT_ID`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → `https://your-project.vercel.app`
3. Deploy

### 3. Update Entra ID redirect URI

Add production redirect URI in Entra ID:
`https://your-project.vercel.app/api/auth/callback/azure-ad`

---

## Features

- **Microsoft SSO** — Only @caretobeauty.com accounts can login
- **Upload .xlsx** — Parse calibração sheet directly in the browser
- **3 views** — Visão Geral, Departamentos, Colaboradores
- **KPIs** — Custo empresa, aumentos, KMs, headcount
- **Sortable columns** — Click any column header
- **Department filter** — Filter by department or Heads of Department
- **Teams link** — Quick access to the SharePoint source file

## Architecture

```
app/
  layout.tsx          → Root layout with SessionProvider
  page.tsx            → Auth guard + Dashboard wrapper
  login/page.tsx      → Microsoft sign-in page
  api/auth/[...nextauth]/route.ts → NextAuth API route
components/
  Dashboard.tsx       → Main dashboard component (client-side)
  Providers.tsx       → NextAuth SessionProvider
```

## Security

- Only `@caretobeauty.com` emails are allowed (configured in NextAuth callbacks)
- All data stays client-side — no server storage of salary data
- To restrict further, add specific email addresses to the `signIn` callback in `app/api/auth/[...nextauth]/route.ts`
