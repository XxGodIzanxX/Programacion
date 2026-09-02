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
  version: "1.0",

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
          estado: "listo",
          bloques: [
            { t: "texto", md: "Claude no es una cosa: son cuatro sitios distintos donde trabajar, y elegir mal el sitio cuesta más tiempo que elegir mal el prompt. Esta lección existe para que sepas dónde estás en cada una de las 12 lecciones que vienen." },
            { t: "tabla",
              cabeceras: ["Superficie", "Qué es", "Cuándo la usas"],
              filas: [
                ["**Conversación**", "Un chat en blanco", "Algo puntual que no vas a repetir"],
                ["**Proyecto**", "Un espacio con instrucciones y archivos fijos", "Un cliente o una marca concretos"],
                ["**Skill**", "Un método tuyo empaquetado, que se activa solo", "Un criterio que aplicas en varios clientes"],
                ["**Cowork**", "Claude trabajando sobre carpetas de archivos", "Lotes: muchos archivos de una tirada"]
              ]
            },
            { t: "texto", md: "La diferencia que más confunde es Proyecto contra skill, y ya la viste en la tabla de la lección anterior. La otra —Claude.ai contra Cowork— es más simple de lo que parece: **si el trabajo es una conversación, es Claude.ai; si el trabajo es una carpeta, es Cowork**." },
            { t: "texto", md: "Escribir tres anuncios es una conversación. Revisar los 400 archivos de la carpeta de gráficas de un cliente es una carpeta. Ninguna de las dos hace bien el trabajo de la otra." },
            { t: "clave", texto: "Conversación para pensar. Proyecto para recordar. Skill para repetir. Cowork para escalar." },
            { t: "texto", md: "El error típico del que empieza es hacerlo todo en conversaciones sueltas. Funciona las primeras semanas y luego se rompe siempre por el mismo sitio: acabas con veinte chats, ninguno encuentra nada, y el contexto del cliente lo vuelves a pegar cada vez." },
            { t: "aviso", texto: "Cowork necesita un plan de pago de Claude. Si no lo tienes, usa el filtro del índice para ver solo las lecciones que puedes hacer hoy: el método de cada una se entiende igual, pero el ejercicio no lo vas a poder completar." },
            { t: "texto", md: "Cowork se elige en el mismo cuadro de mensaje que el chat, no en otra aplicación. La lección siguiente lo deja montado y cubre la parte de seguridad, que en una agencia no es opcional." },
            { t: "texto", md: "La regla de decisión, en el orden en que hay que preguntársela:" },
            { t: "pasos", items: [
              "¿Voy a repetir esto en varios clientes? → **skill**.",
              "¿Es información de un cliente concreto? → **Proyecto** de ese cliente.",
              "¿Son muchos archivos a la vez? → **Cowork**.",
              "¿Nada de lo anterior? → una **conversación** normal, y no le des más vueltas."
            ]}
          ],
          ejercicio: "Coge las cinco cosas que más repites en tu semana. Clasifica cada una en las cuatro superficies con la regla de arriba. Si alguna cae en \"conversación\" y la haces más de una vez al mes, está mal clasificada: mírala otra vez.",
          recursos: []
        },
        {
          id: "m1-cowork",
          titulo: "Montar Cowork sin regalar la carpeta equivocada",
          duracion: 12,
          plataforma: "Cowork",
          objetivo: "Dejar Cowork listo para las seis lecciones que lo usan, y entender por qué la carpeta que conectas importa más que el prompt que escribes.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "Seis de las lecciones de este curso se ejecutan en Cowork. Esta las prepara todas de una vez, y de paso cubre la única parte del curso donde un error no se corrige reescribiendo: la carpeta que le das." },
            { t: "texto", md: "**Qué necesitas.** Un plan de pago de Claude: Pro, Max, Team o Enterprise. Cowork no está en el plan gratuito. Está en la app de escritorio de macOS y Windows, en claude.ai, en móvil y en el panel lateral de Chrome — pero para trabajar con archivos de tu ordenador necesitas la app de escritorio **abierta**, porque la sesión corre en los servidores de Anthropic y llega a tus archivos a través de ella." },
            { t: "clave", texto: "Chat y Cowork empiezan en el mismo sitio: en el cuadro de mensaje eliges uno u otro. No hay que irse a ninguna parte." },
            { t: "pasos", items: [
              "En el cuadro de mensaje, cambia de **Chat** a **Cowork**.",
              "Conecta la carpeta sobre la que va a trabajar. Solo lee y escribe dentro de las carpetas que conectas explícitamente.",
              "Describe el resultado que quieres, no los pasos. Cowork planifica los pasos.",
              "**Lee el plan que te propone antes de autorizarlo.** Este es el paso que la gente se salta y el que evita el 90% de los sustos.",
              "Mientras trabaja ves el progreso paso a paso, y puedes corregirle a mitad o pararlo."
            ]},
            { t: "texto", md: "**Los tres modos de permiso**, y cuál usar en cada lección del curso:" },
            { t: "tabla",
              cabeceras: ["Modo", "Qué hace", "Cuándo"],
              filas: [
                ["**Manual**", "Pregunta antes de cada acción", "Carpetas de cliente, primera vez con un flujo, cualquier cosa que borre o mueva"],
                ["**Auto**", "Aprueba solo lo que pasa su revisión de seguridad", "Trabajo repetido que ya has visto funcionar"],
                ["**Skip**", "No pregunta nada", "Casi nunca. Solo en carpetas tuyas, con material que puedes perder"]
              ]
            },
            { t: "texto", md: "Ahora la parte que de verdad importa, y que no es una advertencia de manual sino el modelo de amenaza real de esta herramienta." },
            { t: "texto", md: "Cowork lee contenido que tú no has escrito —webs, PDFs de terceros, correos, reseñas descargadas— y además puede actuar sobre tus archivos. Cuando esas dos cosas se juntan aparece la **inyección de prompts**: instrucciones escondidas dentro de un documento que Claude está leyendo, escritas para que las obedezca como si vinieran de ti." },
            { t: "clave", texto: "El riesgo no vive en lo que le pides: vive en lo que le dejas leer, multiplicado por lo que le dejas hacer. Reduce cualquiera de los dos y el riesgo baja." },
            { t: "texto", md: "De ahí salen cinco reglas de trabajo que en una agencia no son opcionales:" },
            { t: "lista", items: [
              "**Carpeta de trabajo dedicada, nunca la carpeta viva del cliente.** Copias dentro lo que necesita esa tarea y nada más. Cuesta dos minutos y es la medida que más protege.",
              "**Nunca conectes carpetas con facturación, contratos, credenciales o datos personales.** Aunque la tarea no vaya de eso: si está conectada, está al alcance.",
              "**Modo Manual siempre que la tarea toque material de cliente**, y siempre la primera vez que corres un flujo nuevo.",
              "**Mira lo que hace mientras lo hace.** Si abre archivos que no venían a cuento o visita webs que tú no le has dado, para. Eso es exactamente la señal.",
              "**Cuidado con las tareas programadas.** Corren solas y sin nadie mirando. Empieza por cosas simples, revisa sus resultados y pausa las que ya no uses."
            ]},
            { t: "aviso", texto: "Y la frase que hay que interiorizar antes de conectar la primera carpeta: eres tú quien responde de lo que haga en tu nombre. Lo que publique, lo que mueva, lo que envíe. \"Lo hizo la IA\" no es una explicación que le sirva a un cliente cuyo material has movido." },
            { t: "texto", md: "Esto no es una razón para no usarlo: es lo que separa usarlo en la agencia de usarlo en tus cosas. Con una carpeta dedicada y el modo Manual, las seis lecciones que vienen se hacen sin exponer nada." },
            { t: "texto", md: "Una limitación práctica que conviene saber ya: **las sesiones de Cowork no se comparten**. No puedes mandarle a un compañero la sesión para que siga. Lo que se comparte son los archivos que produce." }
          ],
          ejercicio: "Crea la carpeta de trabajo que vas a usar en el resto del curso: una carpeta nueva, vacía, fuera de donde tengas material de clientes. Conéctala en modo Manual y pídele algo trivial —que liste lo que hay dentro— solo para ver el flujo de plan, autorización y progreso antes de darle trabajo de verdad.",
          recursos: [
            { titulo: "Empezar con Claude Cowork (Anthropic)", url: "https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork" },
            { titulo: "Usar Claude Cowork de forma segura (Anthropic)", url: "https://support.claude.com/en/articles/13364135-use-claude-cowork-safely" }
          ]
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
          estado: "listo",
          bloques: [
            { t: "texto", md: "Esta lección es la más corta del curso y la que te va a ahorrar el disgusto más caro. La frontera no está donde la gente cree: no es \"lo creativo sí, lo técnico no\". Es mucho más simple." },
            { t: "clave", texto: "Delega lo que puedas verificar más rápido de lo que costaría generarlo a mano. No delegues lo que solo sabrías que está mal cuando ya lo ha leído el cliente." },
            { t: "texto", md: "Un titular malo lo detectas en dos segundos. Un dato de facturación inventado dentro de un informe de 12 páginas no lo detecta nadie hasta que alguien lo cita en una reunión. La diferencia no es la dificultad de la tarea: es el **coste de que salga mal sin que te enteres**." },
            { t: "texto", md: "Lo que no sale de tu revisión, nunca:" },
            { t: "lista", items: [
              "**Cifras que van a un cliente.** Precios, plazos, porcentajes de resultados, datos de un informe. Un modelo que no tiene el dato lo estima, y una estimación bien redactada es indistinguible de un dato.",
              "**Promesas reguladas.** Sanidad, finanzas, seguros, apuestas, formación. Aquí la frase equivocada no es un error de estilo: es una sanción.",
              "**Reclamaciones sobre la competencia.** \"Somos más baratos que X\" es una afirmación verificable y, si es falsa, denunciable.",
              "**La decisión estratégica.** Claude te dice qué dicen los datos. Qué haces con eso lo decides tú, porque tú sabes el margen, el stock y con quién no quieres quedar mal."
            ]},
            { t: "aviso", texto: "Y una que no es de calidad sino legal: los datos personales de clientes de tus clientes. Una lista de contactos, transcripciones con nombres, tickets de soporte. Antes de subir eso a ninguna herramienta, mira qué firmaste con ese cliente. Que sea cómodo no significa que esté permitido." },
            { t: "texto", md: "Al revés también hay una lista, y es más larga: casi todo lo demás sí se delega. Primeras versiones, variantes, reestructurar, traducir, resumir, buscar contradicciones en un documento largo, convertir un formato en otro. Ahí el coste de un error es que lo ves y lo corriges." },
            { t: "texto", md: "Si quieres una sola pregunta que resuelva el 90% de los casos: *si esto sale mal y nadie lo revisa, ¿me entero yo o se entera el cliente?*" }
          ],
          ejercicio: "Escribe tu propia lista de \"esto no sale sin que lo mire yo\" para tu negocio, con nombres concretos de entregables y no categorías. Pégala como sección final en la skill de marca de la lección 1.5: así viaja contigo en cada conversación.",
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
          estado: "listo",
          bloques: [
            { t: "texto", md: "La mayoría de los buyer persona son ficción. \"María, 34 años, urbanita, preocupada por el medio ambiente, le gusta el yoga\": eso no es un perfil de cliente, es un personaje que alguien se inventó en una sala de reuniones y que nadie ha vuelto a mirar." },
            { t: "texto", md: "Sirve para poco porque no dice nada accionable. Un perfil útil responde a tres preguntas: **qué le pasó justo antes de buscarte**, **qué se juega si se equivoca al elegir**, y **con qué palabras describe él su problema**, que casi nunca son las tuyas." },
            { t: "clave", texto: "Un buyer persona vale lo que valen sus fuentes. Sin datos reales de entrada, lo que sale es un personaje bien escrito y nada más." },
            { t: "texto", md: "La materia prima existe y casi siempre está sin usar:" },
            { t: "tabla",
              cabeceras: ["Fuente", "Qué saca de ahí", "Dónde está"],
              filas: [
                ["Reseñas propias y de la competencia", "El vocabulario real y la objeción repetida", "Google, Amazon, Trustpilot"],
                ["Transcripciones de llamadas de venta", "El momento exacto en que se cae la venta", "Tu CRM o tu grabador de reuniones"],
                ["Tickets de soporte", "Qué esperaban y no era", "Tu bandeja de entrada"],
                ["Búsquedas que traen tráfico", "Cómo lo nombran cuando no te conocen", "Search Console"],
                ["Formularios de baja", "El motivo real de irse", "Tu plataforma de email"]
              ]
            },
            { t: "texto", md: "Con eso delante, el prompt no pide un perfil: pide un análisis del que sale un perfil." },
            { t: "prompt",
              titulo: "Perfil de cliente a partir de datos reales",
              texto: "Te paso material real de [NEGOCIO]: reseñas, transcripciones de llamadas y\nmotivos de baja. Están sin ordenar y algunos se contradicen.\n\nAntes de escribir ningún perfil, hazme este análisis:\n\n1. Las 10 expresiones literales que más se repiten para describir el problema.\n   Textuales, con sus palabras, no traducidas a lenguaje de marketing.\n2. Las objeciones ordenadas por frecuencia, no por lo graves que te parezcan.\n3. El disparador: qué pasa en su vida justo antes de que nos busquen.\n4. Las contradicciones que encuentres entre fuentes, sin resolverlas.\n\nPara y enséñame eso. No escribas el perfil todavía."
            },
            { t: "texto", md: "El punto 4 es el que más rendimiento da y el que nadie pide. Las contradicciones entre lo que dice la web y lo que dicen las reseñas son, casi siempre, el problema de posicionamiento entero del negocio." },
            { t: "texto", md: "Solo cuando ese análisis está revisado se construye el perfil:" },
            { t: "prompt",
              titulo: "Segunda fase, con el análisis ya validado",
              texto: "Con el análisis que acabamos de validar, escribe entre 2 y 4 perfiles.\nNi uno solo (esconde diferencias reales) ni siete (nadie los usa).\n\nCada perfil, en una página:\n  - Situación: qué le está pasando, en una frase\n  - Disparador: qué le hizo empezar a buscar\n  - Con qué palabras lo cuenta él (citas literales del material)\n  - Qué se juega si elige mal\n  - Objeción principal y qué la desactiva\n  - Dónde se informa antes de decidir\n\nDos reglas:\n\n- Nada de demografía inventada. Si el material no dice la edad, no pongas\n  una edad. Un perfil sin edad es útil; un perfil con la edad inventada es\n  peor que no tenerlo, porque alguien lo va a usar para segmentar.\n- Al final, una sección \"Lo que no sabemos\": qué haría falta preguntar para\n  completar el perfil. Esa lista es el guion de tus próximas 5 llamadas."
            },
            { t: "aviso", texto: "Si le pides un perfil sin darle material, te lo escribe igual de bien redactado. Esa es exactamente la trampa: la calidad de la prosa no te dice nada sobre la calidad de la información. Un perfil inventado con buena prosa es más peligroso que uno mal escrito, porque se cree." },
            { t: "texto", md: "La sección **\"lo que no sabemos\"** es lo que convierte esta lección en un proceso en vez de un entregable. Cada trimestre añades material nuevo, y los huecos se van cerrando con datos en vez de con suposiciones." }
          ],
          ejercicio: "Coge tu cliente con más reseñas. Exporta 30 reseñas y, si tienes, 3 transcripciones de llamada. Corre las dos fases. Compara el resultado con el buyer persona que ese cliente tenga hoy en su brief: la distancia entre los dos es lo que le vas a enseñar en la próxima reunión.",
          recursos: []
        },
        {
          id: "m2-l2",
          titulo: "Construye el documento de comparación competitiva",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Montar la tabla comparativa que el equipo comercial usa cuando el cliente nombra a un competidor.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "**El montaje.** Cowork trabaja sobre lo que hay en la carpeta, así que la estructura de la carpeta es media tarea. Una subcarpeta por competidor y una de salida, para que lo que produzca no se mezcle con lo que le diste:" },
            { t: "archivo", nombre: "comparativa-[cliente]/", texto: "comparativa-[cliente]/\n├── nuestra-marca/\n│   ├── precios.pdf\n│   └── resenas.csv\n├── competidor-1/\n│   ├── precios.pdf\n│   ├── pagina-producto.pdf\n│   └── resenas.csv\n├── competidor-2/\n├── competidor-3/\n└── salida/" },
            { t: "texto", md: "Nombra las subcarpetas con el nombre real del competidor, no con \"competidor-1\". Va a citar la fuente de cada fila, y \"competidor-2\" no le sirve a nadie en una llamada." },
            { t: "texto", md: "Modo **Manual**: es material de cliente. Y esta tarea solo lee y escribe en `salida/`, así que cualquier permiso que te pida para tocar otra cosa es una señal de que algo va mal." },
            { t: "texto", md: "Este documento no es de marketing: es de ventas. Lo usa la persona que está en una llamada cuando el cliente dice *\"es que estoy mirando también a [competidor]\"*. Si esa respuesta se improvisa, se pierde." },
            { t: "texto", md: "Y por eso el formato importa tanto como el contenido. Un análisis competitivo de 20 páginas no lo abre nadie en mitad de una llamada. Lo que se usa es **una tabla y tres frases**." },
            { t: "clave", texto: "El documento comparativo se escribe para el peor momento posible: alguien nervioso, en una llamada, con quince segundos para responder." },
            { t: "texto", md: "Es una tarea de Cowork y no de conversación porque la materia prima son archivos: capturas de webs de competidores, sus listas de precios, sus reseñas descargadas, sus anuncios guardados. Una carpeta, no un chat." },
            { t: "prompt",
              titulo: "Construir el comparativo",
              texto: "En la carpeta tienes material de [MARCA] y de sus 3 competidores directos:\npáginas de precios, páginas de producto y reseñas de cada uno.\n\nConstruye un documento comparativo con esta estructura:\n\n1. UNA TABLA, máximo 8 filas. Las filas son los criterios por los que decide\n   el cliente, no las funcionalidades que a cada uno le gusta enseñar.\n   Sácalos de las reseñas: lo que la gente menciona al decidir.\n\n2. Por cada competidor, tres bloques cortos:\n   - Dónde nos gana de verdad (si no encuentras ninguno, dilo; no lo suavices)\n   - Dónde le ganamos\n   - La frase de 15 segundos para una llamada, sin nombrarlo con desprecio\n\n3. Una sección \"Sin verificar\": todo dato que no hayas podido confirmar en\n   el material. Precios que puedan haber cambiado, funcionalidades anunciadas\n   pero no documentadas, reseñas que parezcan compradas.\n\nNorma: cada afirmación de la tabla lleva al lado de qué archivo sale.\nUna comparativa sin fuentes no se puede defender delante de un cliente."
            },
            { t: "aviso", texto: "El apartado \"dónde nos gana de verdad\" es el que hay que leer primero, y el que la gente borra. Un comparativo donde ganas en las ocho filas no lo cree ni tu propio equipo comercial, y en cuanto el cliente detecta una fila falsa, deja de creerse las otras siete." },
            { t: "texto", md: "Sobre lo legal, y va en serio: comparar es legítimo, y en publicidad comparativa está regulado. Un dato objetivo, verificable y actual se puede publicar. Una valoración (\"su soporte es peor\") no es un dato: es una opinión, y publicarla como si fuera un hecho es un problema. Por eso el prompt separa lo verificado de lo que no lo está." },
            { t: "texto", md: "El documento caduca. Los precios cambian, las funcionalidades se lanzan. Ponle fecha en la cabecera y rehazlo cada trimestre: es media hora, y un comparativo con precios de hace un año hace más daño que no tener ninguno." }
          ],
          ejercicio: "Elige un cliente y sus 3 competidores más nombrados en llamadas. Junta en una carpeta la página de precios de cada uno y 20 reseñas de cada uno. Corre el prompt. Manda la tabla a la persona que hace las llamadas y pregúntale una sola cosa: \"¿esto te serviría en directo?\". Si duda, sobra información.",
          recursos: []
        },
        {
          id: "m2-l3",
          titulo: "Crear un brief de campaña",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Convertir una idea suelta en un brief que otra persona puede ejecutar sin volver a preguntarte.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "**El montaje.** Aquí la entrada son tus notas en crudo y el material de contexto; la salida es un documento. Separa las dos cosas desde el principio:" },
            { t: "archivo", nombre: "brief-[campana]/", texto: "brief-[campana]/\n├── entrada/\n│   ├── notas-reunion.md      ← tus notas, tal cual\n│   ├── perfiles-cliente.md   ← de la lección 2.1\n│   └── briefs-anteriores/    ← los que salieron bien\n└── salida/" },
            { t: "texto", md: "`briefs-anteriores/` es la carpeta que casi nadie pone y la que más cambia el resultado: dos briefs tuyos que funcionaron enseñan tu formato mejor que cualquier instrucción sobre el formato." },
            { t: "texto", md: "Un brief no es un resumen de la campaña: es el documento que evita la discusión de dentro de tres semanas. Si al terminar la campaña alguien puede decir *\"yo esto no lo entendí así\"*, el brief estaba mal escrito." },
            { t: "clave", texto: "Un brief está terminado cuando alguien que no estuvo en la reunión puede ejecutarlo sin preguntarte nada." },
            { t: "texto", md: "Ese es el listón, y casi ningún brief lo pasa. Fallan siempre por los mismos dos sitios: no dicen cómo se mide el éxito, y no dicen qué está prohibido." },
            { t: "texto", md: "Los ocho campos que tienen que estar:" },
            { t: "tabla",
              cabeceras: ["Campo", "La pregunta que responde", "Error típico"],
              filas: [
                ["Objetivo de negocio", "¿Qué cambia si esto funciona?", "\"Aumentar la visibilidad\""],
                ["Métrica de éxito", "¿Con qué número lo sabremos?", "No ponerla"],
                ["A quién", "¿Cuál de los perfiles, no todos?", "\"Nuestro público objetivo\""],
                ["Qué le decimos", "La idea, en una frase", "Tres ideas disfrazadas de una"],
                ["Por qué nos va a creer", "La prueba concreta", "Adjetivos"],
                ["Dónde y cuándo", "Canales y fechas", "Canales sin presupuesto asignado"],
                ["Qué NO hacemos", "Los límites explícitos", "Se omite y se descubre tarde"],
                ["Quién aprueba", "Un nombre, no un departamento", "\"Lo vemos con el equipo\""]
              ]
            },
            { t: "texto", md: "Como en la lección 1.2, el brief se saca en dos fases. Que te entreviste primero es lo que evita que rellene los huecos por su cuenta." },
            { t: "prompt",
              titulo: "Fase 1 — que te entreviste",
              texto: "Vamos a montar un brief de campaña para [CLIENTE].\n\nEsto es lo que tengo, que está incompleto y desordenado:\n[pega tus notas de la reunión, tal cual]\n\nNo escribas el brief todavía. Hazme las preguntas mínimas que te falten para\npoder escribirlo, ordenadas por lo mucho que cambian el resultado si me\nequivoco al responderlas.\n\nMáximo 8 preguntas. Si algo lo puedes deducir de mis notas con seguridad\nrazonable, dedúcelo y dime qué has asumido, en vez de preguntármelo."
            },
            { t: "texto", md: "Ese último párrafo es el que hace que la lista sea manejable. Sin él te devuelve veinte preguntas, la mitad contestadas ya en tus notas, y el brief acaba tardando más que hacerlo a mano." },
            { t: "prompt",
              titulo: "Fase 2 — el brief",
              texto: "Con mis respuestas, escribe el brief con estos ocho apartados:\nobjetivo de negocio, métrica de éxito, a quién, qué le decimos,\npor qué nos va a creer, dónde y cuándo, qué NO hacemos, quién aprueba.\n\nCondiciones:\n\n- Una página. Si no cabe, es que hay dos campañas metidas en una: dímelo\n  en vez de comprimir.\n- \"Qué le decimos\" es UNA frase. Si hay dos ideas, elige y justifica.\n- La métrica lleva número y fecha. \"Más leads\" no es una métrica;\n  \"40 leads cualificados antes del 30 de junio\" sí.\n- Cierra con \"Supuestos\": todo lo que has dado por hecho y nadie ha\n  confirmado. Ese apartado es el que hay que leer en la reunión de\n  aprobación, antes que ningún otro."
            },
            { t: "aviso", texto: "Si el cliente no sabe decirte la métrica de éxito, no es que falte un dato del brief: es que la campaña no está decidida. Escribirla igualmente no arregla nada, solo mueve la discusión al final, cuando ya está el dinero gastado." },
            { t: "texto", md: "El apartado de supuestos hace un trabajo silencioso: convierte tus suposiciones en algo que el cliente firma o corrige. Después, \"yo esto no lo entendí así\" ya no es una opinión contra otra." }
          ],
          ejercicio: "Coge el brief de tu última campaña y compáralo contra los ocho campos. Cuenta cuántos faltan. Luego coge tus notas en crudo de la próxima y pásale las dos fases: mide cuánto tardas comparado con la vez anterior.",
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
          estado: "listo",
          bloques: [
            { t: "texto", md: "\"Activos de marca\" suena a logotipo. El logotipo es la parte fácil y la que menos se usa. Lo que de verdad gasta tiempo cada semana es el **sistema verbal**: cómo se llama cada cosa, cómo se abre un email, qué se promete y qué no." },
            { t: "texto", md: "Aquí es donde conviene ser claro sobre qué parte de esto se delega bien y qué parte no." },
            { t: "tabla",
              cabeceras: ["Activo", "Qué esperar", "Qué no"],
              filas: [
                ["Sistema verbal (tono, vocabulario, prohibiciones)", "Muy bueno, y es lo que más se usa", "—"],
                ["Nombres, claims, taglines", "Buenas listas largas para elegir", "Que elija por ti: eso es criterio"],
                ["Arquitectura de mensajes por perfil", "Muy bueno partiendo del módulo 2", "Sin perfiles reales, ficción"],
                ["Dirección visual descrita en palabras", "Útil como brief para un diseñador", "Un manual visual terminado"],
                ["Logotipo definitivo", "—", "**No.** Un logo es identidad legal y registrable"]
              ]
            },
            { t: "clave", texto: "Genera las opciones con la IA. Elige tú. Un sistema de marca es una cadena de decisiones, y una decisión que no has tomado tú no la vas a poder defender." },
            { t: "texto", md: "El sistema verbal se construye desde el perfil de cliente, no desde el gusto del fundador. Si has hecho la lección 2.1, ya tienes el vocabulario real de la gente que compra; ese es el material de entrada." },
            { t: "prompt",
              titulo: "Sistema verbal a partir de los perfiles",
              texto: "Te paso los perfiles de cliente de [MARCA] y 30 reseñas reales.\n\nConstruye el sistema verbal de la marca:\n\n1. TONO — 5 reglas comprobables. Nada de adjetivos. \"Cercano\" no es una\n   regla; \"nunca empieza un email con el nombre de la empresa\" sí.\n\n2. VOCABULARIO — dos columnas: la palabra que usa el cliente (de las reseñas)\n   y la palabra que usa el sector. Cuando difieran, gana la del cliente y\n   explica por qué en una línea.\n\n3. PROHIBICIONES — lista cerrada de palabras y de prácticas. Sé estricto:\n   esta sección es la que más hace por la consistencia.\n\n4. ARQUITECTURA DE MENSAJE — por cada perfil: qué se le dice primero,\n   qué prueba se le enseña, y qué objeción hay que desactivar.\n\n5. TRES FORMAS DE DECIR LO MISMO — la misma idea escrita para un anuncio,\n   para un email y para la web, para que se vea que el sistema aguanta\n   cambios de formato.\n\nSi los perfiles no dan para alguno de los cinco puntos, déjalo vacío y dime\nqué material haría falta. No lo rellenes con lo que suele funcionar."
            },
            { t: "texto", md: "El punto 5 es el test del sistema. Un sistema verbal que solo sabe sonar bien en un formato no es un sistema: es una plantilla de anuncio." },
            { t: "aviso", texto: "Sobre lo visual: puedes generar imágenes de dirección artística y sirven para acordar una dirección con el cliente. Pero no las publiques como activos definitivos sin mirar dos cosas — que la licencia de la herramienta te permita uso comercial, y que el resultado sea reproducible. Una imagen que no puedes volver a generar igual no es un activo de marca: es una ilustración suelta." },
            { t: "texto", md: "Cuando el sistema verbal esté cerrado, no lo dejes en un documento. Vuelve a la lección 1.5 y conviértelo en la skill de la marca. Ese es el paso que hace que todo esto se aplique solo en vez de quedarse en una carpeta." }
          ],
          ejercicio: "Construye el sistema verbal de una marca con la que trabajes. Cuando lo tengas, pásalo a SKILL.md siguiendo 1.5. Prueba a pedirle una pieza sin mencionar la marca: si no aplica el vocabulario de la columna del cliente, la description está mal.",
          recursos: []
        },
        {
          id: "m3-l2",
          titulo: "Crea contenido alineado con tu marca",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Producir piezas que ya nacen dentro de las directrices, sin pasada posterior de corrección.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "**El montaje.** Las tres partes de arriba son tres sitios concretos en la carpeta:" },
            { t: "archivo", nombre: "produccion-[campana]/", texto: "produccion-[campana]/\n├── brief.md                  ← de la lección 2.3\n├── perfiles.md               ← de la lección 2.1\n├── piezas-que-funcionaron/   ← material aprobado anterior\n└── salida/" },
            { t: "texto", md: "La skill de marca no va en la carpeta: vive en tu cuenta y se activa sola. Esa es justamente la diferencia entre una skill y un archivo de contexto, y por qué la lección 1.5 está donde está." },
            { t: "texto", md: "Modo **Auto** es razonable a partir de la segunda tanda: esta tarea solo escribe archivos nuevos en `salida/` y no toca nada existente. La primera vez, Manual, para ver qué hace." },
            { t: "texto", md: "Esta lección no enseña a escribir: enseña a **dejar de revisar**. Si has hecho la 1.5 tienes la marca empaquetada en una skill; aquí se usa en volumen, sobre una carpeta, en vez de pieza a pieza en un chat." },
            { t: "clave", texto: "El objetivo no es que la pieza salga buena. Es que salga ya dentro de las directrices, para que la revisión sea una lectura y no una corrección." },
            { t: "texto", md: "La diferencia práctica es grande. Corregir el tono de doce piezas cuesta más que escribirlas: cada corrección es abrir el archivo, leerlo entero, decidir y reescribir. Que nazcan bien elimina ese paso, no lo acelera." },
            { t: "texto", md: "El montaje tiene tres partes, y las tres tienen que estar:" },
            { t: "pasos", items: [
              "**La carpeta**: el material de entrada. El brief de la lección 2.3, los perfiles de la 2.1, y las piezas anteriores que sí funcionaron.",
              "**La skill de marca** de la lección 1.5, que aporta el criterio.",
              "**La petición**, que dice qué piezas quieres y para qué canal."
            ]},
            { t: "texto", md: "Las piezas anteriores que funcionaron son la parte que casi nadie incluye y la que más cambia el resultado. Ya lo viste en la 1.2: dos ejemplos reales enseñan más que un párrafo describiendo el tono." },
            { t: "prompt",
              titulo: "Producción sobre carpeta",
              texto: "En la carpeta tienes el brief de la campaña, los perfiles de cliente y\nla subcarpeta \"piezas-que-funcionaron\" con material anterior aprobado.\n\nAplica la skill de marca de [MARCA] y produce:\n  - 6 anuncios para [CANAL], dirigidos al perfil [X]\n  - 3 asuntos de email por cada anuncio\n\nAntes de escribir, dime en dos líneas qué patrón has detectado en\n\"piezas-que-funcionaron\". Si no ves ninguno, dilo: significa que ese material\nno es homogéneo y que lo que salga va a serlo tampoco.\n\nAl entregar, marca con [REVISAR] cualquier frase donde hayas tenido que\nelegir entre dos reglas de la marca que se contradicen. Prefiero seis piezas\ncon tres marcas que seis piezas donde no sé dónde has decidido por mí."
            },
            { t: "texto", md: "Ese `[REVISAR]` es el mecanismo que hace que puedas leer en vez de corregir. En lugar de releer las seis piezas enteras buscando desviaciones, vas directo a los tres puntos donde hubo una decisión." },
            { t: "aviso", texto: "La primera tirada se revisa entera, siempre, aunque parezca perfecta. No es desconfianza: es que ahí es donde descubres los huecos de tu skill. Cada corrección que hagas en esa primera tirada es una regla que le falta a tu SKILL.md — anótala y añádela." },
            { t: "texto", md: "Ese bucle es lo que separa esta lección de \"pedirle textos a la IA\": cada tanda de producción mejora la herramienta. A la tercera campaña, la skill ya tiene las reglas que solo aparecen trabajando, y la revisión baja de horas a minutos." }
          ],
          ejercicio: "Produce una tanda de 6 piezas con tu skill de marca. Anota cada corrección que tengas que hacer. Cuando termines, añade esas correcciones como reglas al SKILL.md y repite con otra tanda: cuenta cuántas correcciones necesitas la segunda vez.",
          recursos: []
        },
        {
          id: "m3-l3",
          titulo: "Audita una carpeta de recursos visuales",
          duracion: 15,
          plataforma: "Cowork",
          objetivo: "Revisar cientos de archivos contra el manual de marca y salir con una lista concreta de qué corregir.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "**El montaje, y aquí hay una regla que no se negocia.** Nunca conectes la carpeta viva de recursos del cliente. Trabaja sobre una copia:" },
            { t: "archivo", nombre: "auditoria-[cliente]/", texto: "auditoria-[cliente]/\n├── manual/\n│   └── guia-marca.pdf\n├── recursos/        ← UNA COPIA, nunca el original\n└── salida/" },
            { t: "texto", md: "El motivo es simple: esta es la tarea del curso que más se parece a una que sí podría mover o renombrar archivos. El prompt le dice que no toque nada, y aun así trabajas sobre una copia. Las dos cosas, no una." },
            { t: "texto", md: "Modo **Manual**, sin excepción. Si en algún momento te pide permiso para escribir fuera de `salida/`, deniégalo y revisa el prompt: en esta tarea no hay ninguna razón legítima para hacerlo." },
            { t: "texto", md: "Toda agencia tiene esa carpeta: cientos de gráficas, presentaciones y creatividades acumuladas de años, hechas por gente distinta con criterios distintos. Nadie la audita porque abrir cuatrocientos archivos a mano no lo hace nadie por gusto." },
            { t: "texto", md: "Este es el caso donde Cowork gana de calle: el trabajo no es difícil, es **repetitivo y voluminoso**. Comprobar si un archivo usa el azul correcto es trivial. Hacerlo cuatrocientas veces sin saltarte ninguno, no." },
            { t: "clave", texto: "El entregable de una auditoría no es una opinión sobre la carpeta: es una lista priorizada de qué archivo hay que tocar y por qué." },
            { t: "texto", md: "Sé realista con lo que se puede juzgar y lo que no:" },
            { t: "tabla",
              cabeceras: ["Se comprueba bien", "No se comprueba"],
              filas: [
                ["Color fuera de paleta", "Si una foto \"transmite\" la marca"],
                ["Tipografía que no es la del manual", "Si una composición está bien resuelta"],
                ["Logo deformado, mal margen o mal contraste", "Si la idea creativa es buena"],
                ["Claims prohibidos en el texto de la pieza", "Si el resultado va a funcionar"],
                ["Formato y proporción incorrectos para su canal", "Calidad de la fotografía"]
              ]
            },
            { t: "texto", md: "Es decir: cumplimiento sí, criterio no. Lo que se automatiza es la parte aburrida y objetiva, que resulta ser el 90% del volumen." },
            { t: "prompt",
              titulo: "Auditoría de carpeta",
              texto: "En la carpeta \"recursos\" hay material gráfico de [MARCA] de los últimos años.\nEn \"manual\" está la guía de marca vigente.\n\nAudita cada archivo contra el manual y devuélveme UNA tabla con:\n  archivo | tipo de incumplimiento | gravedad | qué hay que hacer\n\nGravedad en tres niveles, definidos así:\n  - ALTA: está publicado ahora mismo y contradice el manual\n  - MEDIA: se reutiliza a menudo pero no está publicado\n  - BAJA: archivo antiguo que ya nadie usa\n\nCuatro condiciones:\n\n1. Un archivo por fila. Nada de \"varios archivos presentan...\".\n2. No modifiques ni muevas ningún archivo. Solo el informe.\n3. Si un archivo no lo puedes evaluar (formato que no abres, está corrupto,\n   no tiene texto legible), ponlo en una lista aparte de \"no evaluados\".\n   Prefiero saber qué no has mirado a que lo des por correcto.\n4. Ordena por gravedad y, dentro de cada nivel, por frecuencia de uso."
            },
            { t: "texto", md: "La condición 3 es la importante. Sin ella, lo que no se puede evaluar tiende a desaparecer del informe, y una auditoría con huecos invisibles es peor que no tener auditoría: te da una confianza que no te has ganado." },
            { t: "aviso", texto: "Que no toque los archivos es innegociable. Una auditoría propone; la corrección la aprueba una persona. Un renombrado masivo o un movimiento de carpetas mal entendido en un repositorio de cliente es de las pocas cosas de este curso que no tienen deshacer." },
            { t: "texto", md: "El resultado útil no es la tabla completa: son las filas de gravedad ALTA. Suelen ser entre cinco y quince en una carpeta de cientos, y son las que arreglas esta semana. El resto es un plan a tres meses, o directamente material para archivar." }
          ],
          ejercicio: "Coge la carpeta de recursos de un cliente y su manual de marca. Corre la auditoría. Manda solo las filas de gravedad ALTA al cliente, sin la tabla completa: es la diferencia entre un informe que se lee y uno que se guarda.",
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
          estado: "listo",
          bloques: [
            { t: "texto", md: "Adaptar no es recortar. El error que se ve en todas las agencias es coger el post de LinkedIn, quitarle caracteres hasta que cabe en X, quitarle más hasta que cabe en un pie de Instagram, y llamar a eso estrategia multicanal." },
            { t: "texto", md: "El resultado se nota: un texto que en su canal original funcionaba y en los otros cuatro suena a sobras. Porque cada plataforma no es un límite de caracteres distinto — es un **contrato de lectura** distinto." },
            { t: "clave", texto: "Cambiar de plataforma no es cambiar la longitud: es cambiar qué espera quien lee y en qué estado mental llega." },
            { t: "tabla",
              cabeceras: ["Plataforma", "Cómo llega el lector", "Qué le devuelve la pieza"],
              filas: [
                ["LinkedIn", "Buscando algo que le sirva en su trabajo", "Un aprendizaje, con la experiencia que lo respalda"],
                ["Instagram", "Pasando el rato", "Algo que le pare el dedo en el primer segundo"],
                ["X", "Buscando pelea o remate", "Una idea afilada, sin preámbulo"],
                ["Email", "Ya te dio permiso", "Lo que le prometiste, sin rodeos"],
                ["Blog / SEO", "Con una pregunta concreta", "La respuesta antes que el contexto"],
                ["TikTok", "Con el pulgar preparado", "El conflicto en los tres primeros segundos"]
              ]
            },
            { t: "texto", md: "Con esa tabla delante, el prompt deja de pedir \"adáptalo\" y pasa a pedir una reescritura con la intención del canal." },
            { t: "prompt",
              titulo: "Adaptación real, no recorte",
              texto: "Esta es la pieza original y funciona bien en [CANAL DE ORIGEN]:\n[pega la pieza]\n\nAdáptala a: [lista de canales]\n\nPara cada canal, y en este orden:\n\n1. Di primero en una línea qué cambia en la intención del lector en ese canal\n   respecto al original.\n2. Reescribe la pieza a partir de esa intención. Reescribe, no recortes:\n   puedes cambiar el orden, el ejemplo, el arranque y el cierre.\n3. Señala qué se ha perdido al adaptar. Siempre se pierde algo, y necesito\n   saber qué para decidir si en ese canal merece la pena publicarla.\n\nSi para algún canal la respuesta honesta es \"esta idea no funciona aquí\",\ndilo y explica por qué. Prefiero publicar en tres canales que en cinco con\ndos piezas flojas que arrastran la marca."
            },
            { t: "texto", md: "El punto 3 es el que convierte esto en una decisión editorial. Saber que la versión de X pierde el dato que hacía creíble la historia es lo que te permite decidir si publicarla o no — en vez de descubrirlo por el silencio." },
            { t: "aviso", texto: "Y el permiso explícito para decir \"aquí no funciona\" es lo que evita el peor resultado: cinco piezas donde dos son buenas y tres diluyen la marca. Sin ese permiso, siempre te va a devolver las cinco, porque eso es lo que pediste." },
            { t: "texto", md: "Un apunte que ahorra disgustos: publicar el mismo texto literal en varios sitios no te penaliza en redes, pero en la web sí importa. Si el mismo artículo va a tu blog y a un medio, decide cuál es la versión canónica antes de publicar, no después." }
          ],
          ejercicio: "Coge tu pieza con mejor rendimiento del último trimestre. Adáptala a tres canales con el prompt de arriba, incluyendo el paso 3. Publica solo las versiones donde lo perdido no sea el argumento central.",
          recursos: []
        },
        {
          id: "m4-l2",
          titulo: "Reutiliza contenido en todos los canales",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Convertir un activo grande en toda su batería de piezas derivadas de una sola tirada.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "**El montaje.** El material de un activo grande siempre está repartido en formatos distintos. Júntalo antes de empezar:" },
            { t: "archivo", nombre: "despiece-[activo]/", texto: "despiece-[activo]/\n├── fuente/\n│   ├── transcripcion.txt\n│   ├── diapositivas.pdf\n│   └── preguntas-audiencia.md   ← el oro de la carpeta\n└── salida/\n    ├── linkedin/\n    ├── video-corto/\n    └── newsletter/" },
            { t: "texto", md: "Crear las subcarpetas de salida por canal antes de lanzar la tarea sirve para algo concreto: te devuelve las piezas ya repartidas, listas para pasar a quien las publique, en vez de un documento largo que hay que trocear a mano." },
            { t: "texto", md: "La lección anterior adapta una pieza a varios canales. Esta hace otra cosa: coge **un activo grande** —un webinar, un informe, una entrevista larga, un caso de éxito— y saca de él toda la batería de piezas derivadas de una sola tirada." },
            { t: "texto", md: "La diferencia no es de tamaño sino de dirección. En 4.1 partes de una pieza terminada y la traduces. Aquí partes de material en bruto y lo despiezas." },
            { t: "clave", texto: "Un webinar de una hora contiene entre veinte y treinta piezas. El problema nunca ha sido producirlas: es que despiezarlo a mano cuesta un día y siempre hay algo más urgente." },
            { t: "texto", md: "Va en Cowork porque el material real es un montón de archivos: la transcripción, las diapositivas, las preguntas del chat, la grabación. Y porque la salida también son muchos archivos, no un mensaje." },
            { t: "prompt",
              titulo: "Despiece de un activo pilar",
              texto: "En la carpeta está el material de [ACTIVO]: transcripción, diapositivas\ny las preguntas que hizo la audiencia.\n\nPrimera fase, y para aquí:\nlista las ideas independientes que contiene, cada una en una frase, ordenadas\npor cuánto aguantan solas fuera de su contexto. No cuentes como idea lo que\nsolo se entiende habiendo visto lo anterior.\n\nSegunda fase, cuando yo elija cuáles:\nde cada idea elegida produce, aplicando la skill de marca:\n  - 1 post largo de LinkedIn\n  - 1 guion de vídeo corto de 40 segundos\n  - 2 piezas para X\n  - 1 sección de newsletter\n\nDos normas:\n\n- Las preguntas de la audiencia son la mejor materia prima que hay en esa\n  carpeta: son objeciones reales dichas en voz alta. Trátalas como fuente\n  prioritaria, no como apéndice.\n- Cada pieza tiene que sostenerse sin haber visto el original. Si necesita\n  contexto previo, no es una pieza: es un fragmento."
            },
            { t: "texto", md: "Lo de las preguntas de la audiencia no es un detalle. En un webinar, la parte grabada es lo que tú querías contar; el turno de preguntas es lo que ellos querían saber. La segunda suele rendir mejor." },
            { t: "aviso", texto: "Producir treinta piezas no es el objetivo: es la trampa. Si publicas las treinta, durante tres semanas todo tu contenido dice lo mismo con distinta ropa, y tu audiencia lo nota antes que tú. Elige entre ocho y doce, y guarda el resto para dentro de dos meses." },
            { t: "texto", md: "Ahí está el segundo beneficio, que casi nadie aprovecha: el despiece no es solo producción, es **calendario**. Un activo grande bien despiezado cubre un trimestre sin repetirse, si te aguantas las ganas de publicarlo todo la primera semana." }
          ],
          ejercicio: "Coge tu activo más largo del último año, el que costó producir y se usó una vez. Despiézalo con las dos fases. Reparte las piezas elegidas en un calendario de tres meses en vez de en dos semanas.",
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
          estado: "listo",
          bloques: [
            { t: "texto", md: "Aquí es donde la mayoría se queda a medias. Le pasan los datos de la campaña, reciben un resumen correcto de lo que ya se veía en la tabla, y concluyen que para analizar no sirve. El problema no es el análisis: es que pidieron una descripción." },
            { t: "clave", texto: "Un análisis que no termina en \"pausa esto, sube presupuesto en aquello, reescribe lo otro\" no es un análisis. Es la misma tabla contada con palabras." },
            { t: "texto", md: "Y para que pueda decidir necesita lo que no está en el CSV. Un anuncio con el peor coste por lead puede ser el que hay que escalar si trae los leads que cierran; un ROAS excelente puede ser irrelevante si ese producto no tiene stock hasta septiembre." },
            { t: "texto", md: "Lo que hay que darle además de los datos:" },
            { t: "lista", items: [
              "**El margen real** por producto o servicio. Sin eso optimiza ingresos, que no es lo mismo que optimizar beneficio.",
              "**Qué pasa después del clic.** Cuántos de esos leads cierran, y a cuánto tiempo.",
              "**Las restricciones.** Stock, capacidad de atender, estacionalidad, presupuesto comprometido.",
              "**Lo que cambió durante el periodo.** Una subida de precio, una avería en el formulario, una semana de fiestas. Sin esto, atribuye a la campaña lo que causó el calendario."
            ]},
            { t: "prompt",
              titulo: "De datos a decisiones",
              texto: "Datos de campaña de [CLIENTE], periodo [FECHAS]:\n[pega los datos]\n\nContexto que no está en los datos:\n  - Margen: [X]\n  - De cada 10 leads cierran [N], de media a [T] días\n  - Restricciones: [stock, capacidad, presupuesto ya comprometido]\n  - Cambios durante el periodo: [subidas de precio, incidencias, festivos]\n\nDame TRES bloques y nada más:\n\n1. PARAR — qué corto ya, con el dato que lo justifica y cuánto libera.\n2. ESCALAR — dónde meto ese presupuesto, con el dato que lo justifica.\n3. PROBAR — una sola hipótesis, la de mayor recorrido, con qué mediría.\n\nDos exigencias:\n\n- Cada decisión lleva el volumen sobre el que se sostiene. Si un conjunto de\n  anuncios tiene 40 clics y 1 conversión, no me digas que funciona: dime que\n  no hay datos suficientes para saberlo.\n- No me expliques lo que ya se ve en la tabla. Si una fila no lleva a una\n  decisión, no la menciones."
            },
            { t: "aviso", texto: "La exigencia del volumen es la que evita el error más caro de todos: pausar un anuncio bueno o escalar uno malo por diferencias que son ruido. Con 40 clics no se sabe nada, y un modelo al que le pides conclusiones te va a dar conclusiones igualmente, con la misma seguridad que si tuviera 40.000." },
            { t: "texto", md: "El bloque PROBAR limitado a una sola hipótesis también es deliberado. Cinco tests a la vez sobre el mismo presupuesto no son cinco aprendizajes: son cinco muestras pequeñas y ninguna conclusión." },
            { t: "texto", md: "Cuando el formato de tus datos sea siempre el mismo, este prompt es candidato a skill (lección 1.5): el contexto de negocio cambia por cliente y va en su Proyecto, pero la estructura de las tres decisiones es tuya y se repite en todos." }
          ],
          ejercicio: "Coge la última campaña que analizaste. Vuelve a analizarla con este prompt, añadiendo el margen y la tasa de cierre. Compara las decisiones que salen ahora con las que tomaste entonces: si no cambia ninguna, o ya lo hacías bien o te falta contexto por dar.",
          recursos: []
        },
        {
          id: "m5-l2",
          titulo: "Resume el rendimiento de tus anuncios",
          duracion: 10,
          plataforma: "Cowork",
          objetivo: "Producir el informe semanal de anuncios que hoy te come media mañana.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "**El montaje.** Este es el único flujo del curso que vas a repetir cada semana, así que la carpeta se monta una vez y no se vuelve a tocar:" },
            { t: "archivo", nombre: "informe-[cliente]/", texto: "informe-[cliente]/\n├── semana-actual/     ← vacías y rellenas cada lunes\n├── historico/         ← aquí se acumulan las semanas\n└── salida/" },
            { t: "texto", md: "El rito semanal son tres movimientos: mueves lo de `semana-actual/` a `historico/`, sueltas las exportaciones nuevas, y lanzas la tarea. La comparación contra la media de cuatro semanas sale de `historico/`, así que esa carpeta no se vacía nunca." },
            { t: "texto", md: "Cuando lleves tres o cuatro semanas con el formato ya cerrado, esto es candidato a **tarea programada**: corre solo y te deja el informe hecho. Antes de programarlo, léete otra vez la parte de tareas programadas de la lección 1.4 — corren sin nadie mirando, y eso cambia el cálculo." },
            { t: "texto", md: "El informe semanal de anuncios es la tarea perfecta para automatizar y la que más se resiste, porque cada semana parece más rápido hacerlo a mano que montar el sistema. Cinco meses después llevas cien horas en informes." },
            { t: "texto", md: "La diferencia con la lección anterior: aquella era un análisis puntual y profundo. Esta es **la misma salida, cada semana, sin pensar el formato**. Va en Cowork porque las exportaciones son archivos y son varios: una plataforma, o tres, más el histórico." },
            { t: "clave", texto: "Un informe recurrente no se diseña para informar. Se diseña para que quien lo recibe sepa en treinta segundos si tiene que hacer algo." },
            { t: "texto", md: "Eso descarta el formato que usa casi todo el mundo: veinte métricas en una tabla, sin jerarquía, con un párrafo de resumen debajo. Nadie lo lee entero, y quien lo lee no sabe qué hacer al terminar." },
            { t: "prompt",
              titulo: "El informe semanal, siempre igual",
              texto: "En la carpeta están las exportaciones de esta semana de [PLATAFORMAS] y\nla subcarpeta \"historico\" con las semanas anteriores.\n\nGenera el informe semanal de [CLIENTE] con esta estructura fija:\n\n1. TITULAR — una frase. Qué ha pasado esta semana.\n2. SEMÁFORO — tres líneas: presupuesto, coste por adquisición y volumen.\n   Cada una con su cifra, su variación contra la media de las 4 semanas\n   anteriores (no contra la semana pasada: una sola semana es ruido)\n   y verde, ámbar o rojo.\n3. QUÉ HA CAMBIADO — solo movimientos que salgan de la variación habitual\n   de este cliente. Si una métrica lleva meses oscilando un 15%, un 15%\n   no es una noticia.\n4. QUÉ HAGO ESTA SEMANA — máximo tres acciones, priorizadas.\n5. ANEXO — la tabla completa, para quien la quiera.\n\nNormas:\n\n- Del 1 al 4 tiene que caber en una pantalla de móvil.\n- Si una semana no pasa nada reseñable, dilo. Un informe que siempre\n  encuentra algo urgente deja de leerse al mes.\n- Mantén exactamente esta estructura todas las semanas, aunque algún\n  apartado quede corto. La gracia del informe recurrente es que se lee\n  siempre en el mismo sitio."
            },
            { t: "texto", md: "La comparación contra la media de cuatro semanas y no contra la semana anterior es lo que evita el informe histérico. Semana contra semana, todo sube y baja un 30% y todo parece urgente." },
            { t: "aviso", texto: "El permiso explícito para decir \"esta semana no ha pasado nada\" es lo que mantiene el informe vivo. Un informe que cada semana encuentra tres cosas urgentes está entrenando a tu cliente a ignorarlo, y el día que haya algo de verdad, tampoco lo va a leer." },
            { t: "texto", md: "Cuando el formato esté cerrado y hayas hecho tres o cuatro semanas sin retocarlo, conviértelo en skill. A partir de ahí el informe deja de ser una tarea del viernes: es soltar los archivos en la carpeta." }
          ],
          ejercicio: "Monta el informe de un cliente con esta estructura y mándalo tal cual. A las dos semanas pregúntale una sola cosa: qué apartado lee primero. Ese es el informe; lo demás es anexo.",
          recursos: []
        },
        {
          id: "m5-l3",
          titulo: "Analizar el rendimiento de recaudación de fondos",
          duracion: 15,
          plataforma: "Claude.ai",
          objetivo: "Aplicar el mismo análisis a captación de donantes, para cuentas de ONG y proyectos sin ánimo de lucro.",
          estado: "listo",
          bloques: [
            { t: "texto", md: "Esta lección es la misma que la 5.1 con otra economía debajo. Si trabajas solo con clientes comerciales, puedes saltártela sin perder nada del hilo. Si llevas alguna ONG, fundación o proyecto social, los números se comportan distinto y aplicar el análisis de campañas tal cual te lleva a conclusiones equivocadas." },
            { t: "texto", md: "Dónde está la diferencia:" },
            { t: "tabla",
              cabeceras: ["", "Campaña comercial", "Captación de donantes"],
              filas: [
                ["Qué se optimiza", "Beneficio por venta", "Valor del donante a lo largo de años"],
                ["Métrica que manda", "ROAS, coste por adquisición", "Coste de captación contra donación recurrente"],
                ["Cuándo se juega todo", "Repartido en el año", "Concentrado: fin de año, emergencias, la campaña grande"],
                ["Qué es un mal resultado", "Vender poco", "Captar mucho de un solo donante que no repite"],
                ["Coste de un error de tono", "Un anuncio flojo", "Daño reputacional difícil de revertir"]
              ]
            },
            { t: "clave", texto: "En captación, un donante recurrente de 10 euros al mes vale más que uno puntual de 300. Un análisis que optimiza el importe de la primera donación optimiza justo lo contrario de lo que sostiene a la organización." },
            { t: "texto", md: "De ahí sale el resto. La estacionalidad no es una nota al pie: en muchas organizaciones diciembre concentra una parte enorme del año, y comparar noviembre con diciembre no dice nada. Y las campañas de emergencia rompen cualquier serie histórica: mezclarlas con la captación ordinaria contamina las dos." },
            { t: "prompt",
              titulo: "Análisis de captación",
              texto: "Datos de captación de [ORGANIZACIÓN], periodo [FECHAS]:\n[pega los datos]\n\nContexto:\n  - Donación media recurrente: [X] al mes\n  - Permanencia media de un donante recurrente: [N] meses\n  - Coste de captación actual: [Y]\n  - Campañas de emergencia dentro del periodo: [cuáles y cuándo]\n\nAnaliza así:\n\n1. Separa captación ordinaria de campañas de emergencia y analízalas aparte.\n   Mezclarlas hace que las dos parezcan otra cosa.\n2. Compara cada canal por valor del donante a lo largo de su permanencia,\n   no por importe de la primera donación.\n3. Compara contra el mismo periodo del año anterior, no contra el periodo\n   inmediatamente anterior. La estacionalidad aquí manda sobre la tendencia.\n4. Cierra con tres decisiones: qué paro, dónde escalo, qué pruebo.\n\nSeñala si algún canal capta bien de una vez pero mal en recurrencia:\nes el hallazgo que más dinero mueve y el que menos se busca."
            },
            { t: "texto", md: "El punto 2 es toda la lección. Un canal con coste de captación alto que trae donantes que se quedan cuatro años bate a un canal barato que trae donaciones únicas — y en un informe hecho al modo comercial, el segundo sale ganando siempre." },
            { t: "aviso", texto: "Sobre el tono, y va más allá del análisis: en este sector las técnicas de presión que en comercial son agresivas aquí son directamente dañinas. Culpabilizar, exagerar una emergencia o usar imágenes que quitan dignidad a las personas retratadas capta una vez y quema la relación. Ponlo por escrito en la skill de marca de la organización, en la sección de prohibiciones." },
            { t: "texto", md: "Lo demás es igual que la 5.1: contexto que no está en los datos, exigencia de volumen antes de concluir, y un análisis que termina en decisiones y no en descripciones." }
          ],
          ejercicio: "Si llevas alguna organización sin ánimo de lucro, analiza su último año separando ordinaria de emergencias y midiendo por permanencia. Si no llevas ninguna, salta a la lección siguiente: esta no te aporta.",
          recursos: []
        }
      ]
    }

  ]
};

