#include <stdio.h>

int main() 
{

	int num1, num2;
	int condicion;

	printf("Ingrese el primer numero: ");
	scanf_s("%d", &num1);
	printf("Ingrese el segundo numero: ");
	scanf_s("%d", &num2);
	

	if (num1 == num2) 
	{
		condicion = num1 * num2;
		printf("Los numeros son iguales, su multiplicacion es: %d", condicion);
	}

	else if(num1 > num2) 
	{
		condicion = num1 - num2;
		printf("El primer numero es mayor, su resta es: %d", condicion);
	}
	else 
	{
		condicion = num1 + num2;
		printf("El segundo numero es mayor, su suma es: %d", condicion);
	}

	
}