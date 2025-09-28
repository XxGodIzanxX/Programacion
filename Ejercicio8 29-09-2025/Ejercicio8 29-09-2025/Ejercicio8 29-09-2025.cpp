#include <stdio.h>

int main() {
    int clave = 1234;
    int intento, i;
    int abierto = 0;

    for (i = 0; i < 4; i++) {
        printf("Introduce la combinacion de 4 cifras: ");
        scanf_s("%d", &intento);

        if (intento == clave) {
            printf("La caja fuerte se ha abierto satisfactoriamente\n");
            abierto = 1;
            break;
        }
        else {
            printf("Lo siento, esa no es la combinacion\n");
        }
    }

    if (!abierto) {
        printf("Has agotado todos los intentos.\n");
    }
}