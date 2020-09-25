public static double[][] findU( double[][] Matrix) {
    int n = Matrix.length;
    for (int j=0; j < (n-1); j++) { //<==looking at the jth column of the matrix
        for (int i=j+1; i < n; i++) {//subtracting row j
            double a = Matrix[i][j]/Matrix[j][j];
            Matrix[i][j] = 0;
            for (int k=j+1; k < n; k++) {
                Matrix[i][k] = Matrix[i][k] - a*Matrix[j][k];
            }
        }
    }
    return Matrix;
}