/* ===========================================================================
   ARES EDICIONES — CATÁLOGO
   ---------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE TIENES QUE TOCAR.
   Todo lo demás (portada 3D, tarjetas, ficha, botón de Amazon) se genera solo
   a partir de esta lista.

   LOS LIBROS SON UNA COLECCIÓN, no títulos sueltos. Por eso hay dos campos
   separados:

       serie   "Conversaciones existenciales con la I.A"   ← lo que comparten
       figura  "Julio César"                               ← lo que los distingue

   La tarjeta enseña la FIGURA en grande y la serie en pequeño encima. Si
   pusiéramos el título completo siete veces, el lector tendría que leer cinco
   palabras idénticas antes de llegar a la única que decide su compra.

   CAMPOS
   -------
   id        Identificador corto sin espacios ni acentos. Va en la URL
             (#julio-cesar) y sirve para enlazar una ficha concreta. Único.
   serie     Nombre de la colección. Deja "" si publicas algo fuera de ella.
   figura    El personaje. Es lo que se lee en grande en la tarjeta.
   titulo    Título completo, tal cual va en la portada y en Amazon.
   autor     Quien firma.
   anio      Año de publicación. Si lo dejas en "" no se muestra.
   paginas   Nº de páginas. Además de informar, DECIDE EL GROSOR DEL LOMO en
             la animación 3D: un libro de 190 y otro de 412 no se ven igual.
             Si lo dejas en null no se muestra y el lomo usa un grosor medio.
   genero    Etiqueta corta. Sale como chip sobre la tarjeta.
   color     Color de la tapa: tiñe el lomo y el acento de su ficha.
             Uno de los cuatro de marca:
               "#C1121F" rojo · "#0B2A5B" azul · "#D4A537" oro · "#12111A" negro
   portada   Ruta de la imagen. Las cinco que subiste ya están puestas.
   frase     Una línea gancho. Sale en grande sobre la ficha.
   sinopsis  Texto de la ficha. Párrafos separados por \n\n.
   amazon    ASIN ("B0CH3XKQ7M") o la URL del libro, en cualquier formato.
             Mientras esté en "" el botón sale desactivado.
   formatos  Ej. ["Tapa blanda", "Kindle"]
   destacado true en UNO solo: es el que se abre en la portada de la web.
   =========================================================================== */

