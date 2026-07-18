-- Restore public website lead submissions for both anonymous visitors and signed-in users.
alter table public.leads enable row level security;

drop policy if exists "Anyone can insert leads" on public.leads;

create policy "Anyone can insert leads"
on public.leads
for insert
to anon, authenticated
with check (true);

grant usage on schema public to anon, authenticated;
grant insert on public.leads to anon, authenticated;
