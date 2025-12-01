// Will print an array of matrices, used for debugging.
public static void print3DMatrix(double[][][] Matrix) {
    int n = Matrix.length;
    System.out.println();
    DecimalFormat fmt = new DecimalFormat("0.####");
    fmt.setMinimumFractionDigits(4);
    for (int i=0; i< n-1; i++) {
        int h = i+1;
        System.out.println("H" + h + ":");
        for (int j=0; j < n; j++) {
            System.out.print("[");
            for (int k=0; k<n; k++) {
                System.out.print("{");
                System.out.print(fmt.format(Matrix[j][k][i]));
                System.out.print("} ");
            }
            System.out.println("]");
        }           
        System.out.println();       
    }
} 