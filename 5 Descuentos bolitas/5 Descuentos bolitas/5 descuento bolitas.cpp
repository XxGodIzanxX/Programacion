#include <stdio.h>

int main() {
    float total, final;
    int bolita;

    printf("Ingrese el valor total de la compra: ");
    scanf_s("%f", &total);

    printf("Ingrese el color de la bolita (1=blanco, 2=negro, 3=azul): ");
    scanf_s("%d", &bolita);

    switch (bolita) {
    case 1: // Blanco
        final = total;
        break;
    case 2: // Negro
        final = total * 0.5; // 50% de descuento
        break;
    case 3: // Azul
        final = total * 0.75; // 25% de descuento
        break;
    default:
        printf("Color de bolita no valido.\n");
        return 1;
    }

    printf("El cliente debe pagar: %.2f €\n", final);

}