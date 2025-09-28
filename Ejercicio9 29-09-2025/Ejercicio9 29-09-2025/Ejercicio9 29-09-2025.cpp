#include <stdio.h>

int main() {
    int num, contador = 0;

    printf("Introduce un numero: ");
    scanf_s("%d", &num);

    if (num == 0) {
        contador = 1;
    }
    else {
        if (num < 0) num = -num; // ignorar el signo
        while (num > 0) {
            num /= 10;
            contador++;
        }
    }

    printf("El numero tiene %d digitos\n", contador);
}