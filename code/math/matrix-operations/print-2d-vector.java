// Will print a passed in vector.
public static void printVector(double[] Vector) {
    DecimalFormat fmt = new DecimalFormat("0.####");
    fmt.setMinimumFractionDigits(4);
    System.out.println();
    for (int i=0; i<Vector.length; i++) {           
        System.out.print("[ ");
            System.out.print("{");
            System.out.print(fmt.format(Vector[i]));
            System.out.print("} ");
            System.out.print("]");
            System.out.println();
    }
    System.out.println();
}