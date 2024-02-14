-- Active: 1707764852259@@127.0.0.1@5432@jobs_plooral
-- Creating ENUM types to store position status
create type job_status as enum ('draft', 'published', 'archived', 'rejected');

-- Company model
create table if not exists companies (
    id uuid not null default uuid_generate_v4() primary key,
    name text not null unique,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

-- Job Model
create table if not exists jobs (
    id uuid not null default uuid_generate_v4() primary key,
    company_id uuid not null references companies,
    title text not null,
    description text not null,
    location text not null,
    notes text,
    status job_status not null default 'draft',
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

-- Job Model Indexes
create index on jobs(company_id);
create index on jobs(status);

insert into companies (name) values ('ABC Corp');
insert into companies (name) values ('XYZ LLC');
insert into companies (name) values ('ACME Enterprises');

select * from companies;

select * from jobs;