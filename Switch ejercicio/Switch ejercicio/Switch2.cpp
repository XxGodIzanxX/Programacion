#include <stdio.h>



int main() {
	char operacion = 'r';
	float num1, num2;
	float resultado;
	int i = 1;
	
	
	while (operacion != 'e')
	{


		printf("Ingrese la operacion a realizar (+, -, *, /)\n: ");
		scanf_s(" %c", &operacion, 1);
		printf("Ingrese dos numeros\n: ");
		scanf_s("%f %f", &num1, &num2);

		switch (operacion)

		{

		case '+':

			resultado = num1 + num2;
			break;
		case '-':
			resultado = num1 - num2;
			break;
		case '*':
			resultado = num1 * num2;
			break;
		case '/':
			if (num2 != 0) {
				resultado = num1 / num2;
			}
			else {
				printf("Error: Division por cero no es permitida.\n");
				return 0;
			}

			resultado = num1 / num2;
			break;

		case ('!'):
			while (i <= num1)
			{
				resultado = resultado * i;
				i++;
			}


		default:
			break;
		}
		printf("El resultado es: %.2f\n", resultado);
	}
}