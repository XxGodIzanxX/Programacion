#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int main()
{
	srand(time(NULL));
	char mapa[3][3];
	int posJugador[2];
	int posMaquina[2];
	int terminarJuegoMaquina = 0;
	int terminarJuegoJugador = 0;
	int intentos = 9;
	for (int i = 0; i < 3; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			mapa[i][j] = '-';
		}
	}
	do
	{
		do
		{
			for (int i = 0; i < 2; i++)
			{
				posMaquina[i] = rand() % 3;
			}
		} while (mapa[posMaquina[0]][posMaquina[1]] != '-');
		mapa[posMaquina[0]][posMaquina[1]] = 'O';
		intentos--;
		do
		{
			for (int i = 0; i < 2; i++)
			{
				scanf_s("%d", &posJugador[i]);
			}
		} while (mapa[posJugador[0]][posJugador[1]] != '-');
		mapa[posJugador[0]][posJugador[1]] = 'X';
		intentos--;

		for (int i = 0; i < 3; i++)
		{
			for (int j = 0; j < 3; j++)
			{
				printf("%c", mapa[i][j]);
			}
			printf("\n");
		}
		//Seccion Condicionales

		for (int i = 0; i < 3; i++)
		{
			if (mapa[i][0] == 'X' && mapa[i][1] == 'X' && mapa[i][2] == 'X')
			{
				terminarJuegoJugador = true;
			}
			else if (mapa[i][0] == 'O' && mapa[i][1] == 'O' && mapa[i][2] == 'O')
			{
				terminarJuegoMaquina = true;
			}
		}

		for (int i = 0; i < 3; i++)
		{
			if (mapa[0][i] == 'X' && mapa[1][i] == 'X' && mapa[2][i] == 'X')
			{
				terminarJuegoJugador = true;
			}
			else if (mapa[0][i] == 'O' && mapa[1][i] == 'O' && mapa[2][i] == 'O')
			{
				terminarJuegoMaquina = true;
			}
		}

		if (mapa[0][0] == 'X' && mapa[1][1] == 'X' && mapa[2][2] == 'X')
		{
			terminarJuegoJugador = 1;
		}
		else if (mapa[0][0] == 'O' && mapa[1][1] == 'O' && mapa[2][2] == 'O')
		{
			terminarJuegoMaquina = 1;
		}

		else if (mapa[2][0] == 'X' && mapa[1][1] == 'X' && mapa[0][2] == 'X')
		{
			terminarJuegoJugador = 1;
		}
		else if (mapa[2][0] == 'O' && mapa[1][1] == 'O' && mapa[0][2] == 'O')
		{
			terminarJuegoMaquina = 1;
		}

	} while ((terminarJuegoMaquina == 0 && terminarJuegoJugador == 0) || intentos > 0);

	if (terminarJuegoJugador == true)
	{
		printf("Has ganado\n");
	}
	if (terminarJuegoMaquina == true)
	{
		printf("Has perdido\n");
	}
	else
	{
		printf("Empate\n");
	}

}