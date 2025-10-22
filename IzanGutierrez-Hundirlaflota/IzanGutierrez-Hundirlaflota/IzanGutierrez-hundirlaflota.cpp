#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    char tablero[10][10];
    int i, j, x, y, aciertos = 0, intentos = 0;

    
    for (i = 0; i < 10; i++)
        for (j = 0; j < 10; j++)
            tablero[i][j] = '.';

   
    srand((unsigned)time(NULL));
    int fila = rand() % 10;
    int columna = rand() % 8; 
    for (i = 0; i < 3; i++)
        tablero[fila][columna + i] = 'S';

    
    while (aciertos < 3) {
       
        printf("  ");
        for (i = 0; i < 10; i++) printf("%d ", i);
        printf("\n");
        for (i = 0; i < 10; i++) {
            printf("%d ", i);
            for (j = 0; j < 10; j++) {
                if (tablero[i][j] == 'S' || tablero[i][j] == '.')
                    printf(". ");
                else
                    printf("%c ", tablero[i][j]);
            }
            printf("\n");
        }

        
        printf("Dispara (fila columna): ");
        scanf_s("%d %d", &x, &y);

        if (x < 0 || x >= 10 || y < 0 || y >= 10) {
            printf("Fuera del tablero.\n");
            continue;
        }

        if (tablero[x][y] == 'S') {
            printf("¡Tocado!\n");
            tablero[x][y] = 'X';
            aciertos++;
        }
        else if (tablero[x][y] == '.') {
            printf("Agua.\n");
            tablero[x][y] = 'O';
        }
        else {
            printf("Ya disparaste ahí.\n");
        }

        intentos++;
    }

    printf("¡Hundiste la nave en %d intentos!\n", intentos);
}