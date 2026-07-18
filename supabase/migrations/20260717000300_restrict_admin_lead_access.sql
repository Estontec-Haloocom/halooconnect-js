-- Keep public form submissions open, but restrict lead dashboards to the admin account.
alter table public.leads enable row level security;
alter table public.analysis_leads enable row level security;

drop policy if exists "Authenticated users can view leads" on public.leads;
drop policy if exists "Authenticated users can delete leads" on public.leads;
drop policy if exists "Admin can view leads" on public.leads;
drop policy if exists "Admin can delete leads" on public.leads;
drop policy if exists "Authenticated users can view analysis leads" on public.analysis_leads;
drop policy if exists "Admin can view analysis leads" on public.analysis_leads;

create policy "Admin can view leads"
on public.leads
for select
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@connect.com');

create policy "Admin can delete leads"
on public.leads
for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@connect.com');

create policy "Admin can view analysis leads"
on public.analysis_leads
for select
to authenticated
using ((auth.jwt() ->> 'email') = 'admin@connect.com');

grant usage on schema public to authenticated;
grant select, delete on public.leads to authenticated;
grant select on public.analysis_leads to authenticated;