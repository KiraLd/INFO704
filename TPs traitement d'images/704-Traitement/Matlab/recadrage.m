function Im = recadrage(I)
    x = size(I,1);
    y = size(I,2);
    H = histogramme(I);
    Hc = histoCumule(H);
    N = x*y;
    a = size(Hc(Hc<0.25*N),2);
    b = 255-size(Hc(Hc(256)-Hc < 0.025*N),2);
    LUT = zeros(1,256);
    LUT = uint8(LUT);
    alpha = -255/(a-b);
    beta = 255*a/(a-b);
    alpha 
    beta
    for i = 1:256
        if(i > a && i <b)
            LUT(1,i) = i*alpha +beta;
        else
            if(i > b)
                LUT(1,i) = 255;
            end
        end
        
    end
    Im = appliquerLUT(I,LUT);
    
    
    
    
    
    
    
    


    
    