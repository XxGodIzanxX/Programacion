# Estudio de contenido

Organizador de ideas de contenido: banco de ideas, calendario de publicación
y tablero de producción, en un único archivo HTML.

## Cómo usarlo

Abre `index.html` con doble clic en cualquier navegador. No necesita servidor,
instalación ni conexión a internet.

## Qué hace

- **Calendario** mensual: arrastra ideas del banco lateral a un día para programarlas.
- **Tablero**: columnas por estado (Idea → Guion → Grabado → Editado → Publicado);
  arrastra una tarjeta de columna a columna para cambiar su estado.
- **Lista**: todas las ideas ordenadas por fecha.
- **Filtros** por plataforma, estado y texto libre.
- **Métricas** del mes: programado, publicado, en producción y en el banco.

Cada idea guarda título, plataforma, formato, estado, fecha, gancho y notas.

## Dónde se guardan los datos

En el `localStorage` del navegador, bajo la clave `estudio-contenido.v1`.
Eso significa que los datos viven en ese navegador y ese equipo: si borras los
datos de navegación o cambias de dispositivo, no viajan contigo.

Usa **Exportar** para descargar un `.json` con todas tus ideas e **Importar**
para restaurarlo en otro equipo. Importar reemplaza el contenido actual y pide
confirmación antes de hacerlo.

La primera vez que lo abres se cargan siete ideas de ejemplo para que el
calendario no aparezca vacío. Bórralas cuando empieces con las tuyas.
