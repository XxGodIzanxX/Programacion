#include <stdio.h>


int main()
{
	int num1;
	int num2;
	int condicion;
	int resultado=0;

	printf("Ingrese el primer numero\n ");
	scanf_s("%d", &num1);
	printf("Ingrese el segundo numero\n ");
	scanf_s("%d", &num2);
	printf("Que operacion quiere hacer. 1 Sumar , 2 Restar, 3 Multiplicar, 4 Dividir\n ");
	scanf_s("%d", &condicion);

	if (condicion == 1)
	{
		resultado = num1 + num2;
	}

	else if (condicion == 2)
	{
		resultado = num1 - num2;
	}
	else if (condicion == 3)
	{
		resultado = num1 * num2;
	}
	else if (condicion == 4)
	{
		resultado = num1 / num2;
	}
	else {
		printf("La operacion no es valida\n ");
		return 0;
	}
	printf("El resultado es: %d\n", resultado);

	

}