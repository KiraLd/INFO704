#pragma once
#ifndef _PAINT_
#define _PAINT_
#include <opencv2/opencv.hpp>
#include "stroke.hpp"

enum STYLE { IMPRESSIONISTE, EXPRESIONNISTE, POINTILLISTE, COLORISTE};

using namespace cv;

class Paint
{
	//ListStroke* S;

	//approximation threshold
	int T;

	//brush size
	int R;		//biggest brush radius
	int n;		//number of brushes
	float ratio;		//ratio R(t+1)/R(t)

	//curvature filter
	float fc;

	//blur factor
	float fo;

	//min/max stroke lengths
	int min, max;

	//opacity;
	float alpha;

	//grid size
	float fg;

	//color jitter
	float jh, js, jv, jr, jg, jb;

	//canvas
	Mat canvas, grad_x, grad_y, ref, gray, mag;
	Mat zbuf;
	Stroke S;


public:
	Paint();
	Paint(enum STYLE s);
	~Paint();

	void setStyle(enum STYLE s);
	void setErrorApproximation(int T);
	void setBrushSize(int R, int n, float ratio);
	void setCurvature(float fc);
	void setBlur(float fo);
	void setStrokeLength(int min, int max);
	void setMinLength(int m);
	void setMaxLength(int m);
	void setRatio(float r);
	void setBrushMax(int m);
	void setNbBrushes(int N);
	void setGridSize(float fg);
	Mat* paint(Mat& image);
	void paintLayer(int R);
	void makeSplineStroke(int x0, int y0, int R);



};

#endif
