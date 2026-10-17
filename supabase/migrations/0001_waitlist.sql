-- Waitlist signups for the landing page.
--
-- Documentation only: this table was created manually in the Supabase
-- dashboard. This file mirrors that schema so it can be recreated
-- (e.g. in a new project) by running it in the SQL Editor.

create table if not exists public.waitlist (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  role          text check (role in ('recovering', 'clinic')),
  created_at    timestamptz not null default now(),
  source        text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  user_agent    text
);

-- RLS on with no policies: the public (publishable) key can't read or
-- write this table. The /api/waitlist route uses the server-only secret
-- key, which bypasses RLS.
alter table public.waitlist enable row level security;
