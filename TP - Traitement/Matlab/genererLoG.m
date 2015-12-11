function H = genererLoG(o)
    x = floor(6*o)-1;
    H = zeros(x,x);
    for i=-floor(x/2):floor(x/2)
        for j=-floor(x/2):floor(x/2)
            H(i+floor(x/2)+1,j+floor(x/2)+1) = (-1/(pi*o*o*o*o))*(1-(i*i+j*j)/(2*o*o))*exp(-(i*i+j*j)/(2*o*o));
        end
    end
    H = H/norm(H);
    