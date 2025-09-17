#include <stdio.h>

int main() 
{
	int edad, sexo, pulsaciones;

	printf("Ingrese su edad: ");
	scanf_s("%d", &edad);
	printf("Ingrese su sexo (1 para mujer, 2 para hombre): ");
	scanf_s("%d", &sexo);

	if (sexo == 1)
	{
		pulsaciones = (210 - edad) / 10;
		printf("Sus pulsaciones por cada 10 segundos son: %d\n", pulsaciones);
	}

	else if (sexo == 2)
	{
		pulsaciones = (220 - edad) / 10;
		printf("Sus pulsaciones por cada 10 segundos son: %d\n", pulsaciones);
	}
	else
	{
		printf("Sexo no valido\n");
	}
}