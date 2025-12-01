if (i!= n-1) {
    double[][] U = new double[n][1];
    double[] U1 = subtractVector(X, C);

    //Turning U into a 2D array vector:
    for (int l=0; l<n; l++) {
        U[l][0] = U1[l];
    }
    double[][] Ut = new double[1][n];
    double[] u1 = subtractVector(X, C);
    //Turning Ut into a 2D array vector:
    for (int m=0; m<n; m++) {
        Ut[0][m] = u1[m];
    }
    double[][] UUt = multiplyUUt(U, Ut);
    double TwoDivNorm2 = 2/(norm2D(U)*norm2D(U));
    double[][] TwoDivNormTimesUUt = scalar(UUt, TwoDivNorm2);
    double[][]Han = subtractMatrix(I, TwoDivNormTimesUUt);                          

     
    for (int row=0; row<n; row++) {
        for (int column=0; column<n; column++) {
            if (row==column && row<=(i-1)) {
                Han[row][column] = 1;
            } 
        }
    }