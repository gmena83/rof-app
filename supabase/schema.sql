-- 1. Opportunities Table
create table opportunities (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  source text,
  deadline date,
  description text,
  requirements text[],
  status text check (status in ('new', 'applied', 'won', 'lost', 'pending')) default 'new',
  drive_link text,
  ai_suggestions text[]
);

-- 2. Companies Table (Raya Power)
create table companies (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  goals text[],
  industry text
);

-- 3. Application Tracking (Junct table)
create table application_tracking (
  id uuid default gen_random_uuid() primary key,
  opportunity_id uuid references opportunities(id) on delete cascade not null,
  company_id uuid references companies(id) on delete cascade not null,
  status text default 'pending',
  applied_date date,
  notes text,
  priority integer check (priority between 1 and 5) default 3,
  unique(opportunity_id, company_id)
);

-- 4. Enable Row Level Security (RLS)
alter table opportunities enable row level security;
alter table companies enable row level security;
alter table application_tracking enable row level security;

-- 5. Policies (Stub: allow authenticated users to do everything for MVP)
create policy "Allow all operations for authenticated users" 
on opportunities for all 
to authenticated 
using (true) 
with check (true);

create policy "Allow all operations for authenticated users" 
on companies for all 
to authenticated 
using (true) 
with check (true);

create policy "Allow all operations for authenticated users" 
on application_tracking for all 
to authenticated 
using (true) 
with check (true);
