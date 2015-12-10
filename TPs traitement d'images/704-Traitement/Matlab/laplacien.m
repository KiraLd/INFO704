function Im = laplacien(I)
    matrice = [0,-1,0;-1,4,-1;0,-1,0];
    coef = 1.0;
    Im = filtre(I,matrice,coef);