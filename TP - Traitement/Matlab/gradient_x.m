function Im = gradient_x(I)
    matrice1 = [-1,0,1;-2,0,2;-1,0,1];
    Im = filtre(I,matrice1,1.0);