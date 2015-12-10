function Im = prewitt(I)
    Im = I;
    matrice1 = [-1,-1,-1;0,0,0;1,1,1];
    matrice2 = transpose(matrice1);
    Gx = filtre(Im,matrice1,1.0);
    Gy = filtre(Im,matrice2,1.0);
    G = sqrt(power(Gx,2)+power(Gy,2));
    Im = G;