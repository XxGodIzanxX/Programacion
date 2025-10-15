#include <stdio.h>

// Función que devuelve un número según el rango
int obtenerRango(int poder) {
    if (poder >= 1000) {
        return 5; // Rango S
    }
    else if (poder >= 700) {
        return 4; // Rango A
    }
    else if (poder >= 400) {
        return 3; // Rango B
    }
    else if (poder >= 200) {
        return 2; // Rango C
    }
    else {
        return 1; // Rango D
    }
}

int main() {
    int poder, rango;

    printf("Introduce el nivel de poder del héroe: ");
    scanf_s("%d", &poder);

    rango = obtenerRango(poder);

    if (rango == 5) {
        printf("El héroe tiene un Rango S\n");
    }
    else if (rango == 4) {
        printf("El héroe tiene un Rango A\n");
    }
    else if (rango == 3) {
        printf("El héroe tiene un Rango B\n");
    }
    else if (rango == 2) {
        printf("El héroe tiene un Rango C\n");
    }
    else {
        printf("El héroe tiene un Rango D\n");
    }

    return 0;
}