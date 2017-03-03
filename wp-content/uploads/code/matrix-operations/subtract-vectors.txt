// Will subtract Vector2 from Vector1.
public static double[] subtractVector(double[] Vector1, double[] Vector2) {
    double n = Vector1.length;
    double[] result = new double[(int)n];
    for (int i = 0; i<n; i++) {
        result[i] = Vector1[i] - Vector2[i];
    }
    return result;  
}