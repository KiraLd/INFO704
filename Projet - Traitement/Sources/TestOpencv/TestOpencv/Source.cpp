#include <opencv2/opencv.hpp>
#include <iostream>
#include <ctime>
#include "Paint.hpp"
#include "getopt.h"

using namespace cv;
using namespace std;

int main(int argc, char** argv)
{
	
	if (argc < 3)
	{
		cout << " Usage: TestOpencv -T errorApproximation -C curvature -M maxStrokeLength -I input_file -O output_file" << endl;
		cout << " Avec errorApproximation et maxStrokeLength entiers, curvature flottant" << endl;
		cout << " Par défaut maxStrokeLength = 16, errorApproximation = 100, curvature = 1.0, output_file = output.jpg"<<endl;
		return -1;
	}
	std::string out("output.jpg");
	std::string in("null");
	int c;
	Paint p;
	while ((c = getopt(argc, argv, "T:C:M:I:O:m:R:N:B:b:")) != -1)
	{
		switch (c)
		{
		case 'b':
			p.setBlur(atof(optarg));
			break;
		case 'T':
			p.setErrorApproximation(atoi(optarg));
			break;
		case 'C':
			p.setCurvature(atof(optarg));
			break;
		case 'M':
			p.setMaxLength(atoi(optarg));
			break;
		case 'I':
			in = std::string(optarg);
			break;
		case 'O':
			out = std::string(optarg);
			break;
		case 'm':
			p.setMinLength(atoi(optarg));
			break;
		case 'B':
			p.setBrushMax(atoi(optarg));
			break;
		case 'R':
			p.setRatio(atof(optarg));
			break;
		case 'N':
			p.setNbBrushes(atoi(optarg));
			break;
		}
	}
	if (in == "null")
	{
		cout << "Erreur: pas d'image d'entrée sélectionnée" << endl;
		exit(0);
	}
	const clock_t start = clock();
	Mat image;
	Mat* img;
	image = imread(in, CV_LOAD_IMAGE_COLOR);   // Read the file
	if (!image.data)                              // Check for invalid input
	{
		cout << "Erreur: fichier introuvable" << std::endl;
		return -1;
	}
	img = p.paint(image);
	std::cout <<"Temps d'exécution: "<< float(clock()-start)/CLOCKS_PER_SEC <<"s"<<std::endl;
	namedWindow("test");
	imshow("test",*img);
	waitKey(30000);
	imwrite(out, *img);
	
	return 0;
}
