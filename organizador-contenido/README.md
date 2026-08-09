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

En el `localStorage` del navegador, bajo la clave `estudio-contenido.v2`.
Eso significa que los datos viven en ese navegador y ese equipo: si borras los
datos de navegación o cambias de dispositivo, no viajan contigo.

Usa **Exportar** para descargar un `.json` con todas tus ideas e **Importar**
para restaurarlo en otro equipo. Importar reemplaza el contenido actual y pide
confirmación antes de hacerlo.

La primera vez que lo abres se cargan 18 ideas de ejemplo repartidas entre las
tres marcas, con sus ganchos y notas, para que el calendario no aparezca vacío.
Son puntos de partida reales, no relleno: cámbialas o bórralas a tu gusto.

Si ya usabas la versión anterior (clave `estudio-contenido.v1`), al abrirlo se
migran tus datos automáticamente. Las ideas que hubieras escrito tú se conservan
y reciben la marca «Marca personal»; si nunca tocaste los ejemplos originales, se
sustituyen por los nuevos.
