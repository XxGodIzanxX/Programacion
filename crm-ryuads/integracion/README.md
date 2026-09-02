# Integrar el CRM en el ERP de ryuads.com/app

El CRM de `../index.html` guarda en `localStorage`, que vale para empezar y no
vale para un pipeline del que dependen tus ingresos. Esta carpeta es lo que
hace falta para llevarlo a una base de datos de verdad, sea cual sea el stack.

| Archivo | Qué es |
|---|---|
| `esquema.sql` | Tablas, índices y vistas para PostgreSQL. Probado contra Postgres 16. |
| `crm-core.js` | Las reglas del CRM como funciones puras, sin interfaz ni almacenamiento. Vale en navegador y en Node. |
| `crm-core.test.js` | Pruebas del núcleo. `node crm-core.test.js`, sin dependencias. |
| `api.md` | Contrato de los endpoints y el punto exacto donde el CRM engancha con el ERP. |
| `migrar-json.js` | Convierte el `.json` que exporta el CRM actual en INSERTs, para no perder lo ya metido. |

## Orden de trabajo

1. `esquema.sql` sobre tu base de datos. Ajusta la referencia a `clientes(id)`
   al nombre real de tu tabla, o quítala si aún no existe.
2. Exporta el JSON desde el CRM actual y pásalo por `migrar-json.js`. Revisa el
   `.sql` antes de ejecutarlo; es una carga de una sola vez.
3. Endpoints según `api.md`, con la lógica de `crm-core.js` en el servidor.
4. La interfaz: el HTML actual sirve de referencia visual, pero el estado pasa
   a venir de la API.

## Dos cosas que no se negocian

**Autenticación de servidor en `/app`.** Hay datos personales de clientes ahí
dentro. Un enlace no publicado no es una medida de seguridad.

**Copias de la base de datos.** El motivo de mover esto fuera de `localStorage`
era dejar de depender de un navegador; si la base de datos no tiene copias
automáticas y restauradas alguna vez de verdad, has cambiado un punto único de
fallo por otro.
