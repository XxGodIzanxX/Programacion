/* ===========================================================================
   ARES EDICIONES — CATÁLOGO Y FICHA
   ---------------------------------------------------------------------------
   Pinta el libro grande de la cabecera, la rejilla de libros y la ficha que
   se abre al elegir uno. Todo sale de datos/libros.js: esta web no tiene los
   libros escritos a mano en ningún sitio.
   =========================================================================== */

(function () {
  "use strict";

  const L = window.Ares3D;

  /* ------------------------------------------------------------------------
     COLOR DE ACENTO DE CADA LIBRO
     El color del libro sirve para la TAPA, pero no siempre sirve para el
     texto: un libro negro sobre fondo negro deja el "Ver ficha" y la
     etiqueta de género invisibles. Así que calculamos su luminancia y, si
     es demasiado oscuro, la interfaz de esa tarjeta usa el oro de marca.
     La tapa se queda negra: cambia el acento, no el libro.
     ------------------------------------------------------------------------ */

  function luminancia(hex) {
    const h = String(hex || "").replace("#", "");
    if (h.length !== 6) return 1;
    const c = [0, 2, 4].map(function (i) {
      const v = parseInt(h.substr(i, 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  const ORO = "#D4A537";
  function acentoDe(libro) {
    const color = libro.color || "#C1121F";
    // Umbral bajo: solo rescatamos los que de verdad no se leerían.
    return luminancia(color) < 0.05 ? ORO : color;
  }

  /* ------------------------------------------------------------------------
     ENLACE DE AMAZON
     ------------------------------------------------------------------------
     Admite tres formas en el campo `amazon` de libros.js, para que puedas
     pegar lo que tengas a mano sin pensar:

       "B0CXXXXXXX"                          → solo el ASIN
       "https://www.amazon.es/dp/B0CXXXXXXX" → la URL limpia
       "https://www.amazon.es/Titulo-largo/dp/B0CXXXXXXX/ref=sr_1_1?crid=..."
                                             → lo que te copia el navegador

     De cualquiera de las tres sacamos el ASIN y reconstruimos una URL corta.
     Por qué molestarse: las URLs que copia Amazon llevan la sesión de quien
     copió, el término de búsqueda y media docena de parámetros de rastreo.
     Enviar eso a tus lectores es feo, se rompe con el tiempo y encima delata
     de dónde salió el enlace.

     Si eres afiliado, pon la etiqueta UNA vez en EDITORIAL.amazonTag y se
     añade sola a los siete enlaces. Ten en cuenta que ser afiliado obliga a
     declararlo de forma visible: eso ya está en el pie.
     ------------------------------------------------------------------------ */

  const ASIN = /(?:\/dp\/|\/gp\/product\/|\/product\/)([A-Z0-9]{10})|^([A-Z0-9]{10})$/;

  function enlaceAmazon(valor) {
    const bruto = String(valor || "").trim();
    if (!bruto) return "";

    const dominio = (typeof EDITORIAL !== "undefined" && EDITORIAL.amazonDominio) || "www.amazon.es";
    const tag = (typeof EDITORIAL !== "undefined" && EDITORIAL.amazonTag) || "";

    const m = bruto.match(ASIN);
    if (m) {
      const asin = m[1] || m[2];
      return "https://" + dominio + "/dp/" + asin + (tag ? "?tag=" + encodeURIComponent(tag) : "");
    }

    // No hemos sabido sacar el ASIN (un enlace de tienda, un acortador...).
    // Lo dejamos tal cual, pero solo si es http(s): así un "javascript:" o un
    // "data:" pegado por error nunca llega a convertirse en un enlace.
    return /^https?:\/\//i.test(bruto) ? bruto : "";
  }

  /* ------------------------------------------------------------------------
     COMPROBACIÓN DE DATOS
     Si libros.js falta o tiene un error de sintaxis, no dejamos una página
     rota y muda: avisamos en pantalla de qué pasa y cómo arreglarlo.
     ------------------------------------------------------------------------ */

  if (typeof LIBROS === "undefined" || !Array.isArray(LIBROS) || !LIBROS.length) {
    const hueco = document.getElementById("rejillaLibros");
    if (hueco) {
      hueco.innerHTML =
        '<div class="aviso-datos"><strong>No se han cargado los libros.</strong><br>' +
        'Revisa <code>datos/libros.js</code>: probablemente falte una coma o una comilla. ' +
        'Abre la consola del navegador (F12) para ver la línea exacta.</div>';
    }
    return;
  }

  /* ------------------------------------------------------------------------
     1. LIBRO DE LA CABECERA
     Es el que tenga destacado: true. Si no hay ninguno, el primero.
     ------------------------------------------------------------------------ */

  const destacado = LIBROS.find(function (l) { return l.destacado; }) || LIBROS[0];

  const escenaCabecera = document.getElementById("escenaCabecera");
  if (escenaCabecera) {
    escenaCabecera.appendChild(
      L.construirLibro(destacado, {
        cita: destacado.frase || (EDITORIAL && EDITORIAL.claim) || ""
      })
    );

    // Rellenamos los textos de la cabecera con los datos del destacado
    const serieDest = document.getElementById("serieDestacado");
    if (serieDest && destacado.serie) serieDest.textContent = destacado.serie;

    const t = document.getElementById("tituloDestacado");
    const a = document.getElementById("autorDestacado");
    const b = document.getElementById("botonDestacado");
    if (t) t.textContent = destacado.figura || destacado.titulo;
    if (a) a.textContent = destacado.autor;
    if (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        abrirFicha(destacado.id);
      });
    }
  }

  /* ------------------------------------------------------------------------
     2. REJILLA DE LIBROS
     Cada tarjeta lleva un mini-libro 3D que se entreabre al pasar por encima.
     ------------------------------------------------------------------------ */

  const rejilla = document.getElementById("rejillaLibros");

  function construirTarjeta(libro, indice) {
    const color = libro.color || "#C1121F";

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-libro aparece";
    tarjeta.style.setProperty("--acento", acentoDe(libro));
    // Escalonamos la aparición para que la rejilla "caiga" en cascada
    tarjeta.style.setProperty("--retraso", (indice % 4) * 90 + "ms");
    tarjeta.id = libro.id;

    /* --- mini libro 3D --- */
    const escena = document.createElement("div");
    escena.className = "escena-mini";
    escena.setAttribute("aria-hidden", "true");

    const mini = document.createElement("div");
    mini.className = "mini-libro";
    mini.style.setProperty("--color-libro", color);

    const canto = document.createElement("div"); canto.className = "mini-canto";
    const lomo  = document.createElement("div"); lomo.className  = "mini-lomo";
    const hojas = document.createElement("div"); hojas.className = "mini-hojas";
    const tapa  = document.createElement("div"); tapa.className  = "mini-tapa";

    if (libro.portada) {
      const img = document.createElement("img");
      img.className = "portada-img";
      img.src = libro.portada;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", function () {
        img.replaceWith(portadaTipografica(libro));
      });
      tapa.appendChild(img);
    } else {
      tapa.appendChild(portadaTipografica(libro));
    }

    mini.append(canto, lomo, hojas, tapa);
    escena.appendChild(mini);

    /* --- datos --- */
    const datos = document.createElement("div");
    datos.className = "datos";
    /* La FIGURA en grande y la serie en pequeño encima. Los siete títulos
       empiezan igual: poner el título completo obligaría a leer cinco
       palabras idénticas antes de llegar a la que decide la compra. */
    let html = "";
    if (libro.serie) html += '<p class="serie-tarjeta">' + L.limpio(libro.serie) + "</p>";
    html += '<h3 class="titulo">' + L.limpio(libro.figura || libro.titulo) + "</h3>";
    html += '<p class="autor">' + L.limpio(libro.autor) + "</p>";

    // Año y páginas solo si los hay: un "· págs." suelto delata un hueco
    const meta = [];
    if (libro.anio) meta.push(L.limpio(libro.anio));
    if (libro.paginas) meta.push(L.limpio(libro.paginas) + " págs.");
    if (meta.length) html += '<p class="meta">' + meta.join(" · ") + "</p>";

    html += '<span class="abrir">Ver ficha</span>';
    datos.innerHTML = html;

    /* --- chip de género ---
       Solo si aporta algo. En una colección donde los siete libros son
       "Diálogos", repetir la etiqueta siete veces no informa: decora. Si
       algún día publicas una novela suelta, los chips vuelven solos. */
    if (libro.genero && generosDistintos) {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = libro.genero;
      tarjeta.appendChild(chip);
    }

    /* --- disparador: un único punto de foco para teclado --- */
    const boton = document.createElement("button");
    boton.className = "disparador";
    boton.type = "button";
    boton.textContent = "Ver la ficha de " + (libro.titulo || libro.figura);
    boton.addEventListener("click", function () { abrirFicha(libro.id); });

    tarjeta.append(escena, datos, boton);
    return tarjeta;
  }

  function portadaTipografica(libro) {
    const cont = document.createElement("div");
    cont.className = "portada-tipo";
    cont.innerHTML =
      '<div class="sello">Ares Ediciones</div>' +
      '<div class="tit">' + L.limpio(libro.figura || libro.titulo) + "</div>" +
      '<div class="aut">' + L.limpio(libro.autor) + "</div>";
    return cont;
  }

  // ¿Tienen todos los libros el mismo género? Entonces el chip no distingue.
  const generosDistintos = new Set(
    LIBROS.map(function (l) { return l.genero || ""; })
  ).size > 1;

  if (rejilla) {
    const fragmento = document.createDocumentFragment();
    LIBROS.forEach(function (libro, i) {
      fragmento.appendChild(construirTarjeta(libro, i));
    });
    rejilla.appendChild(fragmento);
  }

  // Contador de títulos en la sección del manifiesto
  const contador = document.getElementById("contadorLibros");
  if (contador) contador.textContent = LIBROS.length;

  /* ------------------------------------------------------------------------
     3. FICHA DEL LIBRO
     Usamos <dialog> nativo: el navegador ya sabe atrapar el foco, cerrar con
     Esc y bloquear el fondo. Reimplementar eso a mano sale peor y accesible
     no queda nunca.
     ------------------------------------------------------------------------ */

  const dialogo = document.getElementById("fichaLibro");
  const cuerpo  = document.getElementById("fichaCuerpo");

  function abrirFicha(id) {
    const libro = LIBROS.find(function (l) { return l.id === id; });
    if (!libro || !dialogo || !cuerpo) return;

    cuerpo.innerHTML = "";
    cuerpo.style.setProperty("--acento", acentoDe(libro));

    /* --- columna izquierda: el libro en 3D, entreabierto --- */
    const visual = document.createElement("div");
    visual.className = "ficha-visual";

    const escena = document.createElement("div");
    escena.className = "escena";
    escena.setAttribute("aria-hidden", "true");
    escena.appendChild(L.construirLibro(libro, { hojas: L.esMovil ? 2 : 4 }));
    visual.appendChild(escena);

    /* --- columna derecha: la información --- */
    const info = document.createElement("div");
    info.className = "ficha-info";

    let html = "";
    const encabezado = [libro.genero, libro.serie].filter(Boolean).join(" · ");
    if (encabezado) html += '<p class="genero">' + L.limpio(encabezado) + "</p>";
    html += '<h2 class="t-l">' + L.limpio(libro.titulo || libro.figura) + "</h2>";
    if (libro.subtitulo) html += '<p class="serif t-m apagado">' + L.limpio(libro.subtitulo) + "</p>";
    if (libro.frase) html += '<p class="frase">' + L.limpio(libro.frase) + "</p>";

    html += '<div class="sinopsis">';
    String(libro.sinopsis || "").split("\n\n").forEach(function (parrafo) {
      if (parrafo.trim()) html += "<p>" + L.limpio(parrafo.trim()) + "</p>";
    });
    html += "</div>";

    /* Solo se listan los datos que existen. Una fila "Páginas: —" no informa
       de nada y hace que la ficha parezca a medio hacer. */
    const filas = [["Autoría", libro.autor], ["Año", libro.anio],
                   ["Páginas", libro.paginas],
                   ["Formatos", (libro.formatos || []).join(" · ")]]
      .filter(function (f) { return f[1]; })
      .map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + L.limpio(f[1]) + "</dd></div>"; });
    if (filas.length) html += '<dl class="fichas-datos">' + filas.join("") + "</dl>";

    info.innerHTML = html;

    /* --- acciones: el único rojo de la página --- */
    const acciones = document.createElement("div");
    acciones.className = "ficha-acciones";

    const comprar = document.createElement("a");
    comprar.className = "boton boton-comprar";
    const url = enlaceAmazon(libro.amazon);
    if (url) {
      comprar.href = url;
      comprar.target = "_blank";
      /* noopener evita que la pestaña de Amazon pueda tocar la nuestra.
         "sponsored" SOLO si hay etiqueta de afiliado: marca un enlace como
         pagado, y ponerlo sin serlo le dice a Google que tus enlaces son
         publicidad cuando no lo son. */
      comprar.rel = "noopener noreferrer" +
        ((typeof EDITORIAL !== "undefined" && EDITORIAL.amazonTag) ? " sponsored" : "");
      comprar.textContent = "Comprar en Amazon";
    } else {
      comprar.href = "#";
      comprar.setAttribute("aria-disabled", "true");
      comprar.textContent = "Próximamente";
    }
    acciones.appendChild(comprar);

    if (!url) {
      const aviso = document.createElement("p");
      aviso.className = "aviso-sin-enlace";
      aviso.textContent = "Aún no está a la venta. Pega su enlace o su ASIN de Amazon en datos/libros.js.";
      acciones.appendChild(aviso);
    }

    const cerrar = document.createElement("button");
    cerrar.type = "button";
    cerrar.className = "boton boton-fantasma";
    cerrar.textContent = "Cerrar";
    cerrar.addEventListener("click", function () { dialogo.close(); });
    acciones.appendChild(cerrar);

    info.appendChild(acciones);
    cuerpo.append(visual, info);

    if (typeof dialogo.showModal === "function") {
      dialogo.showModal();
    } else {
      dialogo.setAttribute("open", "");   // navegadores muy viejos
    }

    // Dejamos el libro en la URL: se puede compartir el enlace de una ficha
    if (history.replaceState) history.replaceState(null, "", "#" + libro.id);
  }

  if (dialogo) {
    // Clic en el fondo oscuro = cerrar
    dialogo.addEventListener("click", function (e) {
      if (e.target === dialogo) dialogo.close();
    });
    dialogo.addEventListener("close", function () {
      cuerpo.innerHTML = "";              // liberamos el 3D al cerrar
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    });
    const botonCerrar = document.getElementById("cerrarFicha");
    if (botonCerrar) botonCerrar.addEventListener("click", function () { dialogo.close(); });
  }

  /* Si alguien llega con .../#libro-3 en la URL, le abrimos esa ficha */
  const hash = location.hash.replace("#", "");
  if (hash && LIBROS.some(function (l) { return l.id === hash; })) {
    // Esperamos a que la página se asiente para que el scroll no dé un salto
    window.addEventListener("load", function () { setTimeout(function(){ abrirFicha(hash); }, 400); });
  }

  window.Ares3D.abrirFicha = abrirFicha;
})();
