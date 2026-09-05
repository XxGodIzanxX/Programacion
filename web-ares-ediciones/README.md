# Ares Ediciones — web

Web de la editorial. Estática: HTML, CSS y JavaScript sin librerías ni build.
Se abre haciendo doble clic en `index.html` y funciona igual en cualquier hosting.

---

## Lo único que tienes que tocar

**`datos/libros.js`**. Ahí están los 7 libros y los datos de la editorial.
La web se genera entera a partir de ese archivo: las tarjetas, las fichas, el
libro grande de la portada y los botones de Amazon.

Para cada libro rellena:

| Campo      | Qué es                                                              |
|------------|---------------------------------------------------------------------|
| `titulo`   | Título del libro                                                     |
| `autor`    | Quién lo escribe                                                     |
| `anio`     | Año de publicación                                                   |
| `paginas`  | Número real: **decide el grosor del lomo en 3D**                     |
| `genero`   | Etiqueta corta que sale como chip                                    |
| `color`    | Color de la tapa. Usa uno de los 4 de marca (ver abajo)              |
| `portada`  | `imagenes/portadas/loquesea.jpg` — ver `imagenes/portadas/LEEME.md`  |
| `frase`    | Una línea gancho. Sale en grande sobre la ficha                      |
| `sinopsis` | Contraportada. Párrafos separados por `\n\n`                         |
| `amazon`   | **URL completa** del libro en Amazon                                 |
| `formatos` | `["Tapa blanda", "Kindle"]`                                          |
| `destacado`| `true` en **uno solo**: es el que se abre en la portada              |

Mientras `amazon` esté vacío, ese libro muestra **Próximamente** con el botón
desactivado en vez de un enlace roto.

### Para añadir el libro nº 8

Copia un bloque `{ ... }` entero de `datos/libros.js`, pégalo antes del `];`
final, cambia los datos y pon un `id` distinto. No hay que tocar nada más.

---

## Estructura

```
web-ares-ediciones/
├── index.html                  Estructura y textos fijos
├── datos/
│   └── libros.js               ← LOS LIBROS Y LOS DATOS DE LA EDITORIAL
├── estilos/
│   ├── base.css                Paleta, tipografías, reset, atmósfera
│   ├── animaciones-3d.css      El motor 3D: libro, hojas, apertura, tarjetas
│   └── componentes.css         Barra, botones, tarjetas, ficha, pie
├── scripts/
│   ├── libro-3d.js             Construye el libro y traduce scroll → apertura
│   ├── catalogo.js             Pinta las tarjetas y la ficha de cada libro
│   └── interacciones.js        Barra, menú móvil, apariciones, formulario
└── imagenes/
    └── portadas/               Aquí van las portadas
```

---

## Los colores de marca

Los cuatro colores que pediste, pero con jerarquía: si los cuatro pesan lo
mismo, la web parece una bandera. El reparto es:

| Color  | Hex       | Para qué                                          |
|--------|-----------|---------------------------------------------------|
| Negro  | `#08070B` | El lienzo. Todo el fondo                          |
| Oro    | `#D4A537` | La marca: títulos, filetes, botones secundarios   |
| Rojo   | `#C1121F` | **Solo la acción**: el botón de comprar en Amazon |
| Azul   | `#0B2A5B` | Profundidad: manchas de luz del fondo, tapas      |

El rojo está reservado a comprar. Si lo usas también para adornar, el botón de
Amazon deja de destacar y pierdes clics: ese botón es el único objetivo de
toda la web.

Las tapas de los libros sí pueden usar cualquiera de los cuatro (`color` en
`libros.js`). Si eliges un color muy oscuro, la interfaz de esa tarjeta pasa
automáticamente a oro para que el texto se siga leyendo.

Para cambiar la paleta: `estilos/base.css`, bloque `:root` del principio.

---

## Cómo funciona la animación del libro

No hay Three.js ni WebGL. Todo es **CSS 3D** (`transform-style: preserve-3d`),
que el navegador compone en la GPU.

Por qué así y no con una librería 3D:

- Pesa **0 KB** de librería. Una escena WebGL habrían sido 150–600 KB antes de
  pintar nada, y esto se ve sobre todo en móvil, que es de donde va a venir la
  mayoría de tu tráfico.
- El texto sigue siendo **texto de verdad**: se selecciona, se lee con un
  lector de pantalla y Google lo indexa. Dentro de un canvas WebGL no existe.
- Va fluido en un móvil de gama media. Una escena WebGL a pantalla completa,
  no siempre.

El JavaScript **no anima nada**: solo mide cuánto has scrolleado y escribe una
variable CSS, `--p`, de 0 (cerrado) a 1 (abierto). El CSS decide qué significa
eso. Si quieres cambiar cómo se abre el libro, tocas `animaciones-3d.css` y el
JavaScript ni se entera.

**Para cambiar cuánto dura la apertura**: la altura de `.pista` en
`animaciones-3d.css` (320vh por defecto). Más alto = se abre más despacio.

---

## Accesibilidad

- Con "reducir movimiento" activado en el sistema, el libro sale ya abierto y
  no se mueve nada. No es un detalle: para algunas personas estas animaciones
  provocan mareo real.
- La ficha usa `<dialog>` nativo: foco atrapado, cierre con `Esc` y fondo
  bloqueado los gestiona el navegador.
- Cada tarjeta tiene **un solo** punto de tabulación, no tres.

---

## Publicar

Sube el contenido de esta carpeta a la raíz del hosting (Hostinger, Netlify,
Vercel, GitHub Pages...). No hay que compilar nada.

Antes de publicar, repasa:

- [ ] Los 7 libros con su título, autor, sinopsis y enlace de Amazon
- [ ] Las 7 portadas en `imagenes/portadas/`
- [ ] El correo real en `EDITORIAL.email` (`datos/libros.js`)
- [ ] Las URLs de las redes en `EDITORIAL.redes`
- [ ] Una imagen de 1200×630 en `imagenes/og-ares.jpg` (la que sale al
      compartir el enlace en WhatsApp o redes)
- [ ] El dominio real en las etiquetas `og:` de `index.html`

### El formulario

Ahora mismo abre el correo del usuario con el mensaje escrito. Funciona sin
servidor, pero se pierde gente por el camino (mucha no tiene cliente de correo
configurado). Cuando publiques, cámbialo por un envío real:

- **Hostinger con PHP**: copia el `enviar.php` de `web-tabicmon` y apunta el
  `action` del formulario ahí.
- **Netlify**: añade `netlify` y `name="contacto"` al `<form>` y ya está.
- **Formspree / Getform**: pon su URL en el `action`.

En `scripts/interacciones.js`, apartado 6, está el punto exacto a cambiar.
