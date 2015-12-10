function Im = gradient_y(I)
    matrice1 = [-1,0,1;-2,0,2;-1,0,1];
    Im = filtre(I,transpose(matrice1),1.0);