/* ============================================================================
   Configuración de despliegue.

   VACÍO = modo local. El curso funciona entero, el progreso y las notas se
   guardan en el navegador de quien lo abre, y la sesión es opcional: sirve
   para separar a varias personas en el mismo equipo, no para proteger nada.

   RELLENO = modo nube. Con un proyecto de Supabase detrás hay registro e
   inicio de sesión de verdad, el progreso viaja entre dispositivos y el
   contenido queda cerrado a quien no tenga cuenta.

   La clave "anon" es pública por diseño: va en el navegador y no da acceso a
   nada por sí sola. Lo que protege los datos son las políticas de la base
   (RLS), que están en supabase/esquema.sql. Ahí no se pone nunca la
   service_role key.

   Instrucciones completas en DESPLIEGUE.md
   ========================================================================== */

const CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: "",

  // Con acceso cerrado, quien no ha entrado no ve el contenido.
  // En modo local se ignora: el curso se ve siempre.
  accesoCerrado: true
};
