#include <stdio.h>


int main() {

	int numeros;

	
	printf("Introduce un numero entero positivo\n ");
	scanf_s("%d", &numeros);

	if (numeros < 0) 
	{
		printf("El numero introducido no es positivo\n");
	}
	
	else
	{
				for (int i = 1; i <= numeros; i++) 
		{
			if (i % 2 == 0) 
			{
				printf("%d es par\n", i);
			}
			else 
			{
				printf("%d es impar\n", i);
			}
				}
	}
	
		


}