function H = histogramme(I)
    H = zeros(1,256);
    x = size(I,1);
    y = size(I,2);
    for j =1:x
            for k = 1:y
                H(1,I(j,k)+1) = H(1,I(j,k)+1)+1;
            end
    end
    
    