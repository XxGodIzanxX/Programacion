#include <stdio.h>


int main() {
    /* int arr[5] = {1, 2, 3, 4, 5};
    int suma = 0;

    for (int i = 0; i < 5; i++) {
        suma += arr[i];
        
    }
	printf("La suma es: %d\n", suma);
    
    /*
    int arr[5] = { 3, 5, 7, 2, 8 };

	int max = arr[0];
	int min = arr[0];

    for (int i = 0; i < 5; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
	}
	printf("El valor maximo es: %d\n", max);
    printf("El valor minimo es: %d\n", min);
	*/

 /*
    int arr[5] = { 1, 2, 3, 4, 5 };
    int temp;
    for (int i = 0; i < 2; i++)
    {
        temp = arr[i];
        arr[i] = arr[4 - i];
        arr[4 - i] = temp;
    }
    for (int i = 0; i < 5; i++)
    {
        printf("El valor invertido es: %d\n", arr[i]);

    }
    */

    /*
    int arr[5] = { 1, 2, 3, 4, 5 };
    int pares = 0;
    int impares = 0;

    for (int i = 0; i < 5; i++) {
        if (arr[i] % 2 == 0) {
            pares++;
        }
        else {
            impares++;
        }
    }

    printf("Pares: %d\n", pares);
    printf("Impares: %d\n", impares);

    */

    /*
    int arr[4] = { 10, 20, 30, 40, };

    float prom = 0;

    for (int i = 0; i < 4; i++)
    {
        prom += arr[i];

    }

    prom = prom / 4;

        printf("%.2f", prom);

        */

    /*
    int notas[4] = { 6,2,5,3 };
    int pesos[4] = { 2, 5, 7, 3 };
    int TotalPesos = 0;
    float resultado = 0;

    for (int i = 0; i < 4; i++)

    {
        resultado += notas[i] * pesos[i];
        TotalPesos += pesos[i];

    }

    resultado = resultado / TotalPesos;
    printf("La nota ponderada es %2.f", resultado);

    */

    /*
     int arr[3] = {1, 2, 3};
    int constante = 3;     

    for (int i = 0; i < 3; i++) {
        arr[i] = arr[i] * constante;
    }
    printf("Resultado: {");
    for (int i = 0; i < 3; i++) {
        printf("%d", arr[i]);
        if (i < 2) {
            printf(", ");
        }
    }
    printf("}\n");
    */

int arr[5] = { 1, 2, 3, 4, 5 };

    int temp;

    for (int i = 0; i < 5; i++)
    {
        temp = arr[0];
        arr[i] = arr[4 - 0];
        
    }

}
