# Ares Ediciones — web

Web del sello. Estática: HTML, CSS y JavaScript sin librerías ni build.
Se abre haciendo doble clic en `index.html` y funciona igual en cualquier hosting.

## Qué es Ares en esta web

Ares Ediciones es el **sello de Alan Gutiérrez**, y los siete títulos son suyos.
La web lo dice abiertamente: hay una sección "El autor" y el sello se presenta
como decisión propia, no como una editorial con muchas firmas.

Es deliberado. Un sello de un solo autor que aparenta ser una editorial general
se cae en cuanto alguien mira los siete libros y ve la misma firma, y se cae
justo en el momento en que el lector está decidiendo si comprar. Además el
activo es el autor: quien termina un libro compra el siguiente por quien lo
escribe, no por el logo de la portada.

Si algún día Ares publica a terceros, hay que **volver a añadir** la sección de
manuscritos que se quitó (formulario de envío y el "Enviar un manuscrito" de la
sección Próximamente). Está en el historial de git.

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
| `amazon`   | El libro en Amazon: ASIN o URL, ver abajo                            |
| `formatos` | `["Tapa blanda", "Kindle"]`                                          |
| `destacado`| `true` en **uno solo**: es el que se abre en la portada              |

Mientras `amazon` esté vacío, ese libro muestra **Próximamente** con el botón
desactivado en vez de un enlace roto.

### El campo `amazon` admite las tres formas

Pega la que tengas más a mano, da igual cuál:

```js
amazon: "B0CH3XKQ7M",                            // solo el ASIN
amazon: "https://www.amazon.es/dp/B0CH3XKQ7M",   // la URL limpia
amazon: "https://www.amazon.es/Titulo-largo/dp/B0CH3XKQ7M/ref=sr_1_1?crid=2ABC&qid=177...",
```

De las tres se extrae el ASIN y se reconstruye `https://www.amazon.es/dp/ASIN`.
Las URLs que copia Amazon del navegador llevan colgando el término de búsqueda,
la posición del resultado y media docena de parámetros de rastreo: mandar eso a
tus lectores es feo y se rompe con el tiempo.

**En la web nunca se ve la URL**: el enlace es el botón que dice *Comprar en
Amazon*, y en el catálogo *Ver todos en Amazon*. La URL solo existe aquí, en
`datos/libros.js`.

### Si eres afiliado de Amazon

Pon tu etiqueta **una sola vez** en `EDITORIAL.amazonTag` y se añade sola a los
siete enlaces. No la pegues en cada libro: el día que cambie tendrías que tocar
siete sitios y te dejarías uno.

En cuanto pones la etiqueta aparece automáticamente el aviso de afiliación en el
pie. No es decorativo: declararlo es obligatorio en el programa de Amazon, y va
atado a la etiqueta precisamente para que no dependa de que alguien se acuerde.

### `EDITORIAL.amazonAutor`

La página del autor en Amazon. Alimenta tres botones: el del final del catálogo
("Ver todos en Amazon"), el de la sección del autor y el de Próximamente
(ambos "Seguir en Amazon"). Si la dejas en `""`, los tres desaparecen: mejor que
falte un botón a que haya uno que no lleva a ningún sitio.

**El botón de seguir es el más rentable de la web.** Amazon manda un correo a
tus seguidores cada vez que publicas. Con siete libros fuera y el octavo en
camino, esa lista *es* el lanzamiento del octavo: es la única forma que tienes
de avisar a alguien que ya te leyó, sin pagar publicidad.

### `EDITORIAL.autor`

Los textos de la sección "El autor":

| Campo     | Qué es                                                          |
|-----------|-----------------------------------------------------------------|
| `nombre`  | Nombre del autor. También genera el monograma si no hay foto     |
| `titular` | Una línea. Lo primero que se lee de él                           |
| `bio`     | Dos o tres párrafos separados por `\n\n`, **en primera persona** |
| `foto`    | Ruta a un retrato. Vertical 4:5. Vacío = monograma dorado        |

La bio en tercera persona ("Alan Gutiérrez nació en...") suena a nota de prensa
y distancia. En primera persona vende, porque esta sección no informa: decide si
el lector te compra a ti.

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
