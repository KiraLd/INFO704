function Im = gradient(I)
    Im = I;
    matrice1 = [0,0,0;0,-1,0;0,1,0];
    matrice2 = [0,0,0;0,-1,1;0,0,0];
    Gx = filtre(Im,matrice1,1.0);
    Gy = filtre(Im,matrice2,1.0);
    G = sqrt(power(Gx,2)+power(Gy,2));
    Im = G;