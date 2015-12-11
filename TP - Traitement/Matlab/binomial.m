function Im = binomial(I)
    matrice = [1,4,6,4,1;4,16,24,16,4;6,24,36,24,6;4,16,24,16,4;1,4,6,4,1];
    coef = 1.0/256.0;
    Im = filtre(I,matrice,coef);