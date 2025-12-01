//THE IDENTITY MATRIX:
double[][] I = new double[n][n];
for (int i=0; i<n; i++){
    for (int j=0; j<n; j++){
        if (i==j){
            I[i][j] = 1;
        }
        else{
            I[i][j] = 0;
        }
    }
}