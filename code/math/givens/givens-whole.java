import java.util.*;
import java.text.*;
 
/** ==================================================
 ** ==    ALL CODE COPYRIGHT RUSSELL STRAUSS 2009   ==
 ** ==================================================
 */
 
 
public class Givens {
 
    public static void main(String[] args) {
     
        /** Asking for the number of dimensions to work with the computing factorization of the Hilbert matrix,
        * formatting the numbers and matrices, and computing/printing the Hilbert matrix:
        */
 
        DecimalFormat fmt = new DecimalFormat("0.####");
        Scanner scan = new Scanner (System.in);
        System.out.println("In an nxn Hilbert matrix, how many dimensions, n?");
        int n = scan.nextInt();
 
        double[][] Hilbert = new double[n][n];  
        double[][] Gn = new double[n][n];
        double[][] An = new double[n][n];
        double[][] Q = new double[n][n];
         
        System.out.println(); 
        System.out.println("Number of rows and columns in our original Hilbert matrix: " + n + " x " + n + ".");
        System.out.println("Note: Only displaying four decimal places for organization, but no accuracy is lost.");
        System.out.println();       
 
 
        // THE HILBERT MATRIX:
        System.out.println("The starting Hilbert matrix:");
        System.out.println();
        for (int i=0; i<n; i++) {
            System.out.print("[ ");
            for (int j=0; j<n; j++) {
                double Hij = (1/(((double)i+1)+((double)j+1)-1));
                Hilbert[i][j] = Hij;
                An[i][j] = Hij;
                fmt.setMinimumFractionDigits(4);
                System.out.print("{");
                System.out.print(fmt.format(Hilbert[i][j]));
                System.out.print("} ");
            }           
        System.out.print("]");
        System.out.println();   
             
        }
        System.out.println("--------------------------------");     
         
        // Beginning to create Givens rotations:
 
        // The Gn matrix and the Q matrix will begin as the identity.
 
        for (int i=0; i<n; i++){
            for (int j=0; j<n; j++){
                if (i==j){
                    Gn[i][j] = 1;
                    Q[i][j] = 1;
                }
                else{
                    Gn[i][j] = 0;
                    Q[i][j] = 0;
                }
            }
        }
         
        int iteration = 1;
        double a = An[0][n-2];
        double b = An[0][n-1];
        double cosX;
        double sinX;
         
        // The for loops that begin the Givens rotation matrices.
 
        for (int i=0; i<n; i++) {
                for (int j=(n-1); j>i; j--) {                                       
                     
                    a = An[j-1][i];
                    b = An[j][i];   
                    cosX = a/(Math.sqrt(a*a+b*b));
                    sinX = -b/(Math.sqrt(a*a+b*b));
                     
                    Gn[j][j] = cosX;
                    Gn[j][j-1] = sinX;
                    Gn[j-1][j] = -sinX;
                    Gn[j-1][j-1] = cosX;
                     
                    System.out.println("G" + iteration + ":");
                    printMatrix(Gn);            
 
                    An = matrixMultiplication(Gn, An);
             
                    System.out.println("A" + iteration + ":");
                    printMatrix(An);                
                     
                    Q = matrixMultiplication(Gn, Q);
 
                    // Turning the Gn matrix back into the identity.
                     
                    for (int ident=0; ident<n; ident++){
                        for (int ident2=0; ident2<n; ident2++){
                            if (ident==ident2)
                                Gn[ident][ident2] = 1;
                            else
                                Gn[ident][ident2] = 0;
                        }
                    }           
                    iteration += 1;     
                }//end j    
        }//end i
         
         
        System.out.println("Q:");
        printMatrix(Q);
         
        System.out.println("R:");
        printMatrix(An);
         
        Q = transpose(Q);
        double[][] answer = matrixMultiplication(Q, An);
        System.out.println("Did it work? Q x R:");
        printMatrix(answer);
 
        // Calculating the maximum norm of QR-H.
         
        answer = subtractMatrix(answer, Hilbert);
        double maxNorm = normOfInfinity(answer);
        System.out.println();
        System.out.println("The maximum norm of QR - H:");
        System.out.println(maxNorm);
     
     
    } //end of main
} // end of Givens class