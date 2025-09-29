#include <stdio.h>
#define TOTALALUMNOS 5

int main() {

	float alumnos[TOTALALUMNOS];
	float media = 0;
	for (int i = 0; i < TOTALALUMNOS; i++) {
		printf("Introduce la nota del alumno %d: ", i+1);
		scanf_s("%f", &alumnos[i]);
	}
	for (int i = 0; i < TOTALALUMNOS; i++) {
		media = media + alumnos[i];
	}
	printf("La media de la clase es: %.2f\n", media / TOTALALUMNOS);
}