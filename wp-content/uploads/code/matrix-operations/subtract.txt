// Will subtract one matrix from another. Dimensions must be equal in order to perform matrix subtraction.
public static double[][] subtractMatrix(double[][] Matrix1, double[][] Matrix2) {
    int n = Matrix1.length;
    double[][] result = new double[(int)n][(int)n];
    for (int i = 0; i<n; i++) {
        for (int j=0; j<n; j++) {
            result[i][j] = Matrix1[i][j] - Matrix2[i][j];
        }
    }
    return result;  
}