/* ---------------------------------------------------------------------------
   Glosario. Aparece en su propia vista y se busca desde ahí.
   ------------------------------------------------------------------------- */
const GLOSARIO = [
  { t: "Activo pilar", d: "Una pieza grande —webinar, informe, entrevista— de la que se derivan muchas piezas pequeñas. Ver lección 4.2.", m: "Producción" },
  { t: "Brief", d: "El documento que fija objetivo, métrica, público y límites de una campaña. Está terminado cuando alguien que no estuvo en la reunión puede ejecutarlo.", m: "Estrategia" },
  { t: "Contexto", d: "Todo lo que Claude tiene delante al responder: tu mensaje, la conversación previa y los archivos adjuntos. La calidad de la salida depende de esto más que de cómo formules la orden.", m: "Fundamentos" },
  { t: "Cowork", d: "La superficie de Claude que trabaja sobre carpetas de archivos en vez de sobre una conversación. Requiere plan de pago y, para archivos locales, la app de escritorio abierta.", m: "Superficies" },
  { t: "CPA", d: "Coste por adquisición: lo que cuesta conseguir un cliente. En captación de donantes se compara contra la permanencia, no contra la primera donación.", m: "Medición" },
  { t: "Inyección de prompts", d: "Instrucciones escondidas en contenido que Claude lee —una web, un PDF de un tercero— escritas para que las obedezca como si vinieran de ti. El riesgo aparece cuando además puede actuar sobre tus archivos.", m: "Seguridad" },
  { t: "Modo de permiso", d: "En Cowork, cuánto pregunta antes de actuar: Manual (cada acción), Auto (aprueba lo que pasa su revisión) o Skip (no pregunta). Manual siempre que haya material de cliente.", m: "Seguridad" },
  { t: "Perfil de cliente", d: "Descripción accionable de a quién le vendes, construida desde datos reales —reseñas, llamadas, bajas— y no desde suposiciones. Ver lección 2.1.", m: "Estrategia" },
  { t: "Prompt", d: "La instrucción que le das. Un buen prompt tiene seis piezas: rol, contexto, tarea, formato, restricciones y ejemplos. Ver lección 1.2.", m: "Fundamentos" },
  { t: "Proyecto", d: "Un espacio de Claude con instrucciones y archivos fijos, para un cliente o una marca concretos. Lo que caduca va aquí, no en una skill.", m: "Superficies" },
  { t: "ROAS", d: "Retorno sobre la inversión publicitaria. Optimizar ROAS no es lo mismo que optimizar beneficio: sin el margen por producto, se optimiza el ingreso equivocado.", m: "Medición" },
  { t: "Skill", d: "Un método tuyo empaquetado en una carpeta con un SKILL.md, que Claude activa sola cuando toca. Para criterios que repites en varios clientes. Ver lección 1.5.", m: "Superficies" },
  { t: "SKILL.md", d: "El archivo de una skill: una cabecera con name y description, y debajo las instrucciones en texto normal. La description decide si la skill llega a activarse.", m: "Superficies" },
  { t: "Sistema verbal", d: "Cómo suena una marca por escrito: tono, vocabulario y prohibiciones. Es el activo de marca que más se usa y el que menos se documenta.", m: "Marca" },
  { t: "Tarea programada", d: "Un trabajo de Cowork que corre solo, en la nube, sin nadie mirando. Empieza por cosas simples y revisa sus resultados.", m: "Seguridad" },
  { t: "Ventana de contexto", d: "El límite de cuánto cabe en una conversación. Es amplia pero no infinita: todo lo que metes compite por atención, así que pegar de más diluye.", m: "Fundamentos" }
];
