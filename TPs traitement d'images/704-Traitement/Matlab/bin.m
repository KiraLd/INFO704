function Im = bin(I,b)
    LUT = genererLutBinarisation(b);
    Im = appliquerLUT(I,LUT);
    