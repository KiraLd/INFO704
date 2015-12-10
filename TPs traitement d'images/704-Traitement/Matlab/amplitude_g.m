function Im = amplitude_g(I)
    Gx = gradient_x(I);
    Gy = gradient_y(I);
    G = sqrt(power(Gx,2)+power(Gy,2));
    Im = G;