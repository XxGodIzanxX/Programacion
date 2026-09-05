#!/usr/bin/env python3
"""Genera dist/curso.html: un único archivo con el contenido incrustado.

  - dist/curso.html          -> página completa, se abre con doble clic
  - dist/curso-artifact.html -> lo mismo sin <html>/<head>/<body>, para publicar
                                como Artifact (el servicio pone esa envoltura)

Uso:  python3 construir.py
"""
import pathlib, re

aqui = pathlib.Path(__file__).parent
html = (aqui / "index.html").read_text(encoding="utf-8")
datos = (aqui / "contenido.js").read_text(encoding="utf-8")
conf = (aqui / "config.js").read_text(encoding="utf-8")

unido = html.replace(
    '<script src="config.js"></script>',
    "<script>\n" + conf + "\n</script>",
).replace(
    '<script src="contenido.js"></script>',
    "<script>\n" + datos + "\n</script>",
)

dist = aqui / "dist"
dist.mkdir(exist_ok=True)
(dist / "curso.html").write_text(unido, encoding="utf-8")

# Versión para Artifact: se quitan doctype/html/head/body, se queda el interior.
cuerpo = unido
cuerpo = re.sub(r"(?is)^.*?<head[^>]*>", "", cuerpo, count=1)
cuerpo = cuerpo.replace("</head>", "", 1)
cuerpo = re.sub(r"(?is)<body[^>]*>", "", cuerpo, count=1)
cuerpo = cuerpo.replace("</body>", "").replace("</html>", "")
(dist / "curso-artifact.html").write_text(cuerpo.strip() + "\n", encoding="utf-8")

print("dist/curso.html          %6d bytes" % len((dist / "curso.html").read_bytes()))
print("dist/curso-artifact.html %6d bytes" % len((dist / "curso-artifact.html").read_bytes()))
