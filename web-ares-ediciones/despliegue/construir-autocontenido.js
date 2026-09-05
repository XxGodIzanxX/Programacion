/* ===========================================================================
   CONSTRUIR LA VERSIÓN DE UN SOLO ARCHIVO
   ---------------------------------------------------------------------------
   Mete los 3 CSS y los 4 JS dentro del HTML y escribe:

       despliegue/ares-ediciones-autocontenida.html

   Para qué sirve: un único archivo que se abre con doble clic, se manda por
   correo, se sube a cualquier hosting arrastrándolo o se pega en un
   constructor de webs. Sin carpetas, sin rutas que se rompan.

   Para qué NO sirve: para trabajar. Edita SIEMPRE los archivos originales
   (datos/libros.js, estilos/, scripts/) y vuelve a ejecutar esto:

       node despliegue/construir-autocontenido.js

   Si editas el archivo generado, el siguiente build se lo lleva por delante.
   =========================================================================== */

const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const SALIDA = path.join(__dirname, "ares-ediciones-autocontenida.html");

function leer(rel) {
  const f = path.join(RAIZ, rel);
  if (!fs.existsSync(f)) {
    console.error("No encuentro " + rel + ". ¿Lo has movido o renombrado?");
    process.exit(1);
  }
  return fs.readFileSync(f, "utf8");
}

let html = leer("index.html");

/* --- CSS: cada <link rel="stylesheet" href="estilos/..."> pasa a <style> ---
   Solo tocamos las rutas locales: el <link> de Google Fonts se queda como
   está, porque las fuentes hay que descargarlas de su servidor igualmente. */
html = html.replace(
  /[ \t]*<link rel="stylesheet" href="(estilos\/[^"]+)">\n?/g,
  function (_, ruta) {
    return "<style>\n/* ===== " + ruta + " ===== */\n" + leer(ruta) + "\n</style>\n";
  }
);

/* --- JS: cada <script src="..."> local pasa a <script> en línea ---------- */
html = html.replace(
  /[ \t]*<script src="((?:datos|scripts)\/[^"]+)"><\/script>\n?/g,
  function (_, ruta) {
    return "<script>\n/* ===== " + ruta + " ===== */\n" + leer(ruta) + "\n</script>\n";
  }
);

/* --- Aviso al principio del archivo generado ----------------------------- */
html = html.replace(
  "<head>",
  "<head>\n<!--\n  ARCHIVO GENERADO — NO LO EDITES A MANO.\n" +
  "  Sale de: node despliegue/construir-autocontenido.js\n" +
  "  Edita los originales (datos/libros.js, estilos/, scripts/) y reconstruye.\n" +
  "  Generado el " + new Date().toISOString().slice(0, 10) + "\n-->"
);

/* --- Comprobación: que no quede ninguna ruta local sin incrustar ---------- */
const sueltos = html.match(/(?:href|src)="(?:estilos|scripts|datos)\/[^"]+"/g);
if (sueltos) {
  console.error("Han quedado referencias locales sin incrustar:", sueltos);
  process.exit(1);
}

fs.writeFileSync(SALIDA, html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log("Escrito " + path.relative(RAIZ, SALIDA) + " (" + kb + " KB)");
console.log("Recuerda: las portadas de imagenes/portadas/ NO se incrustan.");
console.log("Si usas este archivo suelto, sube también esa carpeta al lado.");
