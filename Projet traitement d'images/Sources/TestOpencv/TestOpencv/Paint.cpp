#include "Paint.hpp"
#include <ctime>
#include <cstdlib>

#define MAXINT LONG_MAX

int cmp(const void *a, const void *b);

Paint::Paint()
{
	std::srand((unsigned int)std::time(0));
	setStyle(IMPRESSIONISTE);
	setErrorApproximation(200);
	setCurvature(1.0);
	setStrokeLength(4, 16);
	S = Stroke(min, max, 0, 0, 0, 0);
}

Paint::Paint(STYLE s)
{
	std::srand((unsigned int)std::time(0));
	setStyle(s);
	S = Stroke(min, max, 0, 0, 0, 0);
}

Paint::~Paint()
{
	
}

void Paint::setStyle(STYLE s)
{
	switch (s)
	{
	case IMPRESSIONISTE:
		setErrorApproximation(100);
		setBrushSize(8, 3, 0.5);
		setCurvature(1.0);
		setBlur(1.0);
		setStrokeLength(4, 16);
		setGridSize(1);
		break;
	case POINTILLISTE:
		setErrorApproximation(100);
		setBrushSize(4, 2, 0.5);
		setCurvature(1.0);
		setBlur(0.5);
		setStrokeLength(1, 4);
		setGridSize(0.5);
		break;
	case EXPRESIONNISTE:
		setErrorApproximation(50);
		setBrushSize(8, 3, 0.5);
		setCurvature(0.25);
		setBlur(0.5);
		setStrokeLength(10, 16);
		setGridSize(1.0);
		break;
	case COLORISTE:
		setErrorApproximation(200);
		setBrushSize(8, 3, 0.5);
		setCurvature(1.0);
		setBlur(0.5);
		setStrokeLength(4, 16);
		setGridSize(1.0);
		break;
	}
}

inline void Paint::setErrorApproximation(int t)
{
	T = t;
}

inline void Paint::setBrushSize(int r, int N, float Ratio)
{
	R = r;
	n = N;
	ratio = Ratio;
}

inline void Paint::setCurvature(float fC)
{
	fc = fC;
}

inline void Paint::setBlur(float fO)
{
	fo = fO;
}

inline void Paint::setStrokeLength(int Min, int Max)
{
	min = Min;
	max = Max;
}


inline void Paint::setGridSize(float g)
{
	fg = g;
}


Mat* Paint::paint(Mat& image)
{
	Mat luminance;
	canvas = image.clone();
	canvas.setTo(Scalar(255, 255, 255));
	luminance = canvas.clone();
	cvtColor(luminance, luminance, CV_BGR2GRAY);
	int R = this->R;
	int blur = (int)(fc*R);
	if (blur % 2 == 0)
	{
		blur++;
	}
	mag = image.clone();
	for (int i = 0; i < n; i++)
	{
		GaussianBlur(image, ref, Size(6*blur+1, 6*blur+1), blur, blur);
		Vec3b temp;
		for (int k = 0; k < luminance.size[0]; k++)
		{
			for (int j = 0; j < luminance.size[1]; j++)
			{
				temp = ref.at<Vec3b>(k, j);
				luminance.at<uchar>(k, j) = (uchar)(0.3*temp.val[2] + 0.59*temp.val[1] + 0.11*temp.val[0]);
			}
		}
		cvtColor(ref, gray, CV_BGR2GRAY);
		Sobel(luminance, grad_x, CV_16S, 1, 0, 3, 1, 0, BORDER_DEFAULT);
		convertScaleAbs(grad_x, grad_x);
		Sobel(luminance, grad_y, CV_16S, 1, 1, 3, 1, 0, BORDER_DEFAULT);
		convertScaleAbs(grad_y, grad_y);
		addWeighted(grad_x, 0.5, grad_y, 0.5, 0, mag);
		paintLayer(R);
		R = (int)(R *ratio);
		blur = (int)fc*R;
		if (blur % 2 == 0)
		{
			blur++;
		}
	}
	return &canvas;
}

