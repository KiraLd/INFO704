function Im = estampage(I)
    matrice = [-2,0,0;0,0,0;0,0,2];
    coef = 1.0;
    Im = filtre(I,matrice,coef);