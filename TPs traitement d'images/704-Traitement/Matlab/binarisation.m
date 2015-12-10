function Im = binarisation(I)
    H = histogramme(I);
    Hc = histoCumule(H);
    seuilBas = 1;
    N = size(I,1)*size(I,2);
    while(Hc(1,seuilBas) < N/2 && seuilBas <= 254)
        seuilBas = seuilBas +1;
    end
    seuilBas
    LUT = genererLutBinarisation(seuilBas);
    Im = appliquerLUT(I,LUT);
    