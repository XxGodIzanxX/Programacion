#include <stdio.h>

int main()
{
	int num1, num2, num3;
	int condicion;
	printf("Ingrese el primer Numero: ");
	scanf_s("%d", &num1);

	printf("Ingrese el segundo Numero: ");
	scanf_s("%d", &num2);

	printf("Ingrese el tercer Numero: ");
	scanf_s("%d", &num3);

	if (num1 == num2 || num1 == num3 || num2 == num3)
	{
		printf("Los numeros deben ser diferentes.\n");
	}
	
	else if (num1 > num2 && num1 > num3)
	{
		printf("El numero mayor es: %d\n", num1);
	}

	else if(num2 > num1 && num2 > num3)
	{
		printf("El numero mayor es: %d\n", num2);
	}
	else
	{
		printf("El numero mayor es: %d\n", num3);
		
	}
}