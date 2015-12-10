function Hc = histoCumule(H)
    Hc = zeros(1,256);
    Hc(1,1) = H(1,1);
    for i =2:256
        Hc(1,i) = Hc(1,i-1) + H(1,i);
    end