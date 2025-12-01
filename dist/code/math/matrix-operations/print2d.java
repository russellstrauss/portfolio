// This method will print out a square matrix,formatted and aligned for viewing.
// Pass in the 2D array, the matrix.
public static void printMatrix(double[][] Matrix) {
    int n = Matrix.length;
    System.out.println();
    DecimalFormat fmt = new DecimalFormat("0.####");
    fmt.setMinimumFractionDigits(4);
    for (int i=0; i< n; i++) {          
        System.out.print("[ ");
        for (int j=0; j < n; j++) {
            System.out.print("{");
            System.out.print(fmt.format(Matrix[i][j]));
            System.out.print("} ");
        }           
        System.out.print("]");
        System.out.println();
        System.out.println();
    }
}