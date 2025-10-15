#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#define NUM_PALABRAS 100
#define LONGITUD_PALABRA 10
int main()
{
    srand(time(NULL));
    int posPalabra;
    char diccionario[NUM_PALABRAS][LONGITUD_PALABRA] = {
        "agua", "amor", "animal", "arbol", "barco",
        "bebe", "bella", "blanco", "cielo", "cama",
        "casa", "coche", "comida", "corazon", "cuadro",
        "dia", "diente", "dinero", "doctora", "dulce",
        "edad", "elefante", "espejo", "estrella", "familia",
        "fuego", "fuerte", "gato", "gente", "grande",
        "hablar", "hombre", "hoja", "hora", "huevo",
        "idea", "iglesia", "imagen", "invierno", "jardin",
        "juego", "jirafa", "joven", "lago", "leche",
        "libro", "limon", "lindo", "luz", "mano",
        "mar", "madre", "mesa", "metro", "miedo",
        "mujer", "mundo", "nieve", "nina", "nino",
        "noche", "nombre", "nube", "ojo", "ola",
        "oro", "oso", "padre", "pajaro", "palabra",
        "pan", "papel", "pared", "pelota", "pez",
        "piedra", "piel", "planta", "playa", "puerta",
        "queso", "quinto", "radio", "raton", "reina",
        "rey", "ropa", "rosa", "silla", "sol",
        "sonrisa", "suelo", "tabla", "taza", "tigre",
        "tiempo", "tierra", "tren", "uva", "vaca"
    };
    int j = 0;
    while (j < 10)
    {
        posPalabra = rand() % NUM_PALABRAS;

        for (int i = 0; i < strlen(diccionario[posPalabra]); i++)
        {
            printf("%c", diccionario[posPalabra][i]);
        }
        printf("\n");
        j++;
    }


}