# Dental Áurea — landing 3D para clínica dental

Web de demostración de una clínica dental genérica, pensada para grabarla en vídeo.
Un único archivo autocontenido: `index.html`. Ábrelo con doble clic, no necesita servidor
ni build.

## Qué lleva

| Bloque | Implementación |
|---|---|
| Molar 3D interactivo | Three.js r128 (UMD por CDN). Geometría procedural: corona por `LatheGeometry`, cúspides, dos raíces, dos anillos metálicos y 420 partículas |
| Interacción del 3D | Arrastre con inercia, parallax con el ratón, rotación ligada al scroll, pausa cuando el canvas sale de pantalla |
| Carrusel de tratamientos | Vanilla: scroll-snap + arrastre con puntero, flechas, dots sincronizados |
| Tarjetas con inclinación | `perspective` + `rotateX/rotateY` según la posición del cursor |
| Antes / después | Comparador arrastrable con `clip-path`, accesible por teclado. Las dos sonrisas son SVG generados en JS (nada de fotos de stock) |
| Carrusel de opiniones | Autoplay cada 6 s, flechas y dots, se reinicia al interactuar |
| Contadores | Animación con `requestAnimationFrame` + easing cúbico, disparada por `IntersectionObserver` |
| Reserva de cita | Formulario en 3 pasos con validación, resumen y pantalla de confirmación |
| Tema claro / oscuro | Tokens CSS en `:root`, `prefers-color-scheme` y `[data-theme]`, con persistencia en `localStorage` |
| Otros | Barra de progreso de scroll, nav activo por sección, menú móvil, marquesina, acordeón FAQ, CTA flotante |

Todo respeta `prefers-reduced-motion`: sin autoplay, sin rotación y sin reveals.

## Decisiones

- **Una sola librería.** Three.js es la única dependencia externa. Carrusel, tilt, comparador
  y reveals van en vanilla JS: menos peso, cero CSS externo que pueda fallar al grabar.
- **Sin imágenes.** Sonrisas, retratos e iconos son SVG generados o inline. El archivo funciona
  sin conexión salvo por las fuentes y Three.js.
- **Identidad propia.** Porcelana + petróleo + oro cerámico, con Fraunces / Manrope /
  IBM Plex Mono, en lugar del azul clínico de plantilla.

## Aviso

Clínica, casos, precios y profesionales son ficticios. Es una demo visual, no una web real:
el formulario no envía datos a ningún sitio.
