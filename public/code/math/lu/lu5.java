public static double[][] findL( double[][] Matrix) {
    int n = Matrix.length;
    double[][] L = new double[n][n];
    for (int i=0; i<n; i++) {
        L[i][0] = (Matrix[i][0]/Matrix[0][0]);
    }
     
    double[][] tempL = new double[n][n];
    double[][] I = new double[n][n];
    for (int id=0; id<n; id++){
        for (int jd=0; jd<n; jd++){
            if (id==jd){
                I[id][jd] = 1;
            }
            else{
                I[id][jd] = 0;
            }
        }
    }
    for (int copy1=0; copy1<n; copy1++) {
        for (int copy2=0; copy2<n; copy2++) {   
            tempL[copy1][copy2] = I[copy1][copy2];
        }
    }
     
    for (int j=0; j < (n-1); j++) { //<==looking at the jth column of the matrix 
        for (int i=j+1; i < n; i++) {//subtracting row j
            double a = Matrix[i][j]/Matrix[j][j];
            Matrix[i][j] = 0;
            for (int k=j+1; k < n; k++) {
                Matrix[i][k] = Matrix[i][k] - a*Matrix[j][k];
            }
        }
        for (int l=j+1; l<n-1; l++) {
            tempL[l+1][j+1]=(double)Matrix[l+1][j+1]/(double)Matrix[j+1][j+1];          
        }
        L = matrixMultiplication(L, tempL);
    }   
    return L;
}