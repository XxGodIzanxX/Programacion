/* ===========================================================================
   CONSTRUIR LA VERSIÓN DE UN SOLO ARCHIVO
   ---------------------------------------------------------------------------
   Mete los 3 CSS y los 4 JS dentro del HTML y escribe:

       despliegue/ares-ediciones-autocontenida.html

   Para qué sirve: un único archivo que se abre con doble clic, se manda por
   correo, se sube a cualquier hosting arrastrándolo o se pega en un
   constructor de webs. Sin carpetas, sin rutas que se rompan.

   Con la opción --con-imagenes incrusta ADEMÁS las portadas y el retrato
   como data URI, y entonces el archivo va de verdad solo:

       node despliegue/construir-autocontenido.js --con-imagenes

   Pesa unas 20 veces más (de ~100 KB a ~1,8 MB) porque base64 engorda los
   binarios un tercio y el navegador no puede cachear las imágenes por
   separado. Úsalo para mandar la web por correo o enseñarla sin conexión,
   nunca para publicarla en un hosting: ahí las imágenes van en su carpeta.

   Para qué NO sirve: para trabajar. Edita SIEMPRE los archivos originales
   (datos/libros.js, estilos/, scripts/) y vuelve a ejecutar esto:

       node despliegue/construir-autocontenido.js

   Si editas el archivo generado, el siguiente build se lo lleva por delante.
   =========================================================================== */

const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const SALIDA_BASE = path.join(__dirname, "ares-ediciones-autocontenida.html");

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

/* --- Imágenes como data URI (solo con --con-imagenes) -------------------- */

const CON_IMAGENES = process.argv.includes("--con-imagenes");

if (CON_IMAGENES) {
  const TIPOS = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
                  ".webp": "image/webp", ".gif": "image/gif", ".avif": "image/avif" };
  let incrustadas = 0, bytes = 0;

  // Las rutas viven dentro de datos/libros.js, que ya está en línea aquí,
  // así que basta con sustituir cada "imagenes/..." por su data URI.
  html = html.replace(/"(imagenes\/[^"]+\.(?:jpg|jpeg|png|webp|gif|avif))"/gi, function (todo, ruta) {
    const f = path.join(RAIZ, ruta);
    if (!fs.existsSync(f)) {
      console.warn("  aviso: " + ruta + " no existe, se deja la ruta tal cual");
      return todo;
    }
    const buf = fs.readFileSync(f);
    incrustadas++; bytes += buf.length;
    const tipo = TIPOS[path.extname(f).toLowerCase()] || "application/octet-stream";
    return '"data:' + tipo + ";base64," + buf.toString("base64") + '"';
  });

  console.log("Incrustadas " + incrustadas + " imágenes (" + (bytes / 1024 / 1024).toFixed(2) + " MB de origen)");
}

/* --- Comprobación: que no quede ninguna ruta local sin incrustar ---------- */
const sueltos = html.match(/(?:href|src)="(?:estilos|scripts|datos)\/[^"]+"/g);
if (sueltos) {
  console.error("Han quedado referencias locales sin incrustar:", sueltos);
  process.exit(1);
}

const SALIDA = CON_IMAGENES
  ? SALIDA_BASE.replace(".html", "-con-imagenes.html")
  : SALIDA_BASE;
fs.writeFileSync(SALIDA, html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log("Escrito " + path.relative(RAIZ, SALIDA) + " (" + kb + " KB)");
if (!CON_IMAGENES) {
  console.log("Las imágenes NO van dentro: sube imagenes/ al lado del HTML.");
  console.log("Para meterlas también: node despliegue/construir-autocontenido.js --con-imagenes");
}
