create table if not exists public.crest_shares (
  id uuid primary key,
  result text not null check (
    result in (
      'courage',
      'friendship',
      'purity',
      'love',
      'knowledge',
      'reliability',
      'hope',
      'light'
    )
  ),
  created_at timestamptz not null default now(),
  last_viewed_at timestamptz
);

create index if not exists crest_shares_created_at_idx
  on public.crest_shares (created_at desc);

alter table public.crest_shares enable row level security;

