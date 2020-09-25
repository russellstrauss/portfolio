// VECTOR B:
System.out.println();
System.out.println("The vector b in the form of .1^(n/3).");
System.out.println();
double[] bVector = new double[n];
for (int i=0; i<n; i++) {           
    System.out.print("[ ");
 
        double Bi = (Math.pow(.1, ((double)n)/3));
        bVector[i] = Bi;
        System.out.print("{");
        System.out.print(bVector[i]);
        System.out.print("} ");
                 
        System.out.print("]");
        System.out.println();               
}