/* ---------------------------------------------------------------------------
 * Reglas del CRM de Ryu Ads, sin interfaz y sin almacenamiento.
 *
 * Todo lo que hay aquí son funciones puras: entran datos, salen datos. Ni
 * tocan el DOM ni saben si detrás hay localStorage, Postgres o una API. Eso
 * permite usar el mismo fichero en el navegador y en el backend (Node) sin
 * reimplementar la lógica dos veces y sin que las cifras se contradigan.
 *
 * Las fechas son cadenas ISO "YYYY-MM-DD". Se comparan como texto a propósito:
 * en ese formato el orden alfabético coincide con el cronológico, y así se
 * evitan los problemas de zona horaria de Date.
 * ------------------------------------------------------------------------ */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.CrmCore = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* Duración de contrato asumida para la previsión. Si tus igualas duran menos
     de un año, baja este número o la previsión te mentirá hacia arriba. */
  var MESES_CONTRATO = 12;

  var ETAPAS = [
    { id: "nuevo",       nombre: "Nuevo",       probabilidad: 0.10, abierta: true },
    { id: "contactado",  nombre: "Contactado",  probabilidad: 0.20, abierta: true },
    { id: "reunion",     nombre: "Reunión",     probabilidad: 0.40, abierta: true },
    { id: "propuesta",   nombre: "Propuesta",   probabilidad: 0.60, abierta: true },
    { id: "negociacion", nombre: "Negociación", probabilidad: 0.80, abierta: true },
    { id: "ganado",      nombre: "Ganado",      probabilidad: 1.00, abierta: false },
    { id: "perdido",     nombre: "Perdido",     probabilidad: 0.00, abierta: false }
  ];

  function etapa(id) {
    for (var i = 0; i < ETAPAS.length; i++) if (ETAPAS[i].id === id) return ETAPAS[i];
    return ETAPAS[0];
  }
  function abierta(op) { return etapa(op.etapa).abierta; }

  function importe(v) {
    var n = parseFloat(v);
    return isFinite(n) && n > 0 ? n : 0;
  }
  function valorAnual(op) {
    return importe(op.cuota_mensual) * MESES_CONTRATO + importe(op.pago_unico);
  }

  function sumarDias(isoStr, n) {
    var d = new Date(isoStr + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  }
  function diasEntre(desdeIso, hastaIso) {
    return Math.round(
      (new Date(hastaIso + "T00:00:00Z") - new Date(desdeIso + "T00:00:00Z")) / 86400000
    );
  }

  /* Urgencia de una oportunidad abierta. Las cerradas no tienen seguimiento
     pendiente, así que devuelven null en vez de una categoría falsa. */
  function urgencia(op, hoy) {
    if (!abierta(op)) return null;
    if (!op.proxima_fecha) return "sin_seguimiento";
    var d = diasEntre(hoy, op.proxima_fecha);
    if (d < 0) return "vencida";
    if (d === 0) return "hoy";
    if (d <= 7) return "semana";
    return "despues";
  }

  var ORDEN_URGENCIA = ["vencida", "hoy", "semana", "despues", "sin_seguimiento"];

  /* Agenda de trabajo: lo pendiente agrupado por urgencia y ordenado por fecha
     dentro de cada grupo. Las que no tienen fecha van al final, no al principio. */
  function agruparSeguimiento(lista, hoy) {
    var grupos = {};
    ORDEN_URGENCIA.forEach(function (k) { grupos[k] = []; });
    lista.forEach(function (op) {
      var u = urgencia(op, hoy);
      if (u) grupos[u].push(op);
    });
    ORDEN_URGENCIA.forEach(function (k) {
      grupos[k].sort(function (a, b) {
        return (a.proxima_fecha || "9999-12-31") < (b.proxima_fecha || "9999-12-31") ? -1 : 1;
      });
    });
    return grupos;
  }

  /* Las mismas cifras que calcula la vista crm_metricas del esquema SQL. Si
     tocas una, toca la otra: que el panel y la base de datos digan cosas
     distintas es peor que no tener panel. */
  function metricas(lista, hoy) {
    var mes = hoy.slice(0, 7);
    var m = {
      pipeline_mensual: 0,
      oportunidades_abiertas: 0,
      prevision_ponderada: 0,
      seguimiento_vencido: 0,
      sin_seguimiento: 0,
      ganado_mes_mensual: 0,
      ganado_mes_unico: 0,
      ganadas_mes: 0
    };
    lista.forEach(function (op) {
      if (abierta(op)) {
        m.oportunidades_abiertas++;
        m.pipeline_mensual += importe(op.cuota_mensual);
        m.prevision_ponderada += valorAnual(op) * etapa(op.etapa).probabilidad;
        var u = urgencia(op, hoy);
        if (u === "vencida") m.seguimiento_vencido++;
        if (u === "sin_seguimiento") m.sin_seguimiento++;
      } else if (op.etapa === "ganado" && (op.cerrada_en || "").slice(0, 7) === mes) {
        m.ganadas_mes++;
        m.ganado_mes_mensual += importe(op.cuota_mensual);
        m.ganado_mes_unico += importe(op.pago_unico);
      }
    });
    return m;
  }

  /* Efectos de mover una oportunidad de etapa. Devuelve los campos a guardar y
     la actividad a registrar, sin escribir nada: decide quien llame.
     Cerrar limpia el seguimiento (ya no hay siguiente paso) y sella la fecha
     de cierre; reabrir la borra, o el "ganado este mes" contaría cierres que
     ya no existen. */
  function cambiarEtapa(op, nuevaEtapa, hoy) {
    var antes = etapa(op.etapa), ahora = etapa(nuevaEtapa);
    if (antes.id === ahora.id) return null;
    var cambios = { etapa: ahora.id };
    if (!ahora.abierta) {
      cambios.cerrada_en = hoy;
      cambios.proxima_accion = "";
      cambios.proxima_fecha = null;
    } else {
      cambios.cerrada_en = null;
    }
    return {
      cambios: cambios,
      actividad: { fecha: hoy, tipo: "etapa", texto: "Etapa: " + antes.nombre + " → " + ahora.nombre },
      pedir_motivo: ahora.id === "perdido",
      crear_cliente: ahora.id === "ganado"
    };
  }

  /* Filtro del listado. Busca sobre los campos de texto, no sobre los importes:
     nadie busca "600" esperando encontrar una iguala. */
  function filtrar(lista, f) {
    f = f || {};
    var q = (f.q || "").trim().toLowerCase();
    return lista.filter(function (op) {
      if (f.servicio && op.servicio !== f.servicio) return false;
      if (f.origen && op.origen !== f.origen) return false;
      if (f.etapa && op.etapa !== f.etapa) return false;
      if (f.solo_abiertas && !abierta(op)) return false;
      if (!q) return true;
      return [op.empresa, op.contacto, op.email, op.telefono, op.notas,
              op.proxima_accion, op.motivo_perdida, op.servicio]
        .join(" ").toLowerCase().indexOf(q) !== -1;
    });
  }

  return {
    MESES_CONTRATO: MESES_CONTRATO,
    ETAPAS: ETAPAS,
    ORDEN_URGENCIA: ORDEN_URGENCIA,
    etapa: etapa,
    abierta: abierta,
    importe: importe,
    valorAnual: valorAnual,
    sumarDias: sumarDias,
    diasEntre: diasEntre,
    urgencia: urgencia,
    agruparSeguimiento: agruparSeguimiento,
    metricas: metricas,
    cambiarEtapa: cambiarEtapa,
    filtrar: filtrar
  };
});
