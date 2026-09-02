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
  titulo: "Anuncios: Meta, Google y YouTube",
  duracion: 14,            // minutos, alimenta el "quedan ~X min"
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

## Estado del temario

6 módulos, 24 lecciones. Dos escritas enteras (1.1 y 2.1) como referencia de
formato; el resto tiene el esqueleto puesto y sale marcada como pendiente en el
índice, con el punto en ámbar.
