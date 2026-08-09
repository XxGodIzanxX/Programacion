# Estudio de contenido

Organizador de ideas de contenido: banco de ideas, calendario de publicación
y tablero de producción, en un único archivo HTML.

## Cómo usarlo

Abre `index.html` con doble clic en cualquier navegador. No necesita servidor,
instalación ni conexión a internet.

## Las tres marcas

Cada idea pertenece a una marca, y ese es el color de la franja izquierda de la
tarjeta, para poder ver de un vistazo cómo se reparte el mes:

- **Ryu Ads** (rojo) — captación B2B sobre las 7 líneas de servicio de la agencia.
- **FileForge** (azul) — la herramienta de comprimir y convertir archivos: SEO,
  demostraciones de producto y el argumento de privacidad.
- **Marca personal** (violeta) — la persona que está detrás de las otras dos.

La primera métrica muestra el reparto del mes entre las tres.

## El ritmo semanal

El calendario nace con **una idea por cada día del mes**, siguiendo un reparto
fijo por día de la semana para que la cadencia no se improvise:

| Día | Marca | Tipo de pieza |
|---|---|---|
| Lunes | Ryu Ads | Autoridad y casos (LinkedIn, blog) |
| Martes | FileForge | SEO y producto |
| Miércoles | Ryu Ads | Píldora corta (TikTok, Reels) |
| Jueves | Marca personal | Vídeo o post de fondo |
| Viernes | Ryu Ads | Formato largo, carrusel o directo |
| Sábado | FileForge | Contenido ligero y compartible |
| Domingo | Marca personal | Reflexión |

Salen unas 13 piezas al mes de Ryu Ads y 9 de cada una de las otras dos.

El botón **Rellenar mes** completa los días libres del mes que estés viendo con
ese mismo ritmo. Respeta lo que ya tengas puesto: nunca pisa un día ocupado, y
si el mes está completo te lo dice en vez de duplicar nada. Las ideas rotan
según la semana, así que cinco lunes seguidos no repiten pieza.

Los estados se asignan solos según la fecha: lo pasado nace como publicado, lo
inmediato como grabado o editado, y lo lejano como idea.

**Un aviso:** publicar a diario en tres marcas es un ritmo exigente y lo normal
es que la calidad caiga antes de fin de mes. Si ves que no llegas, borra los
sábados y domingos primero: son los días de menor retorno.

## Qué hace

- **Calendario** mensual: arrastra ideas del banco lateral a un día para programarlas.
- **Tablero**: columnas por estado (Idea → Guion → Grabado → Editado → Publicado);
  arrastra una tarjeta de columna a columna para cambiar su estado.
- **Lista**: todas las ideas ordenadas por fecha.
- **Filtros** por marca, plataforma, estado y texto libre. Si creas una idea con
  un filtro de marca activo, la nueva idea nace ya con esa marca.
- **Métricas** del mes: programado, publicado, en producción y en el banco.

Cada idea guarda título, marca, plataforma, formato, estado, fecha, gancho y notas.

## Dónde se guardan los datos

En el `localStorage` del navegador, bajo la clave `estudio-contenido.v3`.
Eso significa que los datos viven en ese navegador y ese equipo: si borras los
datos de navegación o cambias de dispositivo, no viajan contigo.

Usa **Exportar** para descargar un `.json` con todas tus ideas e **Importar**
para restaurarlo en otro equipo. Importar reemplaza el contenido actual y pide
confirmación antes de hacerlo.

La primera vez que lo abres se llena el mes completo, más tres ideas de reserva
en el banco. Todas llevan gancho y notas de producción: son puntos de partida
reales, no relleno. Cámbialas o bórralas a tu gusto.

Si ya usabas una versión anterior (`estudio-contenido.v1` o `.v2`), al abrirlo se
migran tus datos automáticamente. Las ideas que hubieras escrito tú se conservan;
si nunca tocaste los ejemplos, se sustituyen por los nuevos.
