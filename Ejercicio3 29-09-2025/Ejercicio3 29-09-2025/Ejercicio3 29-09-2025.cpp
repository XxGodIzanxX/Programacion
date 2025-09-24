#include <stdio.h>


int main() {

	int numero = 0;

	do
	{
		if (numero % 5 == 0)
		{
			printf("El numero %d es multiple de 5\n", numero);
		}
		numero++;
	} while (numero <= 100);

}
