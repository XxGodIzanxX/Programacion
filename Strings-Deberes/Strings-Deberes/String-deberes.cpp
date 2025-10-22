#include <stdio.h>
#include <string.h>

int main() {


    //Ejercicio 1
    /*
    char palabra[100], reversa[100];
    int len, i;
    int es_palindroma = 1;

    printf("Dame una palabra: ");
    scanf_s("%s", palabra);

    len = strlen(palabra);
    for (i = 0; i < len; i++) {
        reversa[i] = palabra[len - 1 - i];
    }
    reversa[len] = '\0';
    for (i = 0; i < len; i++) {
        if (palabra[i] != reversa[i]) {
            es_palindroma = 0;
        }
    }

    printf("La palabra dada es: %s\n", palabra);
    printf("La palabra al reves es: %s\n", reversa);

    if (es_palindroma == 1) {
        printf("La palabra es palindroma\n");
    }
    else {
        printf("La palabra no es palindroma\n");
    }
    */


    //Ejercicio 2
    /*
    char frase[200];
    int total = 0;
    int a = 0, e = 0, i = 0, o = 0, u = 0;

    printf("Dame una frase: ");
    fgets(frase, sizeof(frase), stdin);

    total = strlen(frase);
    if (frase[total - 1] == '\n') {
        frase[total - 1] = '\0';
        total--;
    }

    for (int j = 0; frase[j] != '\0'; j++) {
        char c = frase[j];

        if (c >= 'A' && c <= 'Z') {
            c = c + ('a' - 'A');
        }

        if (c == 'a') {
            a++;
        }
        else if (c == 'e') {
            e++;
        }
        else if (c == 'i') {
            i++;
        }
        else if (c == 'o') {
            o++;
        }
        else if (c == 'u') {
            u++;
        }
    }

    printf("La frase es de %d caracteres\n", total);
    if (o > 0) {
        printf("La letra o aparece %d veces en un total de %d\n", o, total);
    }
    if (a > 0) {
        printf("La letra a aparece %d veces en un total de %d\n", a, total);
    }
    if (e > 0) {
        printf("La letra e aparece %d veces en un total de %d\n", e, total);
    }
    if (i > 0) {
        printf("La letra i aparece %d veces en un total de %d\n", i, total);
    }
    if (u > 0) {
        printf("La letra u aparece %d veces en un total de %d\n", u, total);
    }

    */

    //Ejercicio 3
    /*
    char cadena[200];
    int i;
    printf("Escribe una cadena: ");
    fgets(cadena, 200, stdin); 

    for (i = 0; cadena[i] != '\0'; i++) {
        char c = cadena[i];
        if (c >= 'A' && c <= 'Z') {
            c = c + ('a' - 'A');
        }
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            cadena[i] = '.';
        }
    }
    printf("Cadena modificada: %s", cadena);
    */


//Ejercicio 4
/*
char cadena[200];
int vocales = 0;
int consonantes = 0;
int i;

printf("Escribe una cadena: ");
fgets(cadena, 200, stdin); 

for (i = 0; cadena[i] != '\0'; i++) {
    char c = cadena[i];
    if (c >= 'A' && c <= 'Z') {
        c = c + ('a' - 'A');
    }
    if ((c >= 'a') && (c <= 'z')) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            vocales++;
        }
        else {
            consonantes++;
        }
    }
}

printf("Cantidad de vocales: %d\n", vocales);
printf("Cantidad de consonantes: %d\n", consonantes);
*/


//Ejercicio 5
/*
char frase[200];
int i = 0, letras = 0;

printf("Escribe una frase: ");
fgets(frase, 200, stdin);

while (frase[i] != '\0') {
    if (frase[i] != ' ' && frase[i] != '\n') {
        printf("%c", frase[i]);
        letras++;
    }
    else {
        if (letras > 0) {
            printf(" (%d letras)\n", letras);
            letras = 0;
        }
    }
    i++;
}

if (letras > 0) {
    printf(" (%d letras)\n", letras);
}
*/



//Ejercicio 6
/*
char frase[200];
char limpia[200];
int i = 0, j = 0;
int espacio_anterior = 0;

printf("Escribe una frase: ");
fgets(frase, 200, stdin);

while (frase[i] != '\0') {
    if (frase[i] == ' ') {
        if (espacio_anterior == 0) {
            limpia[j] = ' ';
            j++;
            espacio_anterior = 1;
        }
    }
    else {
        limpia[j] = frase[i];
        j++;
        espacio_anterior = 0;
    }
    i++;
}
if (j > 0 && limpia[j - 1] == ' ') {
    j--;
}
limpia[j] = '\0';
printf("Frase con espacios corregidos: %s\n", limpia);
*/
}