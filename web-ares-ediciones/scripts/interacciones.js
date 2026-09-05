/* ===========================================================================
   ARES EDICIONES — INTERACCIONES GENERALES
   Barra, menú móvil, apariciones al hacer scroll, arranque del motor 3D
   y datos de la editorial.
   =========================================================================== */

(function () {
  "use strict";

  const L = window.Ares3D;

  /* ------------------------------------------------------------------------
     1. ARRANQUE DEL MOTOR 3D DE LA CABECERA
     ------------------------------------------------------------------------ */

  const pista = document.querySelector(".pista");
  const panel = document.querySelector(".panel-fijo");

  if (pista && panel && !L.sinMovimiento) {
    L.MotorApertura(pista, panel);
    L.paralaje(panel);
  }

  /* ------------------------------------------------------------------------
     2. BARRA SUPERIOR
     Se vuelve sólida al bajar. Lo resolvemos con IntersectionObserver sobre
     un centinela invisible arriba del todo: cero listeners de scroll.
     ------------------------------------------------------------------------ */

  const barra = document.querySelector(".barra");
  const centinela = document.getElementById("centinelaBarra");

  if (barra && centinela) {
    new IntersectionObserver(function (entradas) {
      barra.classList.toggle("posada", !entradas[0].isIntersecting);
    }, { threshold: 0 }).observe(centinela);
  }

  /* --- Menú móvil --- */
  const hamburguesa = document.querySelector(".hamburguesa");
  if (hamburguesa && barra) {
    hamburguesa.addEventListener("click", function () {
      const abierta = barra.classList.toggle("abierta");
      hamburguesa.setAttribute("aria-expanded", String(abierta));
    });
    // Al elegir una sección, el menú se cierra solo
    barra.querySelectorAll(".menu a").forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        barra.classList.remove("abierta");
        hamburguesa.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. APARICIONES AL ENTRAR EN PANTALLA
     Observamos una vez y desconectamos: nada sigue corriendo después.
     ------------------------------------------------------------------------ */

  const observador = new IntersectionObserver(function (entradas, obs) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.06 });

  function observarApariciones() {
    document.querySelectorAll(".aparece:not(.visible)").forEach(function (el) {
      observador.observe(el);
    });
  }
  observarApariciones();
  // Las tarjetas del catálogo se crean por JS, así que volvemos a barrer
  window.addEventListener("load", observarApariciones);

  /* ------------------------------------------------------------------------
     4. DATOS DE LA EDITORIAL EN LA PÁGINA
     ------------------------------------------------------------------------ */

  if (typeof EDITORIAL !== "undefined") {
    document.querySelectorAll("[data-editorial]").forEach(function (el) {
      const clave = el.getAttribute("data-editorial");
      const valor = EDITORIAL[clave];
      if (typeof valor === "string" && valor) el.textContent = valor;
    });

    // Correo: mismo dato en el texto y en el enlace
    document.querySelectorAll("[data-email]").forEach(function (el) {
      el.textContent = EDITORIAL.email;
      if (el.tagName === "A") el.href = "mailto:" + EDITORIAL.email;
    });

    /* Botón "Ver todos en Amazon". Si no hay URL de autor, ni aparece: más
       vale que falte un botón a que haya uno que no lleva a ningún sitio. */
    const pieCatalogo = document.getElementById("pieCatalogo");
    const enlaceAutor = document.getElementById("enlaceAutor");
    if (pieCatalogo && enlaceAutor && EDITORIAL.amazonAutor) {
      enlaceAutor.href = EDITORIAL.amazonAutor;
      enlaceAutor.rel = "noopener noreferrer sponsored";
      pieCatalogo.hidden = false;
    }

    /* Aviso de afiliación: obligatorio en cuanto usas etiqueta de afiliado,
       así que lo atamos a la propia etiqueta y no a que alguien se acuerde. */
    const avisoAfiliado = document.getElementById("avisoAfiliado");
    if (avisoAfiliado && EDITORIAL.amazonTag) avisoAfiliado.hidden = false;

    // Redes: solo salen las que tengan URL puesta
    const listaRedes = document.getElementById("listaRedes");
    if (listaRedes && Array.isArray(EDITORIAL.redes)) {
      const conUrl = EDITORIAL.redes.filter(function (r) { return r.url; });
      if (!conUrl.length) {
        listaRedes.innerHTML = '<li class="apagado">Pon las URLs de tus redes en datos/libros.js</li>';
      } else {
        listaRedes.innerHTML = conUrl.map(function (r) {
          return '<li><a href="' + L.limpio(r.url) + '" target="_blank" rel="noopener">' +
                 L.limpio(r.nombre) + "</a></li>";
        }).join("");
      }
    }
  }

  /* ------------------------------------------------------------------------
     5. AÑO DEL PIE
     ------------------------------------------------------------------------ */

  const anio = document.getElementById("anioActual");
  if (anio) anio.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------------
     6. FORMULARIO
     No hay servidor: la web es estática. Abrimos el correo del usuario con
     todo escrito. Cuando tengas hosting con PHP o un servicio tipo Formspree,
     cambia esto por un envío real (está explicado en el README).
     ------------------------------------------------------------------------ */

  const formulario = document.getElementById("formularioContacto");
  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();
      const datos = new FormData(formulario);
      const destino = (typeof EDITORIAL !== "undefined" && EDITORIAL.email) || "";
      const asunto = "Manuscrito de " + (datos.get("nombre") || "");
      const cuerpo =
        "Nombre: " + (datos.get("nombre") || "") + "\n" +
        "Correo: " + (datos.get("correo") || "") + "\n\n" +
        (datos.get("mensaje") || "");
      window.location.href = "mailto:" + destino +
        "?subject=" + encodeURIComponent(asunto) +
        "&body=" + encodeURIComponent(cuerpo);
    });
  }
})();
