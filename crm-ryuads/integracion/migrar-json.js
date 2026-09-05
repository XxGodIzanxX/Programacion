#!/usr/bin/env node
/* ---------------------------------------------------------------------------
 * Convierte el JSON que exporta crm-ryuads/index.html en INSERTs para el
 * esquema de esquema.sql, para no perder lo que ya tengas metido al pasar
 * el CRM a la base de datos del ERP.
 *
 *   node migrar-json.js crm-ryuads-2026-09-02.json > carga.sql
 *
 * Revisa el .sql antes de ejecutarlo. Es una migración de una sola vez: si la
 * lanzas dos veces, duplicas las oportunidades.
 * ------------------------------------------------------------------------ */
"use strict";

var fs = require("fs");
var ruta = process.argv[2];

if (!ruta) {
  console.error("Uso: node migrar-json.js <fichero-exportado.json> > carga.sql");
  process.exit(1);
}

var datos;
try {
  datos = JSON.parse(fs.readFileSync(ruta, "utf8"));
} catch (e) {
  console.error("No se ha podido leer el JSON: " + e.message);
  process.exit(1);
}
if (!Array.isArray(datos.deals)) {
  console.error("Ese archivo no es una exportación del CRM: falta la lista 'deals'.");
  process.exit(1);
}

/* Literal de texto para SQL. Duplicar la comilla simple es el escapado del
   estándar y lo entienden tanto PostgreSQL como MySQL. */
function txt(v) {
  if (v === null || v === undefined || v === "") return "''";
  return "'" + String(v).replace(/'/g, "''") + "'";
}
function fecha(v) {
  return /^\d{4}-\d{2}-\d{2}$/.test(v || "") ? "'" + v + "'" : "NULL";
}
function numero(v) {
  var n = parseFloat(v);
  return isFinite(n) && n > 0 ? String(n) : "0";
}

var ABIERTAS = { nuevo:1, contactado:1, reunion:1, propuesta:1, negociacion:1 };
var salida = [];

salida.push("-- Carga generada desde " + ruta + " el " + new Date().toISOString().slice(0, 10));
salida.push("-- " + datos.deals.length + " oportunidades. Ejecútalo una sola vez.");
salida.push("BEGIN;");
salida.push("");

datos.deals.forEach(function (d, i) {
  var ref = "op_" + (i + 1);
  var cerrada = ABIERTAS[d.stage] ? "NULL" : fecha(d.closedAt || d.created);

  /* Una CTE por oportunidad: inserta y usa el id devuelto para su historial,
     sin depender de currval ni de que los ids vengan correlativos. */
  salida.push("WITH " + ref + " AS (");
  salida.push("  INSERT INTO crm_oportunidades (");
  salida.push("    empresa, contacto, email, telefono, servicio, origen, etapa,");
  salida.push("    cuota_mensual, pago_unico, fecha_alta, proxima_accion, proxima_fecha,");
  salida.push("    motivo_perdida, notas, cerrada_en");
  salida.push("  ) VALUES (");
  salida.push("    " + [
    txt(d.company), txt(d.contact), txt(d.email), txt(d.phone),
    txt(d.service), txt(d.source), txt(d.stage)
  ].join(", ") + ",");
  salida.push("    " + [
    numero(d.mrr), numero(d.setup), fecha(d.created) === "NULL" ? "CURRENT_DATE" : fecha(d.created),
    txt(d.nextAction), fecha(d.nextDate)
  ].join(", ") + ",");
  salida.push("    " + [txt(d.lostReason), txt(d.notes), cerrada].join(", "));
  salida.push("  ) RETURNING id");
  salida.push(")");

  var log = Array.isArray(d.log) ? d.log : [];
  if (log.length) {
    salida.push("INSERT INTO crm_actividades (oportunidad_id, fecha, tipo, texto)");
    salida.push("SELECT " + ref + ".id, v.fecha::date, v.tipo, v.texto FROM " + ref + ", (VALUES");
    salida.push(log.map(function (l) {
      var tipo = /^Etapa: /.test(l.text || "") ? "etapa" : "nota";
      return "  (" + [fecha(l.date) === "NULL" ? "CURRENT_DATE" : fecha(l.date), txt(tipo), txt(l.text)].join(", ") + ")";
    }).join(",\n"));
    salida.push(") AS v(fecha, tipo, texto);");
  } else {
    /* Sin historial la CTE se quedaría sin consumir, y Postgres no ejecuta una
       CTE que nadie lee. */
    salida.push("SELECT id FROM " + ref + ";");
  }
  salida.push("");
});

salida.push("COMMIT;");
process.stdout.write(salida.join("\n") + "\n");