const LIBROS = [

  {
    id: "julio-cesar",
    serie: "Conversaciones existenciales con la I.A",
    figura: "Julio César",
    titulo: "Conversaciones existenciales con la I.A de Julio César",
    autor: "Alan Gutiérrez",
    anio: "",
    paginas: null,
    genero: "Diálogos",
    color: "#C1121F",
    portada: "imagenes/portadas/julio-cesar.jpg",
    frase: "",
    sinopsis: "PENDIENTE: escribe aquí la contraportada de este título.\n\nNo la copies de Amazon: si tu web dice lo mismo que tu ficha de Amazon, no le das al lector ninguna razón para estar aquí.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: true
  },

  {
    id: "napoleon",
    serie: "Conversaciones existenciales con la I.A",
    figura: "Napoleón",
    titulo: "Conversaciones existenciales con la I.A de Napoleón",
    autor: "Alan Gutiérrez",
    anio: "",
    paginas: null,
    genero: "Diálogos",
    color: "#0B2A5B",
    portada: "imagenes/portadas/napoleon.jpg",
    frase: "",
    sinopsis: "PENDIENTE: escribe aquí la contraportada de este título.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  {
    id: "alejandro-magno",
    serie: "Conversaciones existenciales con la I.A",
    figura: "Alejandro Magno",
    titulo: "Conversaciones existenciales con la I.A de Alejandro Magno",
    autor: "Alan Gutiérrez",
    anio: "",
    paginas: null,
    genero: "Diálogos",
    color: "#D4A537",
    portada: "imagenes/portadas/alejandro-magno.jpg",
    frase: "",
    sinopsis: "PENDIENTE: escribe aquí la contraportada de este título.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  {
    id: "cleopatra",
    serie: "Conversaciones existenciales con la I.A",
    figura: "Cleopatra",
    titulo: "Conversaciones existenciales con la I.A de Cleopatra",
    autor: "Alan Gutiérrez",
    anio: "",
    paginas: null,
    genero: "Diálogos",
    color: "#0B2A5B",
    portada: "imagenes/portadas/cleopatra.jpg",
    frase: "",
    sinopsis: "PENDIENTE: escribe aquí la contraportada de este título.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  {
    id: "vlad-iii",
    serie: "Conversaciones existenciales con la I.A",
    figura: "Vlad III",
    titulo: "Conversaciones existenciales con la I.A de Vlad III",
    autor: "Alan Gutiérrez",
    anio: "",
    paginas: null,
    genero: "Diálogos",
    color: "#12111A",
    portada: "imagenes/portadas/vlad-iii.jpg",
    frase: "",
    sinopsis: "PENDIENTE: escribe aquí la contraportada de este título.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  /* ---------------------------------------------------------------------
     LOS DOS QUE FALTAN
     Dijiste siete títulos y subiste cinco portadas. Estos dos quedan como
     plantilla: cambia figura, titulo, color y portada, o BORRA el bloque
     entero si al final son cinco. La web cuenta los libros sola, así que el
     número de la sección "El sello" se ajusta sin tocar nada más.
     --------------------------------------------------------------------- */

  {
    id: "figura-6",
    serie: "Conversaciones existenciales con la I.A",
    figura: "FIGURA PENDIENTE",
    titulo: "Conversaciones existenciales con la I.A de ...",
    autor: "Alan Gutiérrez",
    anio: "",
    paginas: null,
    genero: "Diálogos",
    color: "#C1121F",
    portada: "",
    frase: "",
    sinopsis: "PENDIENTE.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  },

  {
    id: "figura-7",
    serie: "Conversaciones existenciales con la I.A",
    figura: "FIGURA PENDIENTE",
    titulo: "Conversaciones existenciales con la I.A de ...",
    autor: "Alan Gutiérrez",
    anio: "",
    paginas: null,
    genero: "Diálogos",
    color: "#D4A537",
    portada: "",
    frase: "",
    sinopsis: "PENDIENTE.",
    amazon: "",
    formatos: ["Tapa blanda", "Kindle"],
    destacado: false
  }

];

/* ---------------------------------------------------------------------------
   DATOS DE LA EDITORIAL
   --------------------------------------------------------------------------- */

const EDITORIAL = {
  nombre: "Ares Ediciones",
  lema: "Editorial digital",
  claim: "Los muertos también tienen algo que decir.",
  descripcion: "Ares Ediciones es el sello desde el que publico mi propio trabajo. No hay almacén, ni escaparate, ni una estantería que llenar por obligación. Hay una colección y el tiempo para escribir el siguiente título.",
  email: "hola@aresediciones.com",

  /* La colección da sentido al catálogo entero, así que se explica una vez
     aquí arriba y no se repite en las siete fichas. */
  serie: {
    nombre: "Conversaciones existenciales con la I.A",
    descripcion: "Cada libro es una conversación con la inteligencia artificial de una figura histórica. No es una biografía ni una novela: es un diálogo. Qué contestaría César si pudiera responder hoy, y qué dice de nosotros su respuesta."
  },

  redes: [
    { nombre: "Instagram", url: "" },
    { nombre: "X",         url: "" },
    { nombre: "TikTok",    url: "" }
  ],

  /* --- Amazon --------------------------------------------------------- */
  amazonAutor: "https://www.amazon.es/stores/Alan-Gutierrez/author/B0GJN9V1D5",
  amazonTag: "",              // Alan no es afiliado: se queda vacío
  amazonDominio: "www.amazon.es",

  /* --- El autor ------------------------------------------------------- */
  autor: {
    nombre: "Alan Gutiérrez",
    titular: "Escribo los libros y decido cuáles se publican.",
    bio: "PENDIENTE: tu biografía, en primera persona. De dónde vienes, qué te llevó a escribir y por qué acabaste montando tu propio sello.\n\nSegundo párrafo: de dónde sale la idea de sentar a hablar a un César o a una Cleopatra con una inteligencia artificial. Esa es justo la pregunta que se está haciendo quien llega hasta aquí.",
    foto: "imagenes/alan-gutierrez.jpg"
  },

  /* Escudo familiar. Ornamento de la sección del sello. Vacío = no aparece. */
  escudo: "imagenes/escudo-gutierrez-martinez.jpg",

  proximos: "El siguiente está en marcha. Publico poco y despacio, y prefiero tardar a sacar algo que no aguante una segunda lectura."
};
