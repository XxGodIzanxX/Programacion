#include <stdio.h>

int main() {
    int num = 320;
    do {
        printf("%d\n", num);
        num -= 20;
    } while (num >= 160);

}