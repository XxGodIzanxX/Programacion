/* ============================================================================
   CONTENIDO DEL CURSO — este es el único archivo que hay que tocar para
   añadir o cambiar material. El index.html no se toca para meter contenido.

   El temario sigue los 12 casos de uso de marketing publicados por Anthropic,
   reordenados por ciclo de marketing (investigar -> marca -> producir -> medir)
   en vez de por orden alfabético, y precedidos de un módulo de fundamentos.

   Cada lección declara en qué producto se ejecuta:
     plataforma: "Claude.ai"  |  "Cowork"
   El índice permite filtrar por ese campo, para que quien no tenga Cowork vea
   solo lo que puede hacer hoy.

   Bloques disponibles dentro de `bloques: [...]`:

     { t:"texto",   md:"Párrafo. Admite **negrita**, *cursiva*, `código` y [enlace](url)." }
     { t:"lista",   items:["uno","dos"] }
     { t:"pasos",   items:["primero","segundo"] }          // lista numerada
     { t:"prompt",  titulo:"Para qué sirve", texto:"El prompt literal" }
     { t:"ejemplo", titulo:"Salida de Claude", texto:"Texto de ejemplo" }
     { t:"aviso",   texto:"Advertencia o error común." }
     { t:"clave",   texto:"La idea que hay que recordar de la lección." }
     { t:"tabla",   cabeceras:["A","B"], filas:[["1","2"],["3","4"]] }
     { t:"cita",    texto:"...", autor:"Quien lo dijo" }
     { t:"video",   url:"https://...", titulo:"Título del vídeo" }

   Una lección con `estado:"pendiente"` sale marcada en el índice y muestra
   un hueco en vez de fingir que tiene contenido.
   ========================================================================== */

