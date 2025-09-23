#include <stdio.h>

int main() {

	int numero1;


	printf("Ingrese un numero entero;");
	scanf_s("%d", &numero1);

	if ((numero1 % 3 == 0) && (numero1 % 5 == 0))

		{
		printf("fizzbuzz");
	}
	else if (numero1 % 3 == 0) {
		printf("fizz");
	}
	else if (numero1 % 5 == 0) {
		printf("buzz");
	}
	else {
		printf("%d", numero1);
	}

	/*
	int resto;
	int resto2;
	
	switch (numero1) {

	case 1:
		resto = numero1 % 3;
		if (resto == 0) {
			printf("fizz");
		}
		break;

	case 2:
		resto2 = numero1 % 5;
		if (resto2 == 0) {
			printf("buzz");
		}
		break;
	case 3:
		
		resto2 = numero1 % 5;
		resto = numero1 % 3;

		if ((numero1 % 3 == 0) && (numero1 % 5 == 0)) {

			printf("fizzbuzz");
		}

		break;


	}/**/
}