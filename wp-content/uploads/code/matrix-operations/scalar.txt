// Multiplies a matrix by a scalar.
public static double[][] scalar(double[][] Matrix1, double scalar) {
    int n = Matrix1.length;
    double result[][] = new double[(int)n][(int)n];   
        for(int i = 0; i < Matrix1.length; i++) {
            for(int j = 0; j < Matrix1.length; j++) {         
                result[i][j] += Matrix1[i][j]*scalar;               
            }  
        }  
        return result;
}