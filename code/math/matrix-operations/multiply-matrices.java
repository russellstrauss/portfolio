// Multiplies Matrix1 and Matrix2, respectively, and returns the result.
public static double[][] matrixMultiplication (double[][] Matrix1, double[][] Matrix2) {
    int n = Matrix1.length;
    double result[][] = new double[(int)n][(int)n];   
    for(int i = 0; i < Matrix1.length; i++) {
        for(int j = 0; j < Matrix2.length; j++) {
            for(int k = 0; k < Matrix2.length; k++){          
                result[i][j] += Matrix1[i][k]*Matrix2[k][j];
            }
        }  
    }  
    return result;
}