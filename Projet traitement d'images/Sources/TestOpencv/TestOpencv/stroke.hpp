#pragma once
#ifndef _STROKE_
#define _STROKE_
#include <opencv2/opencv.hpp>
using namespace cv;

class Stroke
{
public:
	int* points;
	int n_max;
	int n_min;
	int size;
	int compteur;
	int r, g, b;
	int id;

	Stroke()
	{
		points = nullptr;
	}
	Stroke(int min, int max, int size, int r, int g, int b);
	void set(int size, int r, int g, int b);
	void desallouer();
	bool addPixel(int x, int y);
	void draw(Mat& image, Mat& zbuffer,int R);
};

#endif