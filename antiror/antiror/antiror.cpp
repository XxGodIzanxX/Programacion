#include <stdio.h>

int main() {

	/*int variable1 = 5;
	int variable2 = -5;

	if (variable1 > 5)
	{
		printf("El valor es mayor a 5");
	}

	else if (variable2 < 5)
	{
		printf("El valor es menor a 5");
	}
	else if(variable1 == 5)
	{
		printf("El valor es 5");
	}

	else 
	{
		printf("El numero es irreal");
	}
	*/

	int DineroDisponible = 200;
	int Edad = 20;

	if ((Edad >18 && Edad <50)&& DineroDisponible > 70)
	{
		DineroDisponible = DineroDisponible - 70;
		printf("Dinero restante = %d", DineroDisponible);
		printf("\nPuedes comprar el producto");
	}
	
}