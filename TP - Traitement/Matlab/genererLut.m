function LUT = genererLut(seuilBas,seuilHaut)
    LUT = zeros(1,256);
    for i = 1:256
        if(i > seuilBas && i < seuilHaut)
            LUT(1,i) = 255;
        end
    end

            