#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define SIZE 10
#define NUM_NAVES 3
#define LONG_NAVE 3

int main() {
    srand(time(NULL));

    char mapa[SIZE][SIZE];
    int naves[SIZE][SIZE];
    int direcciones[4][2] = { {1,0},{0,1},{1,1},{-1,1} };
    int aciertos = 0, intentos = 0;

    for (int i = 0; i < SIZE; i++)
        for (int j = 0; j < SIZE; j++) {
            mapa[i][j] = ' ';
            naves[i][j] = 0;
        }
    int colocadas = 0;
    while (colocadas < NUM_NAVES) {
        int x = rand() % SIZE;
        int y = rand() % SIZE;
        int d = rand() % 4;
        int dx = direcciones[d][0];
        int dy = direcciones[d][1];
        int valido = 1;
        for (int i = 0; i < LONG_NAVE; i++) {
            int nx = x + i * dx;
            int ny = y + i * dy;
            if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE || naves[ny][nx] == 1) {
                valido = 0;
                i = LONG_NAVE;
            }
        }
        if (valido) {
            for (int i = 0; i < LONG_NAVE; i++) {
                int nx = x + i * dx;
                int ny = y + i * dy;
                naves[ny][nx] = 1;
            }
            colocadas++;
        }
    }
    while (aciertos < NUM_NAVES * LONG_NAVE) {
  
        printf("  ");
        for (int i = 0; i < SIZE; i++) printf("%d ", i);
        printf("\n");
        for (int i = 0; i < SIZE; i++) {
            printf("%d ", i);
            for (int j = 0; j < SIZE; j++) {
                printf("%c ", mapa[i][j]);
            }
            printf("\n");
        }
        int x, y;
        printf("Introduce coordenadas x y (0-9): ");
        scanf_s("%d %d", &x, &y);

        if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) {
            printf("Coordenadas fuera de rango.\n");
        }
        else if (mapa[y][x] != ' ') {
            printf("Ya has disparado aquí.\n");
        }
        else {
            intentos++;
            if (naves[y][x] == 1) {
                mapa[y][x] = 'X';
                aciertos++;
                printf("¡Impacto!\n");
            }
            else {
                mapa[y][x] = 'O';
                printf("Agua...\n");
            }
        }
    }
    printf("\n¡Has destruido todas las naves en %d intentos!\n", intentos);
    for (int i = 0; i < SIZE; i++) {
        for (int j = 0; j < SIZE; j++) {
            printf("%c ", mapa[i][j]);
        }
        printf("\n");
    }
}