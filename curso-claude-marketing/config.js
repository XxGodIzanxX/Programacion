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
  /* --- LICENCIA -----------------------------------------------------------
     Lo rellena `emitir.py` al generar la copia de cada comprador. No se toca
     a mano. Con nombre puesto, el curso no pide identificarse: ya sabe de
     quién es la copia, y lo enseña en la portada y en el pie.
     --------------------------------------------------------------------- */
  licencia: { nombre: "", email: "", emitida: "" },

  /* --- CONTACTO -----------------------------------------------------------
     Aparece en la portada y al terminar el curso. Si el archivo circula, esto
     es lo que convierte una copia filtrada en un contacto.
     --------------------------------------------------------------------- */
  autor: {
    nombre: "Izan Gutiérrez",
    empresa: "Ryu Ads",
    web: "https://ryuads.com",
    email: "info@ryuads.com",
    frase: "Agencia de marketing digital: SEO, Google Ads, YouTube Ads, Meta Ads, desarrollo web, redes y automatización con IA."
  },

  supabaseUrl: "",
  supabaseAnonKey: "",

  // Con acceso cerrado, quien no ha entrado no ve el contenido.
  // En modo local se ignora: el curso se ve siempre.
  accesoCerrado: true
};
