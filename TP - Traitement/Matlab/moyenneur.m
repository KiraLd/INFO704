function Im = moyenneur(I)
    matrice = [1,1,1;1,1,1;1,1,1];
    coef = 1.0/9.0;
    Im = filtre(I,matrice,coef);