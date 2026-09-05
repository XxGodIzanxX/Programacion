# Contrato de la API del CRM

Endpoints mínimos para mover el CRM a `ryuads.com/app`. Independiente del
lenguaje del backend: lo que importa es la forma de los datos y quién decide
qué.

Todo bajo `/api/crm`. **Todos los endpoints exigen sesión iniciada**: aquí
dentro hay nombres, emails y teléfonos de personas reales, y la app está en
internet abierta. Si `/app` no tiene autenticación de servidor —no basta con
esconder el enlace— eso es lo primero que hay que arreglar, antes que ninguna
funcionalidad de esta lista.

## Recursos

### `GET /api/crm/oportunidades`

Parámetros opcionales: `q`, `servicio`, `origen`, `etapa`, `solo_abiertas=1`.

```json
[
  {
    "id": 12,
    "cliente_id": null,
    "empresa": "Clínica Dental Aurora",
    "contacto": "María Salas, gerente",
    "email": "maria@dentalaurora.es",
    "telefono": "",
    "servicio": "Google Ads",
    "origen": "Referido",
    "etapa": "propuesta",
    "cuota_mensual": 600.00,
    "pago_unico": 450.00,
    "fecha_alta": "2026-08-15",
    "proxima_accion": "Llamar para revisar la propuesta",
    "proxima_fecha": "2026-08-31",
    "motivo_perdida": "",
    "notas": "Decide ella, pero el socio firma.",
    "cerrada_en": null
  }
]
```

### `POST /api/crm/oportunidades`

Mismo objeto sin `id` ni `cerrada_en`. Obligatorio: `empresa`, `servicio`,
`origen`. Por defecto `etapa: "nuevo"` y `fecha_alta: hoy`. El backend crea
además la actividad `"Oportunidad creada"`.

### `PATCH /api/crm/oportunidades/{id}`

Actualización parcial. **`etapa` no se toca por aquí**: tiene su propio
endpoint porque cambiarla dispara efectos.

### `POST /api/crm/oportunidades/{id}/etapa`

```json
{ "etapa": "ganado" }
```

El backend, no el navegador, aplica los efectos (`CrmCore.cambiarEtapa` los
calcula si el backend es Node):

- registra la actividad `"Etapa: Propuesta → Ganado"`;
- si la nueva etapa es cerrada: sella `cerrada_en` y vacía `proxima_accion`
  y `proxima_fecha`;
- si se reabre: pone `cerrada_en` a `null`;
- responde con `pedir_motivo: true` al pasar a `perdido`, para que la interfaz
  abra la ficha en el campo de motivo;
- responde con `crear_cliente: true` al pasar a `ganado`.

Que esto viva en el servidor y no en el front no es ceremonia: es lo que evita
que dos pestañas abiertas dejen la base de datos con estados imposibles.

### `POST /api/crm/oportunidades/{id}/actividades`

```json
{ "texto": "Llamada: pide bajar a 500 €", "tipo": "llamada", "fecha": "2026-09-02" }
```

`tipo` por defecto `"nota"`. `fecha` por defecto hoy. Las actividades **no se
editan ni se borran**: son el registro de lo que pasó.

### `GET /api/crm/seguimiento`

Devuelve la vista `crm_seguimiento` agrupada por urgencia
(`vencida`, `hoy`, `semana`, `despues`, `sin_seguimiento`). Es la pantalla de
trabajo diario; que la agrupación la haga el servidor evita que el front y el
SQL discrepen sobre qué es "vencida".

### `GET /api/crm/metricas`

Un `SELECT * FROM crm_metricas`. No lo calcules en el navegador.

## El punto donde el CRM se enchufa al ERP

Al pasar una oportunidad a `ganado`:

1. Se crea el cliente en la tabla de clientes del ERP (o se enlaza uno
   existente) y se guarda su id en `crm_oportunidades.cliente_id`.
2. La `cuota_mensual` pasa a ser la iguala del cliente, con su fecha de
   arranque. De ahí sale el aviso mensual de qué toca facturar.
3. La factura **no** la emite tu app: la emite el programa certificado. Tu
   sistema solo dice qué hay que facturar y a quién.

Es el único punto de contacto entre los dos mundos. Manténlo así de estrecho:
el día que cambies de programa de facturación, solo se toca este paso.

## Reutilizar la lógica

`crm-core.js` contiene las reglas (urgencia, métricas, efectos del cambio de
etapa) como funciones puras, sin DOM ni almacenamiento. Sirve en el navegador
y en Node, y `crm-core.test.js` las cubre. Si tu backend no es JavaScript,
tradúcelo, pero deja las cifras en un solo sitio: el `crm_metricas` de SQL y
el `metricas()` de JS ya están escritos para dar exactamente el mismo número.
