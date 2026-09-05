#!/usr/bin/env python3
"""Emite la copia personalizada de un comprador.

    python3 emitir.py "Marta Ruiz"
    python3 emitir.py "Marta Ruiz" marta@sucorreo.com

Deja en `emitidas/` un único archivo HTML con el nombre del comprador dentro:
en la portada, en el pie de cada página y en los metadatos. Se abre con doble
clic, sin servidor y sin conexión.

Qué es y qué no es. Personalizar una copia NO la protege: quien la reciba puede
abrirla igual. Lo que hace es poner el nombre de quien la compró encima, y eso
frena el reenvío por vergüenza, no por criptografía. Es fricción social. Si
alguien quiere quitar su nombre, lo quita en dos minutos con un editor de texto.
"""
import pathlib, re, sys, unicodedata
from datetime import date

def sanear(nombre):
    """Nombre de archivo sin acentos ni sorpresas."""
    base = unicodedata.normalize("NFKD", nombre).encode("ascii", "ignore").decode()
    base = re.sub(r"[^A-Za-z0-9]+", "-", base).strip("-").lower()
    return base or "copia"

def js(cadena):
    """Escapa una cadena para meterla dentro de comillas dobles en JavaScript."""
    return (cadena.replace("\\", "\\\\").replace('"', '\\"')
                  .replace("\n", " ").replace("\r", " "))

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 1

    nombre = sys.argv[1].strip()
    email  = sys.argv[2].strip() if len(sys.argv) > 2 else ""
    if not nombre:
        print("Hace falta un nombre.")
        return 1

    aqui  = pathlib.Path(__file__).parent
    html  = (aqui / "index.html").read_text(encoding="utf-8")
    datos = (aqui / "contenido.js").read_text(encoding="utf-8")
    conf  = (aqui / "config.js").read_text(encoding="utf-8")

    hoy = date.today().isoformat()
    conf, n = re.subn(
        r'licencia:\s*\{[^}]*\}',
        'licencia: { nombre: "%s", email: "%s", emitida: "%s" }' % (js(nombre), js(email), hoy),
        conf, count=1)
    if not n:
        print("No se ha encontrado el bloque `licencia` en config.js.")
        return 1

    salida = (html
        .replace('<script src="config.js"></script>',   "<script>\n" + conf  + "\n</script>")
        .replace('<script src="contenido.js"></script>', "<script>\n" + datos + "\n</script>"))

    dest = aqui / "emitidas"
    dest.mkdir(exist_ok=True)
    archivo = dest / ("curso-claude-marketing-%s.html" % sanear(nombre))
    archivo.write_text(salida, encoding="utf-8")

    print("Emitida para %s%s" % (nombre, (" <%s>" % email) if email else ""))
    print("  %s" % archivo)
    print("  %d KB — se abre con doble clic, sin servidor" % (archivo.stat().st_size // 1024))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
