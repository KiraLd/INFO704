#pragma once
#include "stroke.hpp"
#include <cstdlib>

Stroke::Stroke(int min, int max, int size, int r, int g, int b)
{
	n_max = max;
	n_min = min;
	compteur = 0;
	this->size = size;
	points = new int[2 * max];
	this->r = r;
	this->b = b;
	this->g = g;
	id = 1+ (std::rand()%255);
}

void Stroke::set(int size, int r, int g, int b)
{
	compteur = 0;
	this->size = size;
	this->r = r;
	this->b = b;
	this->g = g;
	id = 1 + (std::rand() % 255);
}

void Stroke::desallouer()
{
	if (points != nullptr)
	{
		delete[] points;
	}
}

bool Stroke::addPixel(int x, int y)
{
	if (compteur == 2*n_max)
	{
		return false;
	}
	else
	{
		points[compteur] = x;
		compteur++;
		points[compteur] = y;
		compteur++;
		return true;
	}
}

void Stroke::draw(Mat& image,Mat& zbuffer ,int R)
{
	int R2 = R;
	if (R2 > 1)
	{
		R2 = R2 / 2;
	}
	for (int i = 0; i < compteur-1; i+=2)
	{
		circle(image, Point(points[i+1], points[i]), R, Scalar(b*0.9+0.1*id, g*0.9 + 0.1*id, r*0.9 + 0.1*id,1.0), -1);
		circle(zbuffer, Point(points[i + 1], points[i]), R2, Scalar(id), -1);
	}
	//namedWindow("test");
	//imshow("test", image);
	//waitKey(1);
}
