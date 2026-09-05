/* ===========================================================================
   ARES EDICIONES — CATÁLOGO
   ---------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE TIENES QUE TOCAR PARA AÑADIR O CAMBIAR LIBROS.
   Todo lo demás (portada 3D, tarjetas, ficha, botón de Amazon) se genera solo
   a partir de esta lista.

   Para añadir el libro nº 8 cuando lo tengas: copia un bloque entero
   { ... }, pégalo antes del corchete final y cambia los datos. Nada más.

   CAMPOS
   -------
   id          Identificador corto sin espacios ni acentos. Se usa en la URL
               (#libro-nombre) y para enlazar. Obligatorio y único.
   titulo      Título del libro tal cual aparece en la portada.
   subtitulo   Opcional. Deja "" si no tiene.
   autor       Nombre del autor o autora.
   anio        Año de publicación (número o texto).
   paginas     Nº de páginas. Se usa también para calcular el grosor del
               lomo en 3D: más páginas = libro más gordo. Pon un número real.
   genero      Etiqueta corta. Aparece como chip sobre la tarjeta.
               Ej: "Novela negra", "Ensayo", "Poesía", "Fantasía".
   color       Color dominante del libro. Se usa para el lomo, el brillo y el
               acento de su ficha. Usa uno de los cuatro de marca:
               "#C1121F" rojo · "#0B2A5B" azul · "#D4A537" oro · "#12111A" negro
   portada     Ruta de la imagen de portada.
               Guárdalas en imagenes/portadas/ y pon aquí "imagenes/portadas/loquesea.jpg"
               Proporción recomendada 2:3 (ej. 1200x1800 px).
               Si la dejas en "" sale una portada tipográfica generada
               automáticamente con los colores de marca (queda digna, pero
               pon la real en cuanto la tengas).
   sinopsis    Texto de la ficha. 2 o 3 párrafos separados por \n\n.
               Es lo que más vende: escríbelo como contraportada, no como
               resumen de Wikipedia.
   frase       Una sola línea, un gancho. Sale en grande sobre la ficha.
               Puede ser una cita del libro o una reseña.
   amazon      El libro en Amazon. Vale CUALQUIERA de estas tres formas,
               pega la que tengas más a mano:
                 "B0CXXXXXXX"                              ← solo el ASIN
                 "https://www.amazon.es/dp/B0CXXXXXXX"     ← la URL limpia
                 "https://www.amazon.es/Titulo-largo/dp/B0CXXXXXXX/ref=sr_1_1?crid=..."
                                                           ← lo que copia el navegador
               De las tres se extrae el ASIN y se reconstruye una URL corta,
               sin los parámetros de rastreo que Amazon cuelga al copiar.
               Mientras esté en "" el botón sale desactivado y avisa de que
               ese título aún no está a la venta.
   formatos    Lista de formatos disponibles. Ej: ["Tapa blanda", "Kindle"]
   destacado   true en UNO solo de los libros: es el que aparece en la
               portada 3D gigante de la cabecera. En el resto, false.
   =========================================================================== */

const LIBROS = [

  {
    id: "libro-1",
    titulo: "TÍTULO DEL LIBRO 1",
    subtitulo: "",
    autor: "Alan Gutiérrez",
    anio: "2026",
    paginas: 320,
    genero: "Género",
    color: "#C1121F",
    portada: "",
    frase: "Aquí va la frase gancho del libro destacado.",
    sinopsis: "Primer párrafo de la sinopsis. Sustituye este texto por la contraportada real del libro.\n\nSegundo párrafo. Cuenta el conflicto, no el argumento entero: lo que tiene que hacer es que el lector quiera saber cómo acaba.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: true
  },

  {
    id: "libro-2",
    titulo: "TÍTULO DEL LIBRO 2",
    subtitulo: "",
    autor: "Alan Gutiérrez",
    anio: "2026",
    paginas: 248,
    genero: "Género",
    color: "#0B2A5B",
    portada: "",
    frase: "",
    sinopsis: "Sinopsis del libro 2.\n\nSegundo párrafo.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  {
    id: "libro-3",
    titulo: "TÍTULO DEL LIBRO 3",
    subtitulo: "",
    autor: "Alan Gutiérrez",
    anio: "2026",
    paginas: 412,
    genero: "Género",
    color: "#D4A537",
    portada: "",
    frase: "",
    sinopsis: "Sinopsis del libro 3.\n\nSegundo párrafo.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  {
    id: "libro-4",
    titulo: "TÍTULO DEL LIBRO 4",
    subtitulo: "",
    autor: "Alan Gutiérrez",
    anio: "2026",
    paginas: 190,
    genero: "Género",
    color: "#12111A",
    portada: "",
    frase: "",
    sinopsis: "Sinopsis del libro 4.\n\nSegundo párrafo.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  {
    id: "libro-5",
    titulo: "TÍTULO DEL LIBRO 5",
    subtitulo: "",
    autor: "Alan Gutiérrez",
    anio: "2026",
    paginas: 356,
    genero: "Género",
    color: "#C1121F",
    portada: "",
    frase: "",
    sinopsis: "Sinopsis del libro 5.\n\nSegundo párrafo.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  {
    id: "libro-6",
    titulo: "TÍTULO DEL LIBRO 6",
    subtitulo: "",
    autor: "Alan Gutiérrez",
    anio: "2026",
    paginas: 275,
    genero: "Género",
    color: "#0B2A5B",
    portada: "",
    frase: "",
    sinopsis: "Sinopsis del libro 6.\n\nSegundo párrafo.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  {
    id: "libro-7",
    titulo: "TÍTULO DEL LIBRO 7",
    subtitulo: "",
    autor: "Alan Gutiérrez",
    anio: "2026",
    paginas: 300,
    genero: "Género",
    color: "#D4A537",
    portada: "",
    frase: "",
    sinopsis: "Sinopsis del libro 7.\n\nSegundo párrafo.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  }

];

/* ---------------------------------------------------------------------------
   DATOS DE LA EDITORIAL
   Cambia aquí los textos de marca, el correo y las redes.
   --------------------------------------------------------------------------- */

const EDITORIAL = {
  nombre: "Ares Ediciones",
  lema: "Editorial digital",

  /* --- Amazon -------------------------------------------------------------
     amazonAutor    Página del autor en Amazon. Sale como botón al final del
                    catálogo ("Ver todos en Amazon"). Déjalo en "" y el botón
                    desaparece solo.
     amazonTag      Etiqueta de afiliado, SI eres afiliado. Se añade sola a
                    los enlaces de los 7 libros: se pone una vez, aquí, no
                    siete veces. Si la usas, el aviso de afiliación del pie
                    aparece automáticamente (es obligatorio declararlo).
     amazonDominio  Cambia solo si vendes en otro país (www.amazon.com...).
     ---------------------------------------------------------------------- */
  amazonAutor: "https://www.amazon.es/stores/Alan-Gutierrez/author/B0GJN9V1D5",
  amazonTag: "",
  amazonDominio: "www.amazon.es",

  claim: "Libros que se abren solos.",
  descripcion: "Somos una editorial sin paredes. No tenemos almacén, ni escaparate, ni una estantería que llenar por obligación. Tenemos siete libros y el tiempo para elegir el octavo.",
  email: "hola@aresediciones.com",
  redes: [
    { nombre: "Instagram", url: "" },
    { nombre: "X",         url: "" },
    { nombre: "TikTok",    url: "" }
  ],
  // Se muestra en la sección "Próximamente"
  proximos: "Estamos leyendo manuscritos. Publicamos poco y despacio."
};
