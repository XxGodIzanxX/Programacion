#include <stdio.h>

int main() {

	int i;

	printf("Ingrese un numero:");

	for (i = 0; i <= 100; i++)
	{
		if (i % 5 == 0)
		{
			printf("\n%d", i);
		}
	}
	printf("\n");
	
}