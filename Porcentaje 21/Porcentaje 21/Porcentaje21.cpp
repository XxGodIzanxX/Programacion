#include <stdio.h>


int main() {
	
	float num1;
	float porcentaje;
	float resultado;

	printf("Ingrese una cantidad: ");
	scanf_s("%f", &num1);
	printf("Ingrese el porcentaje que desea sacar: ");
	scanf_s("%f", &porcentaje);
	 
	if (porcentaje > 100) {
		printf("El porcentaje no puede ser mayor a 100");
	}
	else {
		resultado = (num1 * porcentaje) / 100;
		printf("El %f de %f es: %f", porcentaje, num1, resultado);
	}
}