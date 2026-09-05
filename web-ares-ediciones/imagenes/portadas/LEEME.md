# Portadas de los libros

Deja aquí las imágenes de las portadas y luego pon su ruta en
`datos/libros.js`, en el campo `portada` de cada libro:

```js
portada: "imagenes/portadas/el-nombre-del-archivo.jpg",
```

## Cómo tienen que ser

| Cosa        | Recomendación                                             |
|-------------|-----------------------------------------------------------|
| Proporción  | **2:3** (es la proporción del libro 3D). Ej. 1200 × 1800  |
| Formato     | `.jpg` para fotos/ilustración, `.webp` si puedes          |
| Peso        | Por debajo de **250 KB** cada una                          |
| Nombre      | Sin espacios ni acentos: `sangre-de-marte.jpg`             |

Si la portada no es 2:3, la imagen se recorta por el centro (`object-fit: cover`),
así que no pongas texto pegado a los bordes.

## Si todavía no tienes la portada

Deja `portada: ""` y la web genera una portada tipográfica con los colores de
marca, el título y el autor. Queda digna, pero no sustituye a una portada real:
en Amazon la portada es el 80% de la decisión de compra.
