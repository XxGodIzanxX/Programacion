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
| Modo grabación | Chrome oculto, animaciones ralentizadas y recorrido automático por secciones con `requestAnimationFrame` |
| Otros | Barra de progreso de scroll, nav activo por sección, menú móvil, marquesina, acordeón FAQ, CTA flotante |

Todo respeta `prefers-reduced-motion`: sin autoplay, sin rotación y sin reveals.

## Modo grabación

Pensado para grabar la web sin que se vea la interfaz ni el ratón, y con las animaciones
lo bastante lentas como para que se aprecien.

Se activa de tres formas: tecla **G**, el botón del punto dorado en la barra, o abriendo
el archivo con `#grabacion` al final de la URL.

Mientras está activo:

- desaparecen la barra de navegación, la barra de progreso y el botón flotante;
- el molar gira al 45 % de velocidad, los reveals pasan de 0,7 s a 1,5 s, la marquesina
  de 34 s a 78 s y los contadores de 1,4 s a 2,8 s;
- el cursor se oculta solo tras 2 s sin moverlo;
- los reveals y los contadores se rearman, así que la toma empieza siempre desde cero.

**Recorrido guiado** (evita el scroll a trompicones del trackpad):

| Tecla | Acción |
|---|---|
| `espacio` | inicia o pausa el recorrido automático por las 9 secciones |
| `← →` | salta a la parada anterior o siguiente |
| `↑ ↓` | ritmo del recorrido, de 0,5× a 2× |
| `G` / `esc` | salir del modo grabación |

El recorrido se mueve a ~250 px/s con easing cúbico y se detiene 2,8 s en cada sección.

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
