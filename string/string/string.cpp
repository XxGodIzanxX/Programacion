#include <stdio.h>
#include <string.h>

int main() {

	/*
	char sentencia[100];
	printf("Dime una frase\n");
	gets_s(sentencia);

	for (int i = 0; i <= strlen(sentencia) - 1; i++)
	{
		printf(" %c ", sentencia[i]);
	}
	*/

	//Ejercicio 1

	char sentencia[100];
	printf("Dime una frase\n");
	gets_s(sentencia);

	for (int i = 0; i <= strlen(sentencia); i++)
	{
		for (int la = 0; la <= strlen(sentencia) + 1; i++)

			printf("El numero de LA es:", la);
		
	}
}