#include <stdio.h>

int main() {
	float pulgadas, centimetros;
	printf("Ingrese la cantidad de pulgadas: ");
	scanf_s("%f", &pulgadas);
	centimetros = pulgadas * 2.54;
	printf("%.2f pulgadas son %.2f centimetros\n", pulgadas, centimetros);
	
}