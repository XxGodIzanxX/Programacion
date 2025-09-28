#include <stdio.h>

int main() {
    int clave = 1234; // combinación predefinida
    int intento;

    printf("Introduce la combinacion de 4 cifras: ");
    scanf_s("%d", &intento);

    if (intento == clave) {
        printf("La caja fuerte se ha abierto satisfactoriamente\n");
    }
    else {
        printf("Lo siento, esa no es la combinacion\n");
    }
}