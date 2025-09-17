#include <stdio.h>

int main()
{
	int num1;
	int num2;
	int condicion;
	int resultado;

	printf("Que año es hoy: ");
	scanf_s("%d", &num1);
	printf("En que año naciste: ");
	scanf_s("%d", &num2);
	condicion = num1 - num2;
	printf("Tu edad es: %d\n", condicion);
	
}