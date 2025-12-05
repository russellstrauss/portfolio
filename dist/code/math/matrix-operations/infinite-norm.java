/** The norm of infinity is found by individually taking the sum of the absolute value
* of each element in the rows one at a time. The row with the largest sum is the infinite norm,
* also known as the maximum row sum norm. **/
public static double normOfInfinity(double[][] Matrix) {
    int n = Matrix.length;
    double row = 0;
    for (int i = 0; i < n; i++) {
        double row2 = 0;
        for (int j = 0; j < n; j++) {
            row2 = row2 + Math.abs(Matrix[i][j]);
        }
        row = Math.max(row,row2);
    }
    return row;
}