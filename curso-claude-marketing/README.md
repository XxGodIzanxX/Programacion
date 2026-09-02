# Claude para Marketing — plataforma del curso

Web de lecciones. Se abre `index.html` con doble clic: no necesita servidor,
instalación ni conexión (salvo las fuentes, que caen a las del sistema sin ella).

## Los dos archivos que importan

| Archivo | Qué es | ¿Se toca? |
|---|---|---|
| `contenido.js` | Todo el temario y todo el texto del curso | **Sí, siempre** |
| `index.html` | El motor: navegación, progreso, render, temas | Solo para cambiar cómo se ve |

Para añadir material **nunca hay que abrir el `index.html`**. Todo va en
`contenido.js`.

## Estructura del contenido

El curso son `modulos`, y cada módulo tiene `lecciones`. Cada lección:

```js
{
  id: "m3-l1",             // único, no se repite ni se cambia (guarda el progreso)
  titulo: "Crear activos de marca",
  duracion: 15,            // minutos, alimenta el "quedan ~X min"
  plataforma: "Claude.ai", // "Claude.ai" o "Cowork" — pinta la etiqueta y el filtro
  objetivo: "Una frase: qué sabrá hacer el alumno al terminar.",
  estado: "listo",         // "pendiente" mientras no tenga contenido
  bloques: [ ... ],        // el cuerpo de la lección
  ejercicio: "Qué tiene que hacer después de leer.",
  recursos: [{ titulo: "Plantilla", url: "https://..." }]
}
```

## Bloques disponibles

```js
{ t:"texto",   md:"Párrafo. Admite **negrita**, *cursiva*, `código` y [enlace](url)." }
{ t:"lista",   items:["uno","dos"] }
{ t:"pasos",   items:["primero","segundo"] }        // numerada
{ t:"prompt",  titulo:"Para qué sirve", texto:"El prompt literal" }
{ t:"ejemplo", titulo:"Salida de Claude", texto:"Texto de ejemplo" }
{ t:"archivo", nombre:"SKILL.md", texto:"Contenido literal del archivo" }
{ t:"aviso",   texto:"Advertencia o error común." }
{ t:"clave",   texto:"La idea que hay que recordar." }
{ t:"tabla",   cabeceras:["A","B"], filas:[["1","2"]] }
{ t:"cita",    texto:"...", autor:"Quién" }
{ t:"video",   url:"https://youtu.be/XXXX", titulo:"..." }
```

El bloque `prompt` lleva botón de copiar. Es el bloque importante: en un curso
de Claude lo que el alumno se lleva son los prompts, no los párrafos.

## Progreso

Se guarda en el `localStorage` del navegador de cada alumno, con la clave
`curso-claude-marketing:v1`. Vive solo en su equipo: no hay servidor, no se
sincroniza entre dispositivos y no llega a nadie más. Si cambias el `id` de una
lección, quien la tuviera completada la verá otra vez pendiente.

## Publicar como página única

```bash
python3 construir.py
```

Genera dos archivos en `dist/`:

- `curso.html` — todo en uno, para enviar por correo o subir a cualquier hosting.
- `curso-artifact.html` — lo mismo sin la envoltura `<html>`, para publicarlo
  como Artifact.

## El temario

Son los **12 casos de uso de marketing publicados por Anthropic**, reordenados
por ciclo de trabajo en vez de por orden alfabético, y precedidos de un módulo
de fundamentos que es prerrequisito de todos ellos.

| Módulo | Lecciones | De dónde salen |
|---|---|---|
| 1 · Antes de empezar | 5 | Propias + la skill de marca |
| 2 · Investigar y definir | 3 | Personas, comparativa competitiva, brief |
| 3 · Marca | 3 | Activos, contenido alineado, auditoría visual |
| 4 · Producir y distribuir | 2 | Adaptar entre plataformas, reutilizar en canales |
| 5 · Medir y decidir | 3 | Campañas, anuncios, recaudación de fondos |

16 lecciones, 192 minutos. Escritas enteras: 1.1, 1.2 y 1.4. El resto tiene el
esqueleto puesto —título, objetivo, duración, plataforma— y sale marcada como
pendiente con el punto en ámbar.

**"Empaqueta tus guías de marca en una skill" está en el módulo 1 a propósito**,
aunque en el listado original sea un caso de uso más. Es la única de las doce
que construye una herramienta en vez de pedir un entregable, y todo lo que viene
después la usa: el módulo 3 entero da por hecho que ya existe. Puesta al final
sería una lección; puesta al principio es la infraestructura del curso.

### Dos avisos sobre el temario original

- **La mitad son de Cowork, que es otro producto.** Por eso cada lección declara
  su `plataforma` y el índice tiene filtro: quien no tenga Cowork puede ver solo
  las 10 que sí puede ejecutar. La franja de color a la izquierda de cada lección
  en el índice es latón para Claude.ai y ciruela para Cowork.
- **"Adaptar contenido entre plataformas" (4.1) y "Reutiliza contenido en todos
  los canales" (4.2) se solapan mucho.** Se mantienen separadas porque una es
  pieza a pieza en Claude.ai y la otra es por lotes en Cowork, pero si el curso
  hay que acortar, ahí está el recorte más barato.
- **"Recaudación de fondos" (5.3) es de ONG**, no de agencia. Está incluida por
  fidelidad al listado original; si tu audiencia es solo comercial, sobra.
