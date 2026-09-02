/* ============================================================================
   CONTENIDO DEL CURSO — este es el único archivo que hay que tocar para
   añadir o cambiar material. El index.html no se toca para meter contenido.

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
  subtitulo: "Del prompt suelto al sistema que produce",
  autor: "Izan Gutiérrez · Ryu Ads",
  version: "0.1",

  modulos: [

    /* ---------------------------------------------------------------- M1 */
    {
      id: "m1",
      titulo: "Fundamentos",
      resumen: "Qué es Claude realmente, qué no es, y por qué eso decide la calidad de todo lo que salga después.",
      lecciones: [
        {
          id: "m1-l1",
          titulo: "Cómo piensa Claude",
          duracion: 9,
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
          titulo: "Claude, ChatGPT y Gemini: cuándo usar cuál",
          duracion: 7,
          objetivo: "Elegir herramienta por criterio y no por costumbre.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m1-l3",
          titulo: "La interfaz: Proyectos, Artifacts y Skills",
          duracion: 10,
          objetivo: "Conocer las tres piezas que convierten a Claude de chat en herramienta de trabajo.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m1-l4",
          titulo: "Qué NO delegar en la IA",
          duracion: 6,
          objetivo: "Marcar la frontera antes de automatizar, no después del susto.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        }
      ]
    },

    /* ---------------------------------------------------------------- M2 */
    {
      id: "m2",
      titulo: "Prompting aplicado",
      resumen: "La estructura repetible que hay debajo de todo prompt que funciona, y cómo dejar de improvisarla cada vez.",
      lecciones: [
        {
          id: "m2-l1",
          titulo: "El esqueleto de un prompt que funciona",
          duracion: 12,
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
          id: "m2-l2",
          titulo: "Iterar sin empezar de cero",
          duracion: 8,
          objetivo: "Corregir una salida mala en dos mensajes en lugar de en quince.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m2-l3",
          titulo: "Darle tu voz de marca",
          duracion: 11,
          objetivo: "Construir un documento de voz que se pega una vez y sirve todo el año.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m2-l4",
          titulo: "Errores que arruinan un prompt",
          duracion: 7,
          objetivo: "Reconocer los cinco fallos que explican el 80% de los malos resultados.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        }
      ]
    },

    /* ---------------------------------------------------------------- M3 */
    {
      id: "m3",
      titulo: "Copy y contenido",
      resumen: "Anuncios, emails, landings y redes. La parte que todo el mundo espera de un curso de IA, hecha bien.",
      lecciones: [
        { id:"m3-l1", titulo:"Anuncios: Meta, Google y YouTube", duracion:14, objetivo:"Producir variantes de anuncio que se puedan testear, no una sola opción.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m3-l2", titulo:"Email marketing y secuencias", duracion:12, objetivo:"Montar una secuencia completa partiendo del problema del cliente.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m3-l3", titulo:"Landing pages que convierten", duracion:13, objetivo:"Escribir la estructura de una landing antes que su texto.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m3-l4", titulo:"Contenido para redes sin sonar a IA", duracion:11, objetivo:"Detectar y eliminar los tics que delatan un texto generado.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m3-l5", titulo:"Guiones para vídeo corto", duracion:9, objetivo:"Pasar de idea a guion grabable en un solo paso.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] }
      ]
    },

    /* ---------------------------------------------------------------- M4 */
    {
      id: "m4",
      titulo: "Estrategia y análisis",
      resumen: "Donde la IA deja de ser un redactor barato y empieza a ser un analista que no se cansa.",
      lecciones: [
        { id:"m4-l1", titulo:"Investigación de cliente y buyer persona", duracion:12, objetivo:"Construir un perfil de cliente a partir de datos reales, no de suposiciones.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m4-l2", titulo:"Análisis de competencia", duracion:10, objetivo:"Extraer el posicionamiento de un competidor a partir de su web y sus anuncios.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m4-l3", titulo:"Auditoría de una cuenta publicitaria", duracion:15, objetivo:"Pasarle datos de campaña y sacar decisiones, no descripciones.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m4-l4", titulo:"SEO: keywords, clusters y briefs", duracion:14, objetivo:"Montar un plan de contenidos SEO defendible ante un cliente.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] }
      ]
    },

    /* ---------------------------------------------------------------- M5 */
    {
      id: "m5",
      titulo: "Automatización",
      resumen: "Dejar de repetir el mismo prompt. Proyectos, Skills y flujos que trabajan solos.",
      lecciones: [
        { id:"m5-l1", titulo:"Proyectos: memoria permanente de cliente", duracion:10, objetivo:"Montar un Proyecto por cliente para no volver a pegar el contexto.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m5-l2", titulo:"Skills: convertir tu método en una herramienta", duracion:16, objetivo:"Empaquetar un proceso propio para que Claude lo ejecute igual siempre.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m5-l3", titulo:"Conectar Claude con tus datos", duracion:12, objetivo:"Entender qué son los conectores y qué se puede enchufar.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m5-l4", titulo:"Flujos de trabajo de agencia", duracion:13, objetivo:"Diseñar un flujo de entrega completo con IA dentro.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] }
      ]
    },

    /* ---------------------------------------------------------------- M6 */
    {
      id: "m6",
      titulo: "Casos reales",
      resumen: "Flujos completos de principio a fin. Aquí no se enseña una técnica: se entrega un trabajo.",
      lecciones: [
        { id:"m6-l1", titulo:"De brief a campaña completa", duracion:20, objetivo:"Recorrer una campaña entera aplicando todo lo anterior.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m6-l2", titulo:"Auditoría de cliente nuevo en 40 minutos", duracion:18, objetivo:"Preparar una propuesta comercial a partir de una web fría.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] },
        { id:"m6-l3", titulo:"Un mes de contenido en una tarde", duracion:16, objetivo:"Producir y calendarizar un mes de piezas sin que se note el molde.", estado:"pendiente", bloques:[], ejercicio:"", recursos:[] }
      ]
    }

  ]
};
