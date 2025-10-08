#include <stdio.h>

int main() {
    //Ejercicio 1
    /*
    int v1[20];
    int suma = 0, mayor, pos_mayor;
    printf("Ingrese 20 numeros enteros:\n");
    for (int i = 0; i < 20; i++) {
        printf("Elemento [%d]: ", i);
        scanf_s("%d", &v1[i]);
        suma += v1[i];
    }
    mayor = v1[0];
    pos_mayor = 0;
    for (int i = 1; i < 20; i++) {
        if (v1[i] > mayor) {
            mayor = v1[i];
            pos_mayor = i;
        }
    }
    printf("\nSuma de todos los valores: %d", suma);
    printf("\nEl mayor valor es %d y se encuentra en la posicion %d\n", mayor, pos_mayor);
    */

	//Ejercicio 2
    /*
        int v1[12], v2[12], v3[12];

        printf("Ingrese 12 numeros enteros:\n");
        for (int i = 0; i < 12; i++) {
            scanf_s("%d", &v1[i]);
        }

        for (int i = 0; i < 12; i++) {
            v2[i] = v1[11 - i];
            v3[i] = (v1[i] > 5) ? -1 : v1[i];
        }

        printf("\nVector1: ");
        for (int i = 0; i < 12; i++)
        {
            printf("%d ", v1[i]);
        }

        printf("\nVector2 (inverso): ");
        for (int i = 0; i < 12; i++) {
            printf("%d ", v2[i]);
        }

        printf("\nVector3 (modificado): ");
        for (int i = 0; i < 12; i++)
        {
            printf("%d ", v3[i]);
        }
        */
	//Ejercicio 3
    /*
    int v1[3], v2[3], producto = 0;

    printf("Ingrese 3 elementos para el vector 1:\n");
    for (int i = 0; i < 3; i++)
    {
        scanf_s("%d", &v1[i]);
    }

    printf("Ingrese 3 elementos para el vector 2:\n");
    for (int i = 0; i < 3; i++)
    {
        scanf_s("%d", &v2[i]);
    }

    for (int i = 0; i < 3; i++)
    {
        producto += v1[i] * v2[i];
        printf("Producto escalar: %d\n", producto);
    }
    */

	//Ejercicio 4
    /*
    int v1[10], v2[10], v3[10];
    int i;

    printf("Ingrese 10 numeros para el vector v1:\n");
    for (i = 0; i < 10; i++) {
        printf("v1[%d]: ", i);
        scanf_s("%d", &v1[i]);
    }
    printf("\nIngrese 10 numeros para el vector v2:\n");
    for (i = 0; i < 10; i++) {
        printf("v2[%d]: ", i);
        scanf_s("%d", &v2[i]);
    }
    for (i = 0; i < 10; i++) {
        if (v1[i] > v2[i]) {
            v3[i] = v1[i] + v2[i];
        }
        if (v1[i] <= v2[i]) {
            v3[i] = v1[i] - v2[i];
        }
    }
    printf("\nContenido del vector v3:\n");
    for (i = 0; i < 10; i++) {
        printf("v3[%d] = %d\n", i, v3[i]);
    }
   */

//Ejercicio 5
/*
int v1[6], mayor, menor;

printf("Ingrese 5 numeros enteros:\n");
for (int i = 0; i < 5; i++) 
{
    scanf_s("%d", &v1[i]);
}
mayor = menor = v1[0];
for (int i = 1; i < 5; i++) 
{
    if (v1[i] > mayor) 
    {
    mayor = v1[i];
    }
    if (v1[i] < menor)
    {
        menor = v1[i];
    }
}

v1[5] = mayor + menor;

printf("Menor: %d\nMayor: %d\n", menor, mayor);
printf("Vector final:\n");
for (int i = 0; i < 6; i++)
{ 
    printf("%d ", v1[i]);
}
*/

//Ejercicio 6
/*
int v1[4], i, numero;
for (i = 0; i < 4; i++) {
    printf("v1[%d]: ", i);
    scanf_s("%d", &numero);
    if (numero > 10) {
        v1[i] = numero * 2;
    }
    if (numero <= 10) {
        v1[i] = numero;
    }
}
for (i = 0; i < 4; i++) {
    printf("v1[%d] = %d\n", i, v1[i]);
}
*/

//Ejercicio 7
/*
int v1[6], i, temp, pares = 0;
for (i = 0; i < 6; i++) {
    printf("v1[%d]: ", i);
    scanf_s("%d", &v1[i]);
}
for (i = 0; i < 3; i++) {
    temp = v1[i];
    v1[i] = v1[5 - i];
    v1[5 - i] = temp;
}
for (i = 0; i < 6; i++) {
    printf("v1[%d] = %d\n", i, v1[i]);
    if (v1[i] % 2 == 0) {
        pares++;
    }
}
printf("Cantidad de pares: %d\n", pares);
*/

}