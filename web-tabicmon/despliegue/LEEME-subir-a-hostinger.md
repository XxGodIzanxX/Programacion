# Subir la maqueta a pruebas.ryuads.com

Guía para Hostinger (hPanel). Unos 15 minutos la primera vez.

---

## 1. Localizar la carpeta del sitio

`pruebas.ryuads.com` **ya existe** como sitio propio en la cuenta: aparece en la lista
de dominios del panel. No hay que crear ningún subdominio.

hPanel → **Sitios web** → `pruebas.ryuads.com` → **Administrador de archivos**.
Entra hasta el `public_html` de ESE sitio, normalmente
`domains/pruebas.ryuads.com/public_html/`.

**Escribe bien el nombre al probarlo en el navegador.** Es `pruebas`, en plural.
Un nombre que no está configurado en el servidor no da "no encontrado": llega igual
a la máquina y responde **403 Forbidden**, que despista mucho.

---

## 2. Activar el SSL

hPanel → **Seguridad → SSL** → elegir `pruebas.ryuads.com` → instalar el certificado gratuito.

Sin esto el navegador marca la página como "No segura", que es lo peor
que puede pasar al enseñarle una demo a un cliente.

---

## 3. Subir los archivos

hPanel → **Archivos → Administrador de archivos** → entrar en la carpeta del sitio localizada en el paso 1.

| Archivo | De dónde sale | Nombre en el servidor |
|---|---|---|
| `index.html` | `web-tabicmon/index.html` | `index.html` |
| `enviar.php` | `web-tabicmon/enviar.php` | `enviar.php` |
| `robots-subdominio-pruebas.txt` | esta carpeta | **`robots.txt`** |
| `htaccess-subdominio-pruebas.txt` | esta carpeta | **`.htaccess`** (con el punto) |

Los dos últimos hay que **renombrarlos** después de subirlos.
Para ver el `.htaccess`, activa "mostrar archivos ocultos" en el menú del administrador.

**No subas `tabicmon-demo-autocontenida.html`.** Esa versión lleva la librería 3D
incrustada y pesa 675 KB; sirve para enviar por correo, no para publicar.
La `index.html` pesa 90 KB y carga la librería desde un CDN, que va más rápido.

---

## 4. Ajustar el correo del formulario

Abre `enviar.php` en el editor del administrador de archivos y cambia las dos
primeras constantes. En pruebas el correo sale de **tu** dominio, no del cliente:

```php
const DESTINATARIO = 'tu-correo@ryuads.com';   // donde quieres recibir la prueba
const REMITENTE    = 'web@ryuads.com';         // cuenta que EXISTE en ryuads.com
```

Crea `web@ryuads.com` en hPanel → **Correos electrónicos** si no existe.

**Por qué importa:** si envías poniendo como remitente una dirección de un dominio
que no es el del servidor, SPF y DMARC lo marcan como falsificación y el mensaje
acaba en spam o se rechaza. Es el motivo número uno de "el formulario no funciona".

Cuando esto pase al dominio del cliente, se vuelven a poner las de `tabicmon.com`.

---

## 5. Comprobar

Abre `https://pruebas.ryuads.com` y repasa:

- [ ] Sale el despiece 3D girando en la cabecera
- [ ] Las etiquetas de las capas apuntan a su material
- [ ] El carrusel de tipologías gira solo y responde a las flechas
- [ ] Las placas del techo se levantan al pasar el cursor
- [ ] En el móvil va fluido y nada se sale
- [ ] El formulario: rellenar, marcar el consentimiento, enviar
- [ ] Llega el correo. **Mira también en spam la primera vez**
- [ ] Responder al correo escribe al visitante, no a ti mismo

---

## 6. Antes de enseñárselo al cliente

- Quita del pie la línea que dice que es una maqueta de Ryu Ads, si vas a
  presentarla tú explicando qué es.
- Los enlaces de política de privacidad y de cookies apuntan a `#`.
  Antes de publicar en el dominio del cliente hay que crear esas páginas:
  la LSSI y el RGPD las exigen.
- Las fotos de obra siguen pendientes. La sección de proyectos lo dice.

---

## Si algo no va

| Síntoma | Causa casi segura |
|---|---|
| **403, acceso denegado** | El nombre del navegador no coincide con el del panel (`pruebas`, en plural), o falta `index.html` en la carpeta del sitio: con `Options -Indexes` el servidor responde 403 en vez de listar. |
| "No se puede acceder al sitio" | El DNS aún no ha propagado. Espera. |
| Sale el listado de archivos | Falta `index.html` o está mal escrito el nombre. |
| Se ve la web pero sin 3D | El navegador no da contexto WebGL: sale el despiece de respaldo en CSS. Normal en equipos muy viejos. |
| El formulario descarga un archivo | El servidor no está ejecutando PHP. Revisa que la versión de PHP del sitio sea 8.1 o superior. |
| El formulario abre el correo del visitante | No encuentra `enviar.php`. Comprueba que está en la misma carpeta que `index.html`. |
| El correo no llega | Remitente de un dominio distinto al del servidor, o falta la cuenta. Vuelve al paso 4. |
