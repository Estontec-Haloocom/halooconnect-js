-- Restore defaults expected by the website lead forms after DB migration.
alter table public.leads
  alter column id set default gen_random_uuid(),
  alter column created_at set default now();
