#include <stdio.h>


int main() {

	int acumuladora = 0;

	for (int i = 1; i <= 10; i++) {
		acumuladora += i;
		printf("Valor de I = %d | Valor acumuladora es = %d\n", i, acumuladora);
	}
	printf("Disminuyendo\n");
	for (int i = 10; i >= 0; i--) {
		acumuladora -= i;
		printf("Valor de I = %d | Valor acumuladora es = %d\n", i, acumuladora);
	}
}