create extension if not exists pgcrypto;

create type public.app_role as enum ('admin', 'staff', 'seller', 'customer');
create type public.order_status as enum ('pending', 'paid', 'failed', 'cancelled', 'fulfilled', 'refunded', 'partially_refunded');
create type public.booking_status as enum ('requested', 'confirmed', 'cancelled', 'completed', 'no_show');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.app_role not null default 'customer',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  active boolean not null default true,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  seller_id uuid references auth.users(id),
  channel text not null check (channel in ('online', 'in_person')),
  subtotal_cents integer not null check (subtotal_cents >= 0),
  delivery_cents integer not null default 0 check (delivery_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  payment_method text,
  payment_reference text,
  status public.order_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint order_total_matches check (total_cents = subtotal_cents + delivery_cents)
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  quantity integer not null check (quantity > 0)
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  service_name text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status public.booking_status not null default 'requested',
  assigned_staff_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  constraint booking_valid_time check (ends_at > starts_at)
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id),
  order_id uuid references public.orders(id),
  actor_id uuid references auth.users(id),
  quantity_delta integer not null check (quantity_delta <> 0),
  reason text not null,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  target_type text not null,
  target_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);

create index orders_user_id_idx on public.orders(user_id);
create index orders_seller_id_idx on public.orders(seller_id);
create index order_items_order_id_idx on public.order_items(order_id);
create index order_items_product_id_idx on public.order_items(product_id);
create index bookings_user_id_idx on public.bookings(user_id);
create index bookings_assigned_staff_id_idx on public.bookings(assigned_staff_id);
create index bookings_starts_at_idx on public.bookings(starts_at);
create index inventory_movements_product_id_idx on public.inventory_movements(product_id);
create index inventory_movements_order_id_idx on public.inventory_movements(order_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.bookings enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.audit_logs enable row level security;

create policy "active products are publicly readable"
on public.products for select
using (active = true);

create policy "users read own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "users update own profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.products from anon, authenticated;
revoke all on table public.orders from anon, authenticated;
revoke all on table public.order_items from anon, authenticated;
revoke all on table public.bookings from anon, authenticated;
revoke all on table public.inventory_movements from anon, authenticated;
revoke all on table public.audit_logs from anon, authenticated;

-- Customers may edit contact details only. Role and active status remain server-controlled.
grant select on table public.profiles to authenticated;
grant update (full_name, phone) on table public.profiles to authenticated;
grant select on table public.products to anon, authenticated;

revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

comment on table public.audit_logs is 'Sensitive administrative actions recorded for accountability.';
comment on column public.profiles.role is 'Server-controlled application role. Never writable by a signed-in customer.';
