/* Pruebas del núcleo. Sin dependencias: `node crm-core.test.js`. */
var assert = require("assert");
var C = require("./crm-core.js");

var HOY = "2026-09-02";
var d = function (n) { return C.sumarDias(HOY, n); };

var datos = [
  { empresa:"Aurora",   etapa:"propuesta",   cuota_mensual:600, pago_unico:450, proxima_fecha:d(-2) },
  { empresa:"Nervión",  etapa:"reunion",     cuota_mensual:0,   pago_unico:2800, proxima_fecha:d(1) },
  { empresa:"Valdelmo", etapa:"contactado",  cuota_mensual:450, pago_unico:0,   proxima_fecha:null },
  { empresa:"Kaizen",   etapa:"ganado",      cuota_mensual:390, pago_unico:900, cerrada_en:d(-1) },
  { empresa:"Costa",    etapa:"perdido",     cuota_mensual:800, pago_unico:0,   cerrada_en:d(-40) },
  { empresa:"Antigua",  etapa:"ganado",      cuota_mensual:200, pago_unico:0,   cerrada_en:"2026-05-10" }
];

/* urgencia */
assert.strictEqual(C.urgencia(datos[0], HOY), "vencida");
assert.strictEqual(C.urgencia(datos[1], HOY), "semana", "mañana entra en los próximos 7 días");
assert.strictEqual(C.urgencia(datos[2], HOY), "sin_seguimiento");
assert.strictEqual(C.urgencia(datos[3], HOY), null, "una cerrada no tiene urgencia");
assert.strictEqual(C.urgencia({ etapa:"nuevo", proxima_fecha: HOY }, HOY), "hoy");
assert.strictEqual(C.urgencia({ etapa:"nuevo", proxima_fecha: d(30) }, HOY), "despues");

/* métricas */
var m = C.metricas(datos, HOY);
assert.strictEqual(m.oportunidades_abiertas, 3);
assert.strictEqual(m.pipeline_mensual, 1050);
assert.strictEqual(m.seguimiento_vencido, 1);
assert.strictEqual(m.sin_seguimiento, 1);
assert.strictEqual(m.ganadas_mes, 1, "la ganada en mayo no cuenta en septiembre");
assert.strictEqual(m.ganado_mes_mensual, 390);
assert.strictEqual(m.ganado_mes_unico, 900);
// 600*12+450 = 7650 * .60 = 4590 | 2800 * .40 = 1120 | 450*12 = 5400 * .20 = 1080
assert.strictEqual(Math.round(m.prevision_ponderada), 6790);

/* la previsión no cuenta lo ya cerrado */
assert.strictEqual(C.metricas([datos[3], datos[4]], HOY).prevision_ponderada, 0);

/* agenda */
var g = C.agruparSeguimiento(datos, HOY);
assert.deepStrictEqual(g.vencida.map(function (o) { return o.empresa; }), ["Aurora"]);
assert.deepStrictEqual(g.semana.map(function (o) { return o.empresa; }), ["Nervión"]);
assert.deepStrictEqual(g.sin_seguimiento.map(function (o) { return o.empresa; }), ["Valdelmo"]);
assert.strictEqual(g.hoy.length, 0);

/* orden dentro del grupo: lo más antiguo primero */
var venc = C.agruparSeguimiento([
  { empresa:"B", etapa:"nuevo", proxima_fecha:d(-1) },
  { empresa:"A", etapa:"nuevo", proxima_fecha:d(-9) }
], HOY).vencida;
assert.deepStrictEqual(venc.map(function (o) { return o.empresa; }), ["A", "B"]);

/* cambio de etapa */
var cierre = C.cambiarEtapa({ etapa:"propuesta", proxima_accion:"Llamar", proxima_fecha:d(3) }, "ganado", HOY);
assert.strictEqual(cierre.cambios.cerrada_en, HOY);
assert.strictEqual(cierre.cambios.proxima_accion, "");
assert.strictEqual(cierre.cambios.proxima_fecha, null);
assert.strictEqual(cierre.crear_cliente, true);
assert.strictEqual(cierre.actividad.texto, "Etapa: Propuesta → Ganado");

var perdida = C.cambiarEtapa({ etapa:"negociacion" }, "perdido", HOY);
assert.strictEqual(perdida.pedir_motivo, true);
assert.strictEqual(perdida.crear_cliente, false);

var reabrir = C.cambiarEtapa({ etapa:"perdido", cerrada_en: d(-5) }, "reunion", HOY);
assert.strictEqual(reabrir.cambios.cerrada_en, null, "reabrir borra la fecha de cierre");

assert.strictEqual(C.cambiarEtapa({ etapa:"nuevo" }, "nuevo", HOY), null, "sin cambio, sin efectos");

/* filtro */
assert.strictEqual(C.filtrar(datos, { solo_abiertas: true }).length, 3);
assert.strictEqual(C.filtrar(datos, { q: "aurora" }).length, 1);
assert.strictEqual(C.filtrar(datos, { q: "AURORA" }).length, 1, "la búsqueda ignora mayúsculas");
assert.strictEqual(C.filtrar(datos, { etapa: "ganado" }).length, 2);

/* importes basura no rompen las sumas */
assert.strictEqual(C.importe("abc"), 0);
assert.strictEqual(C.importe(-50), 0);
assert.strictEqual(C.importe(undefined), 0);
assert.strictEqual(C.metricas([{ etapa:"nuevo", cuota_mensual:"x" }], HOY).pipeline_mensual, 0);

/* fechas: el cambio de mes no se descuadra */
assert.strictEqual(C.sumarDias("2026-08-31", 1), "2026-09-01");
assert.strictEqual(C.sumarDias("2027-01-01", -1), "2026-12-31");
assert.strictEqual(C.diasEntre("2026-02-28", "2026-03-01"), 1, "2026 no es bisiesto");

console.log("crm-core: todo correcto");
