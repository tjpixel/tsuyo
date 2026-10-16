-- Tsuyo · esquema de Supabase (proyecto aparte de NEXA Fit)
-- Una fila por usuario con todos sus datos en JSON. Cada usuario solo puede ver y tocar la suya.

create table if not exists public.tsuyo_data (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint tsuyo_data_size check (pg_column_size(data) < 2000000)
);

alter table public.tsuyo_data enable row level security;

create policy "leer lo mío"       on public.tsuyo_data for select using (auth.uid() = user_id);
create policy "crear lo mío"      on public.tsuyo_data for insert with check (auth.uid() = user_id);
create policy "actualizar lo mío" on public.tsuyo_data for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

revoke all on public.tsuyo_data from anon;
grant select, insert, update on public.tsuyo_data to authenticated;

-- Borrar la cuenta desde la app (lo exige Apple): elimina el usuario y, en cascada, sus datos
create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  delete from auth.users where id = auth.uid();
end; $$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
