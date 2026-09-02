# CRM · Ryu Ads

Pipeline comercial de la agencia en un único archivo HTML: oportunidades,
seguimiento y previsión de facturación.

## Cómo usarlo

Abre `index.html` con doble clic en cualquier navegador. No necesita servidor,
instalación ni conexión a internet.

Arranca vacío a propósito: aquí van clientes reales y los datos de ejemplo
estorban. El botón **Ver un ejemplo** carga cinco oportunidades ficticias para
que veas cómo se comporta; bórralas cuando hayas entendido el formato.

## La idea

Un CRM no es una lista de contactos. Lo que lo convierte en una herramienta de
venta son dos campos: **próxima acción** y **cuándo**. Una oportunidad abierta
sin próxima acción es una oportunidad que vas a olvidar, y por eso la app te la
marca en rojo en las métricas y en la vista de Seguimiento.

## Las tres vistas

- **Pipeline** — tablero por etapas. Arrastra una tarjeta de columna a columna
  para moverla; el cambio queda anotado en el historial de la ficha. Cada
  columna suma la cuota mensual y los pagos únicos que tiene dentro.
- **Seguimiento** — lo que te toca hacer, agrupado en *Vencidas*, *Hoy*,
  *Próximos 7 días*, *Más adelante* y *Sin próxima acción*. Es la vista con la
  que se trabaja a diario; el pipeline es para mirar el mes.
- **Lista** — todo junto, abiertas primero y ordenadas por fecha de seguimiento.

## Etapas y probabilidad

| Etapa | Probabilidad de cierre |
|---|---|
| Nuevo | 10 % |
| Contactado | 20 % |
| Reunión | 40 % |
| Propuesta | 60 % |
| Negociación | 80 % |
| Ganado | 100 % |
| Perdido | 0 % |

Esos porcentajes son el estándar del sector, **no tus datos**. En cuanto cierres
veinte o treinta operaciones, calcula los tuyos (cuántas de las que llegaron a
propuesta acabaron firmando) y cámbialos en la constante `STAGES` de
`index.html`. Hasta entonces, la previsión es una estimación prestada.

## Los números

Cada oportunidad tiene dos importes: **cuota mensual** (la iguala de la agencia)
y **pago único** (setup, una web, una auditoría). Se guardan separados porque no
valen lo mismo: 500 €/mes recurrentes valen mucho más que 500 € una vez.

- **Pipeline abierto** — suma de cuotas mensuales de todo lo que sigue vivo.
- **Previsión ponderada** — `(cuota × 12 + pago único) × probabilidad de etapa`,
  sumado. Asume contratos de doce meses; si los tuyos duran menos, cambia
  `MESES_CONTRATO` en el archivo o el número te mentirá hacia arriba.
- **Seguimiento vencido** — oportunidades abiertas cuya fecha ya pasó, más las
  que ni siquiera tienen fecha.
- **Ganado este mes** — se cuenta por la fecha en la que se movió la etapa a
  Ganado, no por la última nota que escribiste.

## Cuando pierdes una

Al arrastrar una tarjeta a *Perdido* se abre la ficha pidiendo el motivo.
Rellénalo siempre: al cabo de treinta operaciones, ese campo te dice si pierdes
por precio, por timing o por cómo presentas la propuesta. Es el dato más
rentable del CRM y el que todo el mundo se salta.

Marcar como perdida es mejor que eliminar: conservas el motivo y el historial.

## Dónde se guardan los datos

En el `localStorage` del navegador, bajo la clave `crm-ryuads.v1`.

**Esto es una limitación seria y conviene tenerla presente.** Los datos viven en
ese navegador y en ese equipo. Si borras los datos de navegación, usas el modo
privado o cambias de ordenador, no viajan contigo, y aquí lo que se pierde no
son ideas de contenido: es tu pipeline.

Por eso la app avisa con una banda naranja cuando han pasado más de siete días
desde la última copia. **Exportar** descarga un `.json` con todo; guárdalo fuera
de este equipo (Drive, disco externo, donde sea). **Importar** lo restaura y
guarda antes una copia interna de lo que había, por si te equivocas de archivo.

El día que esto se te quede corto —dos personas usándolo, o el móvil— la
migración natural es Supabase: el modelo de datos ya es el de una tabla.

## Datos personales

Aquí dentro hay nombres, emails y teléfonos de personas reales. Aunque no salgan
de tu navegador, el RGPD aplica igual: guarda solo lo que necesitas para la
gestión comercial, no lo compartas y borra las fichas cuando dejen de tener
sentido. Si exportas el `.json`, ese archivo también son datos personales:
no lo dejes en una carpeta compartida.
