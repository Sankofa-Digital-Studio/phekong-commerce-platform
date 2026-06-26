-- PostgREST still enforces PostgreSQL table privileges for service-role requests.
grant select, insert, update, delete
on table public.bookings
to service_role;
