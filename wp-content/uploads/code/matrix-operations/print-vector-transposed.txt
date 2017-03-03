// Will print a vector, transposed.
public static void print2DVectorTranspose(double[][] Matrix) {
    int n = Matrix.length;
    System.out.println();
    DecimalFormat fmt = new DecimalFormat("0.####");
    fmt.setMinimumFractionDigits(4);
    for (int i=0; i< n; i++) {          
        System.out.print("[ ");
        System.out.print("{");
        System.out.print(fmt.format(Matrix[0][i]));
        System.out.print("} ");         
        System.out.print("]");  
    }
    System.out.println();
}