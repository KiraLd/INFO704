function Im = gaussien(I)
    matrice = [0,1,0; 1,2,1; 0,1,0];
    coef = 1.0/6.0;
    Im = filtre(I,matrice,coef);