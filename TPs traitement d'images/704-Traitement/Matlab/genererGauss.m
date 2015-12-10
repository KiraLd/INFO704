function F = genererGauss(o,coef)
    x = floor(6*o)-1
    F = zeros(x,x);
    for i=-floor(x/2):floor(x/2)
        for j=-floor(x/2):floor(x/2)
            F(i+floor(x/2)+1,j+floor(x/2)+1) = (1.0/sqrt(2*pi*o*o))*exp(-(i*i+j*j)/(2*o*o));
        end
    end
    n = norm(F);
    F = F/n;
    F = floor(F*coef);
    
    