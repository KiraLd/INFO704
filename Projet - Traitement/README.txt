Le dossier Sources contient tous les fichiers sources du projet au format Visual Studio.
(il manque les DLL opencv dans les dossiers Executable + Debug)

Une version ex�cutable du projet est disponible dans le dossier Executable:

Usage: 
TestOpencv 
-b [facteur de lissage] (flottant)
-T [seuil d'approximation] (entier entre 0 et 255)
-C [filtre de courbure] (flottant)
-M [max] (entier, longueur maximal d'un coup de pinceau)
-m [min] (entier, longueur minimal)
-B [R] (entier, rayon du pinceau le plus grand en pixels)
-R [ratio] (flottant, facteur utilis� pour calcul� le rayon des pinceaux suivants);
-N [n] (entier, nombre de couches = nombre de taille de pinceaux diff�rentes)
-I [input] (chaine de caract�res, image originale)
-O [output] (image peinte)