const CURSO = {
  titulo: "Claude para Marketing",
  subtitulo: "Los 12 casos de uso, en orden de trabajo real",
  autor: "Izan Gutiérrez · Ryu Ads",
  version: "0.2",

  modulos: [

    /* ------------------------------------------------------------------ M1
       Prerrequisito. Sin esto, los 12 casos se ejecutan a ciegas.          */
    {
      id: "m1",
      titulo: "Antes de empezar",
      resumen: "Los fundamentos sin los que los 12 casos de uso salen mediocres, y la herramienta que usarás en todos los demás: tu marca empaquetada en una skill.",
      lecciones: [
        {
          id: "m1-l1",
          titulo: "Cómo piensa Claude",
          duracion: 9,
          plataforma: "Claude.ai",
          objetivo: "Entender que la salida es función del contexto que le das, no de lo listo que le pidas ser.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "Claude no busca información: la **genera**. Dado todo lo que tiene delante — tu mensaje, la conversación previa, los archivos que has subido — produce la continuación más plausible. No consulta una base de datos de verdades y te devuelve la fila correcta." },
            { t: "texto", md: "Esa diferencia parece filosófica y es puramente práctica. Explica por qué el mismo modelo te da una respuesta mediocre y una excelente con cinco minutos de diferencia: no cambió el modelo, cambió lo que tenía delante." },
            { t: "clave", texto: "La calidad de la salida es función de la calidad del contexto. Casi nunca del adjetivo que le pongas a la instrucción." },
            { t: "texto", md: "De ahí sale el error número uno del marketer que empieza: intentar arreglar un mal resultado subiendo el tono en vez de subiendo la información." },
            { t: "tabla",
              cabeceras: ["Lo que hace mucha gente", "Lo que cambia el resultado"],
              filas: [
                ["\"Hazlo mejor\"", "\"Este es el cliente, este es el producto, este es el ángulo que quiero\""],
                ["\"Sé más creativo\"", "Tres ejemplos de lo que sí te gusta"],
                ["\"Es un texto muy genérico\"", "\"Suena a agencia. Quiero que suene a alguien que ha hecho esto 40 veces\""],
                ["\"Eres un experto de clase mundial en...\"", "El brief real del cliente, pegado entero"]
              ]
            },
            { t: "texto", md: "La ventana de contexto es todo lo que Claude tiene delante en ese momento: tu mensaje, lo anterior de la conversación y los archivos adjuntos. Es amplia, pero no infinita, y todo lo que metes compite por atención. Pegar el informe de 80 páginas entero cuando lo relevante son 2 páginas no ayuda: diluye." },
            { t: "aviso", texto: "Una conversación muy larga y sucia degrada resultados. Si llevas 40 mensajes dando vueltas, abre una conversación nueva y pega solo las conclusiones. Empezar de cero es una técnica, no una rendición." },
            { t: "prompt",
              titulo: "Prueba la diferencia tú mismo",
              texto: "Escribe un anuncio para mi negocio."
            },
            { t: "texto", md: "Frente a esto:" },
            { t: "prompt",
              titulo: "Mismo objetivo, contexto real",
              texto: "Contexto:\nVendo instalación de placas solares a particulares en Valencia. Ticket medio 7.500€.\nEl cliente típico tiene 45-60 años y casa unifamiliar.\nSu motivación real no es la ecología: le ha subido la factura y está harto.\nLa objeción número uno que me sale en llamada es \"¿y si me mudo?\".\n\nTarea:\nEscribe 5 titulares para Meta Ads que ataquen directamente esa objeción,\nsin mencionar la palabra \"sostenible\" ni \"medio ambiente\".\n\nFormato:\nUn titular por línea, máximo 40 caracteres cada uno."
            },
            { t: "texto", md: "Es el mismo modelo. Lo único que ha cambiado es cuánto sabe sobre tu problema." }
          ],
          ejercicio: "Coge la última cosa que le pediste a una IA y que te decepcionó. Reescríbela añadiendo tres cosas: quién es el cliente, qué objeción real tiene, y qué formato exacto quieres de vuelta. Compara.",
          recursos: []
        },
        {
          id: "m1-l2",
          titulo: "El esqueleto de un prompt que funciona",
          duracion: 12,
          plataforma: "Claude.ai",
          objetivo: "Escribir cualquier petición sobre seis piezas fijas en vez de a ojo.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "Casi todo prompt bueno tiene las mismas seis piezas. No hace falta que estén siempre las seis, pero sí hace falta saber cuál te estás saltando y por qué." },
            { t: "tabla",
              cabeceras: ["Pieza", "Qué responde", "Cuándo se puede omitir"],
              filas: [
                ["Rol", "¿Desde qué experiencia escribe?", "Casi siempre. Es la pieza más sobrevalorada."],
                ["Contexto", "¿Qué negocio, qué cliente, qué objeción?", "Nunca. Es la que más pesa."],
                ["Tarea", "¿Qué tiene que producir, exactamente?", "Nunca."],
                ["Formato", "¿Cómo quieres recibirlo?", "Si te da igual la forma (raro)."],
                ["Restricciones", "¿Qué no puede hacer?", "Si no tienes prohibiciones claras."],
                ["Ejemplos", "¿A qué se tiene que parecer?", "Si no tienes ninguno todavía."]
              ]
            },
            { t: "texto", md: "El orden importa menos de lo que parece; lo que importa es que el **contexto vaya antes que la tarea**. Si primero lees la pregunta y luego los datos, procesas peor. A Claude le pasa lo mismo." },
            { t: "prompt",
              titulo: "Plantilla base — cópiala y rellena",
              texto: "CONTEXTO\nNegocio:\nProducto/servicio y precio:\nCliente ideal (edad, situación, qué le duele):\nObjeción principal que me encuentro:\nQué he probado ya y no funcionó:\n\nTAREA\n[Un verbo, un entregable, una cantidad. \"Escribe 5 asuntos de email\", no \"ayúdame con el email\".]\n\nFORMATO\n[Longitud, estructura, dónde se va a publicar.]\n\nRESTRICCIONES\n- No uses:\n- Evita el tono:\n- Tiene que caber en:\n\nEJEMPLOS DE LO QUE SÍ FUNCIONA\n[Pega 2-3 piezas tuyas o de la competencia que te gusten.]"
            },
            { t: "clave", texto: "Los ejemplos valen más que las instrucciones. Dos piezas reales que te gustan enseñan más que un párrafo describiendo el tono que quieres." },
            { t: "texto", md: "Por eso la sección de ejemplos es la que más rendimiento da y la que casi nadie rellena: cuesta buscar las referencias. Búscalas una vez y guárdalas; sirven para siempre." },
            { t: "aviso", texto: "El truco de \"actúa como el mejor copywriter del mundo\" está muy sobrevendido. Añade poco. Lo que sí funciona es un rol específico y verificable: \"escribes para una asesoría fiscal que factura a autónomos y no puede prometer resultados por normativa\"." },
            { t: "texto", md: "Última pieza, y es la que separa a quien usa la IA de quien la domina: **pedir el razonamiento antes que el resultado**. Si le pides directamente los 5 titulares, te da 5 titulares. Si le pides que primero liste los tres ángulos posibles, elija el más fuerte y explique por qué, y *después* escriba los titulares, los titulares son mejores y además puedes corregir el ángulo en vez de corregir 5 textos." },
            { t: "prompt",
              titulo: "Forzar el paso previo",
              texto: "Antes de escribir nada, hazlo en dos fases.\n\nFase 1: lista los 3 ángulos de venta posibles para este producto,\ncon una frase de por qué cada uno podría funcionar con este cliente.\nPara y espera mi respuesta.\n\nFase 2 (solo cuando yo elija ángulo): escribe las piezas."
            }
          ],
          ejercicio: "Coge tu campaña activa. Rellena la plantilla base entera, sin saltarte la sección de ejemplos. Guárdala: es tu primera plantilla reutilizable.",
          recursos: []
        },
        {
          id: "m1-l3",
          titulo: "Claude.ai, Proyectos, Skills y Cowork",
          duracion: 10,
          plataforma: "Claude.ai",
          objetivo: "Saber qué es cada superficie y cuál necesitas para cada lección del curso.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m1-l4",
          titulo: "Empaqueta tus guías de marca en una skill",
          duracion: 20,
          plataforma: "Claude.ai",
          objetivo: "Convertir el manual de marca en una herramienta que Claude aplica sola, en cualquier conversación, sin que nadie se la recuerde.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "Hasta aquí has aprendido a escribir un buen prompt. El problema del buen prompt es que hay que volver a escribirlo. Cada conversación nueva empieza en blanco: vuelves a pegar el tono de la marca, vuelves a explicar que no se dice \"solución integral\", vuelves a recordar que en email se cierra con teléfono y no con formulario." },
            { t: "texto", md: "Y como cuesta, un día no lo pegas. Ese día sale una pieza que no suena a la marca, y alguien la corrige a mano. Eso no es un problema de la IA: es un problema de que tu manual de marca vive en un PDF que nadie abre." },
            { t: "clave", texto: "Una skill es tu manual de marca convertido en instrucciones que Claude carga sola cuando toca. Deja de ser documentación y pasa a ser herramienta." },
            { t: "texto", md: "Técnicamente una skill es una carpeta con un archivo dentro: `SKILL.md`. Ese archivo tiene una cabecera con dos campos y, debajo, tus instrucciones en texto normal. Nada más. Si sabes escribir un documento de marca, ya sabes escribir una skill." },
            { t: "texto", md: "Antes de seguir, la confusión que hay que quitarse de encima, porque casi todo el mundo empieza usando la herramienta equivocada:" },
            { t: "tabla",
              cabeceras: ["", "Proyecto", "Skill"],
              filas: [
                ["Alcance", "Solo las conversaciones dentro de ese proyecto", "Cualquier conversación"],
                ["Cómo se activa", "Tú entras al proyecto", "Claude la detecta sola por su descripción"],
                ["Qué guarda", "Instrucciones y archivos de contexto", "Instrucciones, plantillas y scripts"],
                ["Se comparte", "Con quien tenga acceso al proyecto", "Como archivo, a cualquiera"],
                ["Para qué sirve", "**Un cliente concreto**", "**Un método que repites en muchos clientes**"]
              ]
            },
            { t: "texto", md: "Regla práctica: si la información es de un cliente, va en su Proyecto. Si es un criterio tuyo que aplicas siempre, va en una skill." },
            { t: "pasos", items: [
              "Reúne todo lo que ya está escrito sobre la marca: el manual, el brief inicial, los emails donde corregiste a alguien por el tono. Ese tercer montón suele ser el más valioso y el que nadie guarda.",
              "Sepáralo en tres: **quién es** la marca, **cómo suena**, y **qué no dice jamás**. Las prohibiciones son lo que más cambia el resultado y lo que menos gente escribe.",
              "Escribe el `SKILL.md` siguiendo la plantilla de abajo.",
              "Escribe la descripción como si fuera lo único que Claude va a leer. Porque durante el 99% del tiempo, lo es.",
              "Pruébala en dos conversaciones nuevas antes de dársela a nadie."
            ]},
            { t: "texto", md: "Esta es una skill de marca completa y real. Está escrita para un cliente inventado —una empresa de climatización— para que veas la forma, no el contenido. Cópiala y sustituye." },
            { t: "archivo",
              nombre: "SKILL.md",
              texto: "---\nname: marca-nordclima\ndescription: Aplica la identidad verbal de Nordclima a cualquier texto. Úsala\n  siempre que se escriba, revise o adapte contenido de Nordclima — anuncios,\n  emails, web, redes, presupuestos o respuestas a reseñas — aunque no se\n  mencione la marca de forma explícita.\n---\n\n# Voz de marca — Nordclima\n\nNordclima instala y mantiene climatización para comunidades de vecinos y\npequeña industria en el norte de España. Lleva 22 años. Su cliente decide\npor confianza, no por precio, y casi siempre después de una avería.\n\n## Cómo suena\n\nDirecta y sin adornos. Explica antes de vender. Habla de lo que se rompe,\nde lo que cuesta arreglarlo y de cuánto dura la solución.\n\n- Usted en el primer contacto; tú cuando ya hay relación.\n- Frases cortas. Si una frase pasa de 25 palabras, se parte en dos.\n- Cifras antes que adjetivos: \"22 años\" y \"48 h de respuesta\", nunca\n  \"amplia experiencia\" ni \"atención rápida\".\n\n## Lo que no se dice nunca\n\n- Solución integral, partner, sinergia, ecosistema, revolucionar.\n- Urgencia falsa: aquí no hay ofertas que acaban hoy.\n- Un porcentaje de ahorro sin haber visto la instalación.\n- El nombre de un competidor.\n\n## Reglas por canal\n\n| Canal              | Extensión        | Cierre                     |\n|--------------------|------------------|----------------------------|\n| Meta e Instagram   | 2 frases         | Pregunta directa           |\n| Email a comunidades| 120-160 palabras | Teléfono, no formulario    |\n| Web                | Titular + 3 párrafos | Presupuesto sin compromiso |\n| Reseñas            | 40 palabras      | Nombre del técnico         |\n\n## Antes de entregar\n\nRevisa el texto contra \"Lo que no se dice nunca\" y corrige lo que encuentres,\nsin avisar de la corrección.\n\nSi falta un dato — un precio, un plazo, el nombre del técnico — escríbelo como\n[PENDIENTE: qué falta] en vez de inventarlo. Inventar una cifra en algo que el\ncliente va a leer es el único error que a esta marca le cuesta un contrato."
            },
            { t: "texto", md: "Fíjate en tres cosas de ese archivo, porque son las que separan una skill que funciona de un PDF con otro nombre." },
            { t: "texto", md: "**Uno: la descripción no describe, convoca.** No dice \"guía de marca de Nordclima\". Enumera las situaciones —anuncios, emails, web, reseñas— y añade *aunque no se mencione la marca de forma explícita*. Ese matiz es lo que hace que la skill se active cuando pides \"escribe un email para la comunidad de Mendizábal\" sin nombrar a Nordclima." },
            { t: "aviso", texto: "Este es el fallo número uno, y es silencioso: la skill está perfecta y no se activa nunca. Si tu descripción solo dice qué es la skill y no en qué situaciones se usa, has escrito una etiqueta, no un disparador." },
            { t: "texto", md: "**Dos: la sección de prohibiciones es más larga que la de estilo.** Es deliberado. Describir un tono es difícil y subjetivo; prohibir seis palabras es inequívoco. Las prohibiciones hacen más por la consistencia de una marca que cualquier párrafo sobre \"cercanía y profesionalidad\"." },
            { t: "texto", md: "**Tres: la última instrucción explica su motivo.** No dice \"no inventes datos\" a secas: dice qué pasa si lo hace. Una instrucción con su razón detrás se aplica mejor en los casos raros que tú no previste, porque se entiende el criterio en vez de memorizar la regla." },
            { t: "texto", md: "Qué **no** meter dentro: la historia completa de la empresa, precios que cambian cada trimestre, ni el logo. Una skill son criterios estables. Lo que caduca va en el Proyecto del cliente, donde se actualiza sin tocar la herramienta." },
            { t: "texto", md: "Si el manual de marca ya existe y es largo, no lo transcribas a mano. Pásaselo:" },
            { t: "prompt",
              titulo: "Convertir un manual de marca existente en skill",
              texto: "Te adjunto el manual de marca de [CLIENTE].\n\nConviértelo en un SKILL.md siguiendo esta estructura:\n  - cabecera con name y description\n  - quién es la marca (3-4 líneas, contexto de negocio, no marketing)\n  - cómo suena (reglas verificables, no adjetivos)\n  - lo que no se dice nunca (lista cerrada de palabras y prácticas)\n  - reglas por canal (tabla)\n  - qué revisar antes de entregar\n\nDos condiciones:\n\n1. En \"cómo suena\", convierte cada adjetivo del manual en una regla que yo\n   pueda comprobar. \"Cercano\" no vale; \"tutea a partir del segundo email\" sí.\n\n2. En la description, no describas la skill: enumera las situaciones\n   concretas en las que debe activarse, e incluye que debe activarse aunque\n   no se nombre la marca.\n\nSi el manual no dice nada sobre algún apartado, déjalo vacío y dime qué falta.\nNo lo rellenes tú."
            },
            { t: "texto", md: "La última condición importa: un modelo al que le pides un documento completo te lo entrega completo, inventando lo que falte. Pedirle explícitamente que señale los huecos convierte esa tendencia en una auditoría de tu manual de marca." },
            { t: "texto", md: "**Cómo saber si funciona.** Abre dos conversaciones nuevas —nuevas, no la de abajo, donde Claude ya sabe de qué hablabais— y pide:" },
            { t: "lista", items: [
              "Una pieza nombrando la marca: *\"escribe un anuncio para Nordclima\"*. Si aquí no se activa, la descripción está rota del todo.",
              "Una pieza **sin** nombrarla: *\"escribe la respuesta a esta reseña de dos estrellas\"*. Este es el test de verdad: es como vas a trabajar el 90% de los días.",
              "Una pieza que pise una prohibición a propósito: *\"escribe un anuncio de oferta que acabe hoy\"*. Una skill bien escrita te avisa del conflicto en vez de obedecer."
            ]},
            { t: "aviso", texto: "Si todavía no tienes manual de marca de ningún cliente, esta lección la puedes hacer con tu propia marca o con la de la agencia. Si prefieres construir los activos primero, ve a la lección 3.1 y vuelve aquí después: es la única lección del módulo que se puede saltar sin romper el orden." },
            { t: "clave", texto: "Todo lo que viene después de este módulo asume que tienes esta skill hecha. No es una lección: es la herramienta con la que se hace el resto del curso." }
          ],
          ejercicio: "Coge la marca sobre la que más escribes —un cliente o la tuya— y escribe su SKILL.md entero, con la sección de prohibiciones más larga que la de estilo. Luego pásale los tres tests de arriba. Si el segundo falla, el problema está en la description: reescríbela nombrando situaciones, no la marca.",
          recursos: []
        },
        {
          id: "m1-l5",
          titulo: "Qué NO delegar en la IA",
          duracion: 6,
          plataforma: "Claude.ai",
          objetivo: "Marcar la frontera antes de automatizar, no después del susto con un cliente.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        }
      ]
    },

    /* ------------------------------------------------------------------ M2 */
    {
      id: "m2",
      titulo: "Investigar y definir",
      resumen: "Lo que va antes de escribir una sola línea de copy: a quién le hablas, contra quién compites y qué vais a hacer exactamente.",
      lecciones: [
        {
          id: "m2-l1",
          titulo: "Crear personas de clientes",
          duracion: 15,
          plataforma: "Claude.ai",
          objetivo: "Construir perfiles de cliente a partir de datos reales del negocio, no de suposiciones de sala de reuniones.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m2-l2",
          titulo: "Construye el documento de comparación competitiva",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Montar la tabla comparativa que el equipo comercial usa cuando el cliente nombra a un competidor.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m2-l3",
          titulo: "Crear un brief de campaña",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Convertir una idea suelta en un brief que otra persona puede ejecutar sin volver a preguntarte.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        }
      ]
    },

    /* ------------------------------------------------------------------ M3 */
    {
      id: "m3",
      titulo: "Marca",
      resumen: "Producir marca y aplicarla a escala. Las tres lecciones dan por hecho que ya tienes hecha la skill de marca del módulo 1.",
      lecciones: [
        {
          id: "m3-l1",
          titulo: "Crear activos de marca",
          duracion: 15,
          plataforma: "Claude.ai",
          objetivo: "Producir los elementos visuales y verbales que definen cómo se ve y cómo suena la marca.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m3-l2",
          titulo: "Crea contenido alineado con tu marca",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Producir piezas que ya nacen dentro de las directrices, sin pasada posterior de corrección.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m3-l3",
          titulo: "Audita una carpeta de recursos visuales",
          duracion: 15,
          plataforma: "Cowork",
          objetivo: "Revisar cientos de archivos contra el manual de marca y salir con una lista concreta de qué corregir.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        }
      ]
    },

    /* ------------------------------------------------------------------ M4 */
    {
      id: "m4",
      titulo: "Producir y distribuir",
      resumen: "Una pieza buena vale por diez si sabes derivarla. Aquí se trabaja la multiplicación, no la creación desde cero.",
      lecciones: [
        {
          id: "m4-l1",
          titulo: "Adaptar contenido entre plataformas",
          duracion: 15,
          plataforma: "Claude.ai",
          objetivo: "Reescribir una pieza para cada canal respetando sus códigos, en vez de recortarla y pegarla igual.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m4-l2",
          titulo: "Reutiliza contenido en todos los canales",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Convertir un activo grande en toda su batería de piezas derivadas de una sola tirada.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        }
      ]
    },

    /* ------------------------------------------------------------------ M5 */
    {
      id: "m5",
      titulo: "Medir y decidir",
      resumen: "La parte donde la IA deja de ser un redactor barato y pasa a ser un analista que no se cansa ni tiene sesgo con la campaña que propuso él.",
      lecciones: [
        {
          id: "m5-l1",
          titulo: "Analizar el rendimiento de campañas",
          duracion: 10,
          plataforma: "Claude.ai",
          objetivo: "Pasar de datos de campaña a decisiones: qué se pausa, qué se escala y qué se reescribe.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m5-l2",
          titulo: "Resume el rendimiento de tus anuncios",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Producir el informe semanal de anuncios que hoy te come media mañana.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m5-l3",
          titulo: "Analizar el rendimiento de recaudación de fondos",
          duracion: 15,
          plataforma: "Claude.ai",
          objetivo: "Aplicar el mismo análisis a captación de donantes, para cuentas de ONG y proyectos sin ánimo de lucro.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        }
      ]
    }

  ]
};
