function I = histoToImage(H)
    I = zeros(256,256);
    I = I+255;
    m = max(H);
    for i=1:256,
        n = floor(H(1,i)*256/m);
        for j=256:-1:257-n,
            I(i,j) = 0;
        end
    end
    I = transpose(I);
        