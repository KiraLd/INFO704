#include <opencv2/opencv.hpp>
#include <iostream>
#include <ctime>
#include "Paint.hpp"

using namespace cv;
using namespace std;

int main(int argc, char** argv)
{
	
	if (argc != 3)
	{
		cout << " Usage: display_image ImageToLoadAndDisplay" << endl;
		return -1;
	}
	const clock_t start = clock();
	Mat image;
	Mat* img;
	image = imread(argv[1], CV_LOAD_IMAGE_COLOR);   // Read the file
	Paint p;
	if (!image.data)                              // Check for invalid input
	{
		cout << "Could not open or find the image" << std::endl;
		return -1;
	}
	img = p.paint(image);
	std::cout << float(clock()-start)/CLOCKS_PER_SEC <<"s"<<std::endl;
	namedWindow("test");
	imshow("test",*img);
	waitKey(30000);
	std::string name(argv[2]);
	imwrite(name, *img);
	
	return 0;
}
