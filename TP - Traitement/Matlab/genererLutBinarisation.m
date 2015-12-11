function LUT = genererLutBinarisation(seuilBas)
    LUT = zeros(1,256);
    for i = 1:256
        if(i > seuilBas)
            LUT(1,i) = 255;
        end
    end

            