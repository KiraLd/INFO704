function Im = LoG(I)
    coef = 1.0;
    matrice = [0,0,-1,0,0;0,-1,-2,-1,0;-1,-2,16,-2,-1;0,-1,-2,-1,0;0,0,-1,0,0];
    Im = filtre(I,matrice,coef);