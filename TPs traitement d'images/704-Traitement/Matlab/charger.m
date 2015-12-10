function I = charger(nom_fichier)
    I = imread(nom_fichier);
    I = im2uint8(I);
    