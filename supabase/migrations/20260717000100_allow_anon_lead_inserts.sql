-- Allow public website forms to submit leads in the migrated project.
alter table public.leads enable row level security;

drop policy if exists "Anyone can insert leads" on public.leads;

create policy "Anyone can insert leads"
on public.leads
for insert
to anon
with check (true);

grant usage on schema public to anon;
grant insert on public.leads to anon;
