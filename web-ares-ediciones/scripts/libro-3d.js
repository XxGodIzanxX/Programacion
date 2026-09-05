/* ===========================================================================
   ARES EDICIONES — MOTOR DEL LIBRO 3D
   ---------------------------------------------------------------------------
   Dos cosas y nada más:

   1) construirLibro()  — fabrica el objeto libro (tapa, hojas, lomo, canto)
                          en DOM. Lo usan la cabecera y la ficha.
   2) MotorApertura     — traduce el scroll a una variable CSS --p (0..1).

   Por qué así: el JS no anima nada, solo mide. Todas las transformaciones
   viven en animaciones-3d.css. Si mañana quieres que el libro se abra de otra
   forma, tocas el CSS y este archivo no se entera.
   =========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     UTILIDADES
     ------------------------------------------------------------------------ */

  const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esMovil = window.matchMedia("(max-width: 720px)").matches;

  function crear(etiqueta, clase, texto) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto != null) el.textContent = texto;
    return el;
  }

  /* Escapa texto que va dentro de un atributo o de innerHTML.
     Los datos salen de libros.js (los escribes tú), pero si algún día vienen
     de un CMS esto evita que un título con < > rompa la página. */
  function limpio(txt) {
    return String(txt == null ? "" : txt)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Grosor del lomo derivado de las páginas reales del libro.
     Un libro de 190 págs. y otro de 412 no se ven igual: ese detalle es el
     que hace que el 3D parezca un libro y no una caja. */
  function grosorSegunPaginas(paginas) {
    // Sin dato de páginas usamos un grosor medio: es mejor un lomo creíble
    // que inventarse un número que luego se muestra como si fuera cierto.
    const p = Number(paginas) || 260;
    // 0.05 a 0.11 de la altura, saturando en los extremos
    const t = Math.min(1, Math.max(0, (p - 140) / 380));
    return (0.05 + t * 0.06).toFixed(4);
  }

  /* ------------------------------------------------------------------------
     LA PORTADA
     Si hay imagen, se usa. Si no, se genera una portada tipográfica con los
     colores de marca (no un rectángulo gris: una portada de verdad).
     ------------------------------------------------------------------------ */

  function construirPortada(libro) {
    if (libro.portada) {
      const img = crear("img", "portada-img");
      img.src = libro.portada;
      img.alt = "Portada de " + libro.titulo;
      img.loading = "lazy";
      img.decoding = "async";
      // Si la ruta está mal, no dejamos un icono roto: caemos a la tipográfica
      img.addEventListener("error", function () {
        const sust = construirPortadaTipografica(libro);
        img.replaceWith(sust);
      });
      return img;
    }
    return construirPortadaTipografica(libro);
  }

  function construirPortadaTipografica(libro) {
    const cont = crear("div", "portada-tipo");
    cont.appendChild(crear("div", "sello", "Ares Ediciones"));
    cont.appendChild(crear("div", "tit", libro.titulo || "Sin título"));
    cont.appendChild(crear("div", "aut", libro.autor || ""));
    return cont;
  }

  /* ------------------------------------------------------------------------
     CONSTRUIR EL LIBRO COMPLETO
     opciones.hojas  — nº de hojas que se abren (menos en móvil)
     opciones.cita   — texto que se ve en la página interior al abrirse
     ------------------------------------------------------------------------ */

  function construirLibro(libro, opciones) {
    const op = opciones || {};
    const nHojas = op.hojas != null ? op.hojas : (esMovil ? 3 : 6);

    const el = crear("div", "libro");
    el.style.setProperty("--color-libro", libro.color || "#C1121F");
    el.style.setProperty("--grosor", "calc(var(--alto-libro) * " + grosorSegunPaginas(libro.paginas) + ")");

    /* --- Grosor: cabeza, canto y lomo --- */
    el.appendChild(crear("div", "cabeza"));
    el.appendChild(crear("div", "canto"));

    const lomo = crear("div", "lomo");
    lomo.appendChild(crear("span", null, libro.titulo || "Ares"));
    el.appendChild(lomo);

    /* --- Tapa trasera --- */
    el.appendChild(crear("div", "cara tapa-trasera"));

    /* --- Página interior visible cuando se abre --- */
    const paginaDerecha = crear("div", "pagina-interior");
    paginaDerecha.appendChild(crear("p", null, op.cita || libro.frase || ""));
    el.appendChild(paginaDerecha);

    /* --- Hojas --- */
    for (let i = 0; i < nHojas; i++) {
      const hoja = crear("div", "cara hoja");
      hoja.style.setProperty("--i", i);
      hoja.style.setProperty("--n", nHojas);
      el.appendChild(hoja);
    }

    /* --- Tapa frontal, con portada, brillo y reverso --- */
    /* La tapa son DOS caras hermanas dentro de un envoltorio con
       preserve-3d: exterior (la portada) e interior (la página izquierda
       del libro abierto). Ver el comentario largo en animaciones-3d.css:
       si se hace con una sola cara, la interior no se ve nunca. */
    const tapa = crear("div", "tapa");

    const exterior = crear("div", "exterior");
    exterior.appendChild(construirPortada(libro));
    exterior.appendChild(crear("div", "brillo"));

    const caraInterior = crear("div", "interior");
    const guarda = crear("div", "guarda");
    guarda.appendChild(crear("div", "marca-agua", "ARES"));
    guarda.appendChild(crear("div", "filete"));
    guarda.appendChild(crear("div", "autor-guarda", libro.autor || ""));
    caraInterior.appendChild(guarda);

    tapa.append(exterior, caraInterior);
    el.appendChild(tapa);

    /* --- Sombra sobre el suelo --- */
    el.appendChild(crear("div", "sombra-suelo"));

    return el;
  }

  /* ------------------------------------------------------------------------
     MOTOR DE APERTURA POR SCROLL
     ------------------------------------------------------------------------
     Cómo funciona:
       .pista es un contenedor alto (320vh). Dentro, .panel-fijo es sticky.
       Mientras recorres la pista, el panel se queda quieto en pantalla y
       nosotros calculamos qué porcentaje de la pista llevas: ese porcentaje
       es --p, y el CSS lo convierte en grados de apertura.

     Por qué NO usamos animation-timeline: scroll() todavía:
       lo soportan Chrome y Edge, pero no Safari ni Firefox en versiones
       estables recientes. Este cálculo son 4 líneas, funciona en todos y
       nos deja además reusar --p para el texto y el indicador de scroll.

     Coste: un listener de scroll pasivo que solo apunta una posición, y un
     requestAnimationFrame que escribe una variable. No hay layout ni repaint
     provocados por JS: el navegador solo recompone capas en GPU.
     ------------------------------------------------------------------------ */

  /* pista   = el contenedor alto (.pista)
     destino = el nodo donde se escribe --p (.panel-fijo). Todo lo que cuelga
               de él lo hereda: libro, textos y el indicador de scroll. */
  function MotorApertura(pista, destino) {
    let objetivo = 0;      // valor real del scroll
    let actual = 0;        // valor suavizado que se pinta
    let corriendo = false;
    let visible = true;

    function medir() {
      const caja = pista.getBoundingClientRect();
      // Recorrido útil = altura de la pista menos una pantalla (lo que dura
      // el sticky). Al empezar la pista arriba, top = 0 -> p = 0.
      const recorrido = caja.height - window.innerHeight;
      if (recorrido <= 0) { objetivo = 0; return; }
      const avance = -caja.top / recorrido;
      objetivo = Math.min(1, Math.max(0, avance));
    }

    function pintar() {
      // Suavizado exponencial: el libro sigue al scroll con un pelín de
      // inercia. Sin esto el movimiento se ve digital y a saltos.
      actual += (objetivo - actual) * 0.14;
      if (Math.abs(objetivo - actual) < 0.0004) actual = objetivo;
      destino.style.setProperty("--p", actual.toFixed(4));

      if (visible && Math.abs(objetivo - actual) > 0.0002) {
        requestAnimationFrame(pintar);
      } else {
        corriendo = false;
      }
    }

    function arrancar() {
      if (corriendo || !visible) return;
      corriendo = true;
      requestAnimationFrame(pintar);
    }

    function alScroll() {
      medir();
      arrancar();
    }

    // Cuando la cabecera no está en pantalla, paramos el bucle entero.
    // Es la diferencia entre gastar batería siempre o solo cuando se ve.
    const centinela = new IntersectionObserver(function (entradas) {
      visible = entradas[0].isIntersecting;
      if (visible) { medir(); arrancar(); }
    }, { rootMargin: "120px" });
    centinela.observe(pista);

    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll, { passive: true });
    medir();
    actual = objetivo;
    destino.style.setProperty("--p", actual.toFixed(4));
    arrancar();
  }

  /* ------------------------------------------------------------------------
     PARALAJE DE RATÓN
     El libro te sigue muy ligeramente. Solo en dispositivos con puntero fino:
     en táctil no hay ratón y en un portátil sin ratón tampoco molesta.
     ------------------------------------------------------------------------ */

  function paralaje(destino) {
    if (sinMovimiento) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let px = 0, py = 0, mx = 0, my = 0, activo = false;

    window.addEventListener("pointermove", function (e) {
      px = (e.clientX / window.innerWidth - 0.5) * 2;
      py = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!activo) { activo = true; requestAnimationFrame(suavizar); }
    }, { passive: true });

    function suavizar() {
      mx += (px - mx) * 0.07;
      my += (py - my) * 0.07;
      destino.style.setProperty("--mx", mx.toFixed(4));
      destino.style.setProperty("--my", my.toFixed(4));
      if (Math.abs(px - mx) > 0.001 || Math.abs(py - my) > 0.001) {
        requestAnimationFrame(suavizar);
      } else {
        activo = false;
      }
    }
  }

  /* ------------------------------------------------------------------------
     API PÚBLICA
     ------------------------------------------------------------------------ */

  window.Ares3D = {
    construirLibro: construirLibro,
    MotorApertura: MotorApertura,
    paralaje: paralaje,
    sinMovimiento: sinMovimiento,
    esMovil: esMovil,
    limpio: limpio
  };
})();
