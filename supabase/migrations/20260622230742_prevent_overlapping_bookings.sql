create extension if not exists btree_gist with schema extensions;

-- Treat booking intervals as half-open ranges: [starts_at, ends_at). This
-- permits adjacent bookings while preventing concurrent reservations. A
-- cancelled booking releases both its staff member and service slot.
alter table public.bookings
add constraint bookings_assigned_staff_no_overlap
exclude using gist (
  assigned_staff_id with =,
  tstzrange(starts_at, ends_at, '[)') with &&
)
where (assigned_staff_id is not null and status <> 'cancelled');

-- M0 models a single-capacity service slot by its normalized service name.
-- A future capacity model should replace this key with a stable service or
-- resource identifier rather than weakening the database invariant.
alter table public.bookings
add constraint bookings_service_slot_no_overlap
exclude using gist (
  (lower(btrim(service_name))) with =,
  tstzrange(starts_at, ends_at, '[)') with &&
)
where (status <> 'cancelled');

comment on constraint bookings_assigned_staff_no_overlap on public.bookings is
  'Non-cancelled bookings assigned to the same staff member may not overlap; intervals are [starts_at, ends_at).';

comment on constraint bookings_service_slot_no_overlap on public.bookings is
  'Non-cancelled bookings for the same normalized single-capacity service slot may not overlap.';
