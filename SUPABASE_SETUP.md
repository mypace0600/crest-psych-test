# Supabase Setup

The app can share results through a UUID-backed Supabase table.

## 1. Create Table

Run `supabase/schema.sql` in the Supabase SQL Editor.

## 2. Add Vercel Environment Variables

Set these in Vercel Project Settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SECRET_KEY=your-supabase-secret-or-service-role-key
```

`SUPABASE_SECRET_KEY` must stay server-only. Do not expose it with a `NEXT_PUBLIC_` prefix.

## 3. Share URL Behavior

When Supabase is configured:

```text
https://crest-psych-test.vercel.app?u=<uuid>
```

The app resolves the UUID through `/api/share/<uuid>`.

While Supabase is not configured, the app falls back to:

```text
https://crest-psych-test.vercel.app?u=<uuid>&result=<crest>
```

