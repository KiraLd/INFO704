function Im = appliquerLUT(I,LUT)
    Im = I;
    x = size(I,1);
    y = size(I,2);
    for i=1:x
        for j=1:y
            Im(i,j) = LUT(1,I(i,j)+1);
        end
    end