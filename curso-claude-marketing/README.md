# Claude para Marketing — plataforma del curso

Web de lecciones. Se abre `index.html` con doble clic: no necesita servidor,
instalación ni conexión (salvo las fuentes, que caen a las del sistema sin ella).

## Los dos archivos que importan

| Archivo | Qué es | ¿Se toca? |
|---|---|---|
| `contenido.js` | Todo el temario, el texto del curso y el glosario | **Sí, siempre** |
| `config.js` | Conexión con Supabase. Vacío = modo local | Solo al desplegar |
| `index.html` | El motor: sesión, navegación, vistas, render | Solo para cambiar cómo se ve |
| `supabase/esquema.sql` | Tablas y políticas de seguridad | Una vez, al montar la base |
| `emitir.py` | Genera la copia personalizada de cada comprador | — |
| `DESPLIEGUE.md` | Cómo poner acceso real, si algún día haces membresía | — |

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

## Las cinco vistas

- **Curso** — las lecciones, con notas propias al final de cada una.
- **Taller** — el constructor de prompts, abajo.
- **Prompts** — los 25 prompts y archivos del curso juntos, filtrables y
  buscables, con enlace a la lección de origen. Es la vista que más se usa
  cuando ya has hecho el curso.
- **Avance** — porcentaje, tiempo hecho y restante, medidores por módulo, por
  dónde continuar, y todas tus notas recogidas.
- **Glosario** — los términos, en orden alfabético.

## El producto: un archivo que se vende

El curso se vende **como archivo**. Un HTML de unos 150 KB que se abre con doble
clic, funciona sin servidor y sin conexión, y no caduca. Lo que compra el
comprador es suyo para siempre.

```bash
python3 emitir.py "Marta Ruiz" marta@sucorreo.com
```

Deja en `emitidas/` la copia de esa persona, con su nombre en la portada, en el
pie y en la licencia. Esa copia entra directa: no pide identificarse, porque ya
sabe de quién es.

### Lo que esto protege, y lo que no

**No protege nada técnicamente.** Quien reciba el archivo lo abre. El nombre se
puede borrar con un editor de texto en dos minutos. Personalizar la copia es
**fricción social**, no seguridad: frena el reenvío por vergüenza de que circule
tu nombre, y ya.

De ahí salen dos consecuencias que conviene tener asumidas antes de poner precio:

1. **El precio tiene que aguantar la copia.** Un archivo copiable funciona a
   precio bajo y volumen, o como extra de un servicio. Caro y suelto, acaba
   circulando.
2. **Si va a circular, que circule a tu favor.** Cada copia filtrada acaba en el
   ordenador de alguien que compra marketing. Por eso el archivo lleva portada
   con marca, colofón con contacto y la ficha del autor: la fuga deja de ser una
   pérdida y pasa a ser distribución. Rellena `autor.web` y `autor.email` en
   `config.js` antes de emitir la primera copia, o estarás regalando el curso
   sin la parte que te devuelve algo.

`emitidas/` está fuera de git: lleva nombres y correos de clientes.

## El taller: cómo corrige

El taller monta el prompt por piezas y lo va corrigiendo mientras escribes. Las
reglas corren **en el navegador**: funcionan sin conexión y sin servidor, que es
lo que necesita un archivo que se vende y se abre dentro de dos años.

Comprueba, entre otras cosas:

- Piezas que faltan, con su peso: el contexto pesa 42 de 100 y la tarea 18.
- **Adjetivos usados como instrucción** ("creativo", "profesional", "impactante")
  solo dentro de la tarea y el formato, que es donde son una orden. En el
  contexto son una descripción legítima y no se penalizan.
- El anti-patrón de "hazlo mejor": subir el tono en vez de subir la información.
- El rol inflado tipo "el mejor copywriter del mundo".
- Tarea sin verbo, sin cantidad, o con dos entregables metidos en una.
- Un objetivo sin número, un perfil de cliente sin fuentes de datos, un contexto
  más corto que la tarea.
- **Datos personales a punto de pegarse**: correos, identificadores largos,
  menciones a DNI o IBAN.

Cada aviso lleva a la lección que lo explica, así que la corrección es el propio
curso hablando.

### El límite, dicho dentro de la herramienta

Un motor de reglas comprueba **qué falta** y **errores conocidos**. No puede
juzgar si tu contexto es bueno: un prompt con todo en verde y un contexto flojo
da un resultado flojo. El taller lo dice en su propio panel, para que nadie
confunda el aprobado con una garantía.

## Sesión y acceso

Hay dos modos, y los decide `config.js`:

- **Vacío = modo local.** El curso se lee entero sin identificarse. La sesión es
  opcional y sirve para separar a varias personas en el mismo equipo. El avance
  y las notas viven en ese navegador. **No protege el contenido**, y la propia
  web lo dice.
- **Relleno = modo nube.** Registro e inicio de sesión reales contra Supabase,
  avance sincronizado entre dispositivos, y contenido cerrado a quien no tenga
  cuenta. Ver `DESPLIEGUE.md`.

El mismo `index.html` sirve para los dos. Si la nube falla, cae a local sin
romperse.

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

**16 lecciones, 192 minutos, todas escritas.** 163 bloques y 19 prompts o
archivos con botón de copiar.

Una lección nueva nace con `estado: "pendiente"` y `bloques: []`: sale marcada
en el índice con el punto en ámbar y muestra un hueco en vez de fingir que
tiene contenido. Ahora mismo no hay ninguna en ese estado.

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
- **"Recaudación de fondos" (5.3) es de ONG**, no de agencia. Está escrita para
  que se pueda saltar sin romper el hilo, y la propia lección lo dice en su
  primer párrafo.

## Los hilos que atraviesan el curso

No son 16 lecciones sueltas. Tres cosas se van encadenando, y si se edita una
lección conviene no romperlas:

- **La skill de marca (1.4) es la herramienta del curso.** 3.1 termina
  mandándote a construirla, 3.2 la usa para producir, 3.3 la usa como criterio
  de auditoría, 4.2 la aplica al despiece y 5.2 sugiere convertir el informe en
  otra skill.
- **El material del módulo 2 alimenta al 3.** Los perfiles de 2.1 son la
  entrada del sistema verbal de 3.1; el brief de 2.3 es la entrada de 3.2.
- **El patrón de dos fases** (analizar y parar, luego producir) aparece en 1.2 y
  se reutiliza en 2.1, 2.3 y 4.2. Está enseñado una vez y referenciado después.
