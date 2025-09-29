#include <stdio.h>
#include <math.h>
int main() {

	int v1[3] = { 1, 2, 3 };
	float moduloV1 = 0;
	for (int i = 0; i < 3; i++) {
		moduloV1 += pow(v1[i], 2);
	}
	printf("Modulo de v1: %f\n", sqrt(moduloV1));
}
