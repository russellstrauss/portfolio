// Will transpose a matrix. Pass in the matrix.
public static double[][] transpose(double[][] Matrix) {
    int n = Matrix.length;
    double[][] temp = new double[n][n];
    for (int i=0; i<n; i++) {
        for (int j=0; j<n; j++) {
            temp[i][j] = Matrix[i][j];              
        }
    }
    for (int i=0; i<n; i++) {
        for (int j=0; j<n; j++) {
            if (i <= j)
                temp[i][j] = Matrix[j][i];
            if (i < j)
                temp[j][i] = Matrix[i][j];
        }
    }
    return temp;
}