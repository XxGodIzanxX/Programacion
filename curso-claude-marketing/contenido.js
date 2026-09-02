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
      resumen: "Los cuatro conceptos sin los que cualquiera de los 12 casos de uso sale mediocre. Es el módulo más corto y el que más rendimiento da.",
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
      resumen: "De tener un manual de marca en un PDF que nadie abre, a tener una marca que Claude aplica sola en cada pieza. Es el módulo con más recorrido del curso.",
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
          titulo: "Empaqueta tus guías de marca en una skill",
          duracion: 20,
          plataforma: "Claude.ai",
          objetivo: "Convertir el manual de marca en una herramienta que Claude aplica igual siempre, sin que nadie se la recuerde.",
          estado: "pendiente",
          bloques: [],
          ejercicio: "",
          recursos: []
        },
        {
          id: "m3-l3",
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
          id: "m3-l4",
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
