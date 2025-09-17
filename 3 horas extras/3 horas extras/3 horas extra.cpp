#include <stdio.h>

int main() {
	int horas;
	float salario;
	
	printf("Horas trabajadas: ");
	scanf_s("%d", &horas);

	if (horas <= 40)
	{
		salario = horas * 20;
	}
	else {
		int extra = horas - 40;
		salario = (40 * 20) + (extra * 20 * 2);

	}

	printf("Salario: %.2f\n", salario);
}
