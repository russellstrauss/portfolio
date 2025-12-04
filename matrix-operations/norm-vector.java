// Calculates the norm of a passed in vector, as a normal array.
public static double norm(double[] Vector) {
    double result = 0;
    for (int i=0; i<Vector.length; i++) {
        result = result + (Vector[i] * Vector[i]);      
    }
    result = Math.sqrt(result);
    return result;
}