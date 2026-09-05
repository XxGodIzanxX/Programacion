# Publicar el curso con acceso real

El curso funciona de dos maneras con **el mismo código**. Lo que decide cuál es
`config.js`:

| | `config.js` vacío | `config.js` relleno |
|---|---|---|
| Modo | Local | Nube |
| Registro e inicio de sesión | De cortesía | **Reales** |
| Dónde vive el avance | En el navegador de cada uno | En tu base de datos |
| Entre dispositivos | No viaja | Viaja |
| ¿Protege el contenido? | **No** | Sí |
| Coste | 0 | 0 hasta cierto volumen |

Mientras esté vacío, el curso se puede abrir con doble clic sobre `index.html`
y funciona entero. Todo lo de abajo es para cerrar el acceso de verdad.

---

## Por qué el acceso no puede ser real dentro de un Artifact

Conviene entenderlo antes de empezar, porque explica por qué hay que mover la
web a otro sitio:

- El visor de artifacts **bloquea todas las peticiones de red salientes**. No se
  puede hablar con ninguna base de datos, así que no hay dónde comprobar una
  contraseña.
- La página **no sabe quién la está viendo**. No hay identidad que consultar.

Cualquier "login" dentro de esas dos restricciones vive entero en el JavaScript
que el visitante ya tiene descargado. Se salta con clic derecho, ver código.
Sirve para la experiencia; no sirve para cobrar.

---

## Paso 1 — La base de datos (Supabase)

1. Crea una cuenta en [supabase.com](https://supabase.com) y un proyecto nuevo.
   El plan gratuito sobra para empezar.
2. En el panel, **SQL Editor** → pega entero el contenido de
   `supabase/esquema.sql` y ejecútalo. Crea las tres tablas (perfiles,
   progreso, notas), el disparador que crea el perfil al registrarse, y las
   políticas de seguridad.
3. En **Project Settings → API** copia dos valores:
   - *Project URL*
   - *anon public key*

Sobre esa clave: **es pública por diseño**, va en el navegador y no da acceso a
nada por sí sola. Lo que protege los datos son las políticas RLS del esquema,
que hacen que cada usuario solo pueda leer y escribir sus propias filas aunque
manipule el JavaScript. La otra clave que verás ahí, la `service_role`, **no se
pone nunca en el navegador**: esa sí se salta todas las políticas.

## Paso 2 — Rellenar `config.js`

```js
const CONFIG = {
  supabaseUrl: "https://xxxxxxxx.supabase.co",
  supabaseAnonKey: "eyJhbGci...",
  accesoCerrado: true      // false = se puede leer sin cuenta
};
```

Con eso, al recargar la web ya pide cuenta.

## Paso 3 — Subirlo

Cualquier hosting de estáticos vale. No hay que compilar nada: son cuatro
archivos y una carpeta.

**Vercel o Netlify**, arrastrando la carpeta o conectando el repositorio.
Directorio raíz el del curso, sin comando de build.

**Cloudflare Pages**, igual.

Lo que sube: `index.html`, `contenido.js`, `config.js`, y `supabase/` (que no
hace falta pero tampoco molesta). La carpeta `dist/` no se sube: es solo para
el archivo único.

## Paso 4 — Ajustes de Supabase antes de vender nada

En **Authentication → URL Configuration**, pon tu dominio real en *Site URL* y
en *Redirect URLs*. Si no, los correos de confirmación apuntan a `localhost`.

En **Authentication → Providers → Email** decide si exiges confirmar el correo.
Con confirmación activada, quien se registra no entra hasta pinchar el enlace;
sin ella entra directo. Para un curso de pago, actívala.

---

## Cómo das de alta a quien compra

El código de ahora deja que cualquiera se registre solo. Para un curso de pago
hay dos caminos, de menos a más trabajo:

1. **Registro abierto y control por fuera.** Vendes, y quien no ha pagado no
   sabe que la web existe. Suficiente para vender a poca gente y de uno en uno.
2. **Alta manual.** Desactivas el registro público en Supabase
   (*Authentication → Providers → Email → Enable signups*, apagado) y das de
   alta tú a cada comprador desde el panel. Es lo más sólido sin escribir
   backend, y para volúmenes de decenas es perfectamente llevable.
3. **Pasarela de pago.** Stripe con un webhook que crea el usuario al cobrar.
   Requiere una función de servidor, y ya es otro proyecto.

Empieza por la 2. Cuando dar altas a mano te moleste, es que estás vendiendo lo
suficiente como para que merezca la pena la 3.

---

## Qué pasa si Supabase se cae

La app intenta cargar el progreso de la nube y, si falla, **cae al modo local**
sin romperse: el alumno sigue leyendo el curso y su avance se guarda en el
navegador. No se sincroniza hasta que el servicio vuelva.
