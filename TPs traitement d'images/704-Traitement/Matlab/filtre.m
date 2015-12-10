function Im = filtre(I,matrice,coef)
    x = size(I,1);
    y = size(I,2);
    n = size(matrice,1);
    Im = zeros(x,y);
    for i =floor(n/2)+1: x-floor(n/2)
        for j=floor(n/2)+1:y-floor(n/2)
                temp = I(i-floor(n/2):i+floor(n/2),j-floor(n/2):j+floor(n/2));
                Im(i,j) = transpose(double(temp(:)))*matrice(:);
        end
    end
    Im = Im*coef;
    Im = floor(Im);
    Im(Im>255) = 255;
    Im(Im<0) = 0;
    
    
                    
        
    