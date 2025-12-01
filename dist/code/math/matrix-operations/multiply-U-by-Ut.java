// Multiplies vector U by its transpose.
public static double[][] multiplyUUt(double[][] Vector1, double[][] Vector2) {
    int n = Vector1.length;
    double[][] Matrix = new double[(int)n][(int)n];
    for(int i=0; i<n; i++){
        for(int j=0; j<n; j++){
            for(int k=0; k<1; k++){
                Matrix[i][j] += Vector1[i][k]*Vector2[k][j];
            }
        }
    }
    return Matrix;
}