import java.util.Scanner;
import java.text.*;
 
/** ==================================================
 ** ==  ALL CODE COPYRIGHT RUSSELL STRAUSS 2009  ==
 ** ==================================================
 */
 
 
public class LU {
 
    public static void main(String[] args)  {
 
        DecimalFormat fmt = new DecimalFormat("0.####");
 
        Scanner scan = new Scanner (System.in);
        System.out.println("In an nxn Hilbert matrix, how many dimensions?");
        int n = scan.nextInt();
        System.out.println();
        double[][] Hilbert = new double[n][n];
        double[][]HCopy = new double[n][n];
         
        System.out.println("Number of rows and columns in our original Hilbert matrix: " + n + " x " + n + ".");
        System.out.println("Note: Only displaying four decimal places for organization, but no accuracy is lost.");
        System.out.println();       
 
 
        // Construction of the Hilbert Matrix, our starting point:
        System.out.println("The starting Hilbert matrix:");
        System.out.println();
        for (int i=0; i<n; i++) {           
            System.out.print("[ ");
            for (int j=0; j<n; j++) {
                double Hij = (1/(((double)i+1)+((double)j+1)-1));
                Hilbert[i][j] = Hij;
                HCopy[i][j] = Hij;
                fmt.setMinimumFractionDigits(4);
                System.out.print("{");
                System.out.print(fmt.format(Hilbert[i][j]));
                System.out.print("} ");
            }           
            System.out.print("]");
            System.out.println();   
             
        }
 
 
 
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
 
 
        //THE IDENTITY MATRIX:
        System.out.println();
        System.out.println("The identity matrix:");
        double[][] I = new double[n][n];
        for (int i=0; i<n; i++){
            for (int j=0; j<n; j++){
                if (i==j){
                    I[i][j] = 1;
                }
                else{
                    I[i][j] = 0;
                }
            }
        }
        printMatrix(I);
     
        System.out.println();
        System.out.println("The Hilbert matrix, decomposed:");
        System.out.println("The L matrix:");
        System.out.println();
     
     
        // ROW-REDUCING THE HILBERT MATRIX:
        // FINDING U:
         
         
        System.out.println("Hilbert =");
        printMatrix(Hilbert);
         
        double[][] L = findL(HCopy);
        double[][] U = findU(Hilbert);
        double[][] LU = matrixMultiplication(L, U);
         
         
        System.out.println("L=");
        printMatrix(L);
        System.out.println("U=");
        printMatrix(U);
        System.out.println("LxU=");
        printMatrix(LU);
          
    } //END OF MAIN METHOD
     
    public static double[][] findL( double[][] Matrix) {
        int n = Matrix.length;
        double[][] L = new double[n][n];
        for (int i=0; i<n; i++) {
            L[i][0] = (Matrix[i][0]/Matrix[0][0]);
        }
         
        double[][] tempL = new double[n][n];
        double[][] I = new double[n][n];
        for (int id=0; id<n; id++){
            for (int jd=0; jd<n; jd++){
                if (id==jd){
                    I[id][jd] = 1;
                }
                else{
                    I[id][jd] = 0;
                }
            }
        }
        for (int copy1=0; copy1<n; copy1++) {
            for (int copy2=0; copy2<n; copy2++) {   
                tempL[copy1][copy2] = I[copy1][copy2];
            }
        }
         
        for (int j=0; j < (n-1); j++) { //<==looking at the jth column of the matrix 
            for (int i=j+1; i < n; i++) {//subtracting row j
                double a = Matrix[i][j]/Matrix[j][j];
                Matrix[i][j] = 0;
                for (int k=j+1; k < n; k++) {
                    Matrix[i][k] = Matrix[i][k] - a*Matrix[j][k];
                }
            }
            for (int l=j+1; l<n-1; l++) {
                tempL[l+1][j+1]=(double)Matrix[l+1][j+1]/(double)Matrix[j+1][j+1];          
            }
            L = matrixMultiplication(L, tempL);
        }   
        return L;
    }
 
 
    public static double[][] findU( double[][] Matrix) {
        int n = Matrix.length;
        for (int j=0; j < (n-1); j++) { //<==looking at the jth column of the matrix
            for (int i=j+1; i < n; i++) {//subtracting row j
                double a = Matrix[i][j]/Matrix[j][j];
                Matrix[i][j] = 0;
                for (int k=j+1; k < n; k++) {
                    Matrix[i][k] = Matrix[i][k] - a*Matrix[j][k];
                }
            }
        }
        return Matrix;
    }
     
     
} //end of class