void Paint::paintLayer(int R)
{
	Mat zbuffer = canvas.clone();
	zbuffer.setTo(Scalar(0, 0, 0));
	cvtColor(zbuffer, zbuffer, CV_BGR2GRAY);
	float* d= new float[canvas.size[0] * canvas.size[1]];
	Vec3b ref_, canvas_;
	float color;
	if (R == this->R)
	{
		for (int i = 0; i < canvas.size[0]; i++)
		{
			for (int j = 0; j < canvas.size[1];j++)
			{
				d[i*canvas.size[1] + j] = (float)2 * T;
			}
		}
	}
	else
	{
		for (int i = 0; i < canvas.size[0]; i++)
		{
			for (int j = 0; j < canvas.size[1];j++)
			{
				ref_ = ref.at<Vec3b>(i, j);
				canvas_ = canvas.at<Vec3b>(i, j);
				color = (float)(ref_.val[0] - canvas_.val[0])*(ref_.val[0] - canvas_.val[0]);
				color += (float)(ref_.val[1] - canvas_.val[1])*(ref_.val[1] - canvas_.val[1]);
				color += (float)(ref_.val[2] - canvas_.val[2])*(ref_.val[2] - canvas_.val[2]);
				color = sqrt(color);
				d[i*canvas.size[1] + j] = color;
			}
		}
	}
	int grid = (int)(fg*R);
	float areaError = 0.0;
	int x1, y1;
	x1 = 0;
	y1 = 0;
	int max = 0;
	Vec3b color_;
	int c = 0;
	int m = 0;
	for (int x = grid; x < ref.size[0] - grid; x += grid)
	{
		for (int y = grid; y < ref.size[1] - grid; y += grid)
		{
			max = 0;
			areaError = 0.0;
			for (int i = x - (grid / 2); i < x + (grid / 2); i++)
			{
				for (int j = y - (grid / 2); j < y + (grid / 2); j++)
				{
					areaError += d[i*canvas.size[1] + j];
					if (d[i*canvas.size[1] + j]>max)
					{
						max = (int)d[i*canvas.size[1] + j];
						x1 = i;
						y1 = j;
					}
				}
			}
			areaError /= (float)grid*grid;
			if (areaError > T)
			{
				m++;
				color_ = ref.at<Vec3b>(x1, y1);
				S.set(R, color_.val[2], color_.val[1], color_.val[0]);
				if (S.id > zbuffer.at<uchar>(x1, y1))
				{
					makeSplineStroke(x1, y1, R);
					S.draw(canvas, zbuffer, R);
					c++;
				}
				
			}
		}
	}
	std::cout << "Nombre de coups de pinceau potentiels: " << m << std::endl;
	std::cout << "Nombre de coups de pinceau utiles: " << c << std::endl;
	delete[] d;
}

void Paint::makeSplineStroke(int x0, int y0, int R)
{
	int x = x0;
	int y = y0;
	S.addPixel(x, y);
	float lastDx = 0.0;
	float lastDy = 0.0;
	float gx, gy;
	float dx, dy;
	float racine;
	for (int i = 1; i < max; i++)
	{
		if (S.compteur/2 >= min && mag.at<uchar>(x,y) == 0)
		{
			break;
		}
		gx = grad_x.at<uchar>(x, y);
		gy = grad_y.at<uchar>(x, y);
		dx = -gy;
		dy = gx;
		if (lastDx*dx + lastDy * dy < 0)
		{
			dx = -dx;
			dy = -dy;
		}
		dx = fc*dx + (1 - fc)*lastDx;
		dy = fc*dy + (1 - fc)*lastDy;
		racine = sqrtf(dx*dx + dy*dy);
		dx = dx / racine;
		dy = dy / racine;
		x = (int)(x + R*dx);
		y = (int)(y + R*dy);
		lastDx = dx;
		lastDy = dy;
		if (x < 0 || x >= ref.size[0] || y < 0 || y >= ref.size[1])
		{
			break;
		}
		S.addPixel(x, y);
	}
	//std::cout << s->compteur / 2 << std::endl;
}

int cmp(const void *a, const void *b)
{
	Stroke* arg1 = (Stroke*)a;
	Stroke* arg2 = (Stroke*)b;
	if (arg1->id < arg2->id) return -1;
	if (arg1->id > arg2->id) return 1;
	return 0;
}