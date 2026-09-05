-- ===========================================================================
-- Esquema del curso — Supabase / PostgreSQL
--
-- Cómo aplicarlo: en el panel de Supabase, SQL Editor, pegar entero y correr.
-- Es idempotente: se puede volver a correr sin romper nada.
--
-- El modelo de seguridad está en las políticas RLS del final, no en la app.
-- Aunque alguien manipule el JavaScript del navegador, la base solo le deja
-- leer y escribir sus propias filas.
-- ===========================================================================

-- --------------------------------------------------------------------- perfil
-- Datos del alumno. Se crea solo al registrarse, con el disparador de abajo.
create table if not exists public.perfiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nombre      text not null default '',
  empresa     text default '',
  tiene_cowork boolean not null default false,
  creado_en   timestamptz not null default now()
);

-- ------------------------------------------------------------------- progreso
-- Una fila por lección completada. Sin fila = no completada.
create table if not exists public.progreso (
  usuario_id   uuid not null references auth.users(id) on delete cascade,
  leccion_id   text not null,
  completada_en timestamptz not null default now(),
  primary key (usuario_id, leccion_id)
);

-- ---------------------------------------------------------------------- notas
-- Notas del alumno por lección. Una fila por lección con nota.
create table if not exists public.notas (
  usuario_id  uuid not null references auth.users(id) on delete cascade,
  leccion_id  text not null,
  texto       text not null default '',
  editada_en  timestamptz not null default now(),
  primary key (usuario_id, leccion_id)
);

create index if not exists notas_usuario_idx    on public.notas (usuario_id);
create index if not exists progreso_usuario_idx on public.progreso (usuario_id);

-- ------------------------------------------- crear el perfil al registrarse
create or replace function public.crear_perfil()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfiles (id, nombre)
  values (new.id, coalesce(new.raw_user_meta_data->>'nombre', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario
  after insert on auth.users
  for each row execute function public.crear_perfil();

-- ===========================================================================
-- RLS: cada quien ve y toca solo lo suyo. Esto es lo que de verdad protege.
-- ===========================================================================
alter table public.perfiles enable row level security;
alter table public.progreso enable row level security;
alter table public.notas    enable row level security;

drop policy if exists "perfil propio: leer"     on public.perfiles;
drop policy if exists "perfil propio: escribir" on public.perfiles;
create policy "perfil propio: leer"
  on public.perfiles for select using (auth.uid() = id);
create policy "perfil propio: escribir"
  on public.perfiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "progreso propio" on public.progreso;
create policy "progreso propio"
  on public.progreso for all
  using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);

drop policy if exists "notas propias" on public.notas;
create policy "notas propias"
  on public.notas for all
  using (auth.uid() = usuario_id) with check (auth.uid() = usuario_id);
