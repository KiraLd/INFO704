function Im = net(I)
    matrice = [-1,-1,-1;-1,17,-1;-1,-1,-1];
    coef = 9.0;
    Im = recadrage(I);
    Im = filtre(Im,matrice,coef);