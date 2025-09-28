#include <stdio.h>

int main() {
    int num, i, esPrimo = 1;

    printf("Introduce un numero: ");
    scanf_s("%d", &num);

    if (num <= 1) {
        esPrimo = 0;
    }
    else {
        for (i = 2; i <= num / 2; i++) {
            if (num % i == 0) {
                esPrimo = 0;
                break;
            }
        }
    }

    if (esPrimo) {
        printf("El numero es primo\n");
    }
    else {
        printf("El numero no es primo\n");
    }
}