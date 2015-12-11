function Im = alt_laplacien(I,a)
    matrice = [a/4.0,(1.0-a)/4.0,a/4.0; (1.0-a)/4.0, -1, (1.0-a)/4.0; a/4.0, (1.0-a)/4.0,a/4.0];
    coef = 4.0/(a+1.0);
    Im = filtre(I,matrice,coef);