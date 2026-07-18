-- Store optional contact form messages with lead submissions.
alter table public.leads
  add column if not exists message text;
