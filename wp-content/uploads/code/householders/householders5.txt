import java.text.*;
import java.util.*;
 
public class Householder {
 
    public static void main(String[] args)  {
 
 
        DecimalFormat fmt = new DecimalFormat("0.####");
 
        Scanner scan = new Scanner (System.in);
        System.out.println("In an n x n Hilbert matrix, how many dimensions?");
        int n = scan.nextInt();
        System.out.println();
        double[][] Hilbert = new double[n][n];  
        double[][] Hilbert2 = new double[n][n];     
        double[][] Q = new double[n][n];
        double[][] R = new double[n][n];
         
        //Starting Q out as the identity:
        for (int i=0; i<n; i++){
            for (int j=0; j<n; j++){
                if (i==j){
                    Q[i][j] = 1;
                }
                else{
                    Q[i][j] = 0;
                }
            }
        }
         
        //Creating the vector b, given in the problem statement.
        double[] b = new double[n];
        for (int i=0; i<n; i++) {           
            System.out.print("[ ");
 
            double Bi = (Math.pow(.1, ((double)n)/3));
            b[i] = Bi;
            System.out.print("{");
            System.out.print(b[i]);
            System.out.print("} ");
                     
            System.out.print("]");
            System.out.println();               
        }       
 
         
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
                fmt.setMinimumFractionDigits(4);
                System.out.print("{");
                System.out.print(fmt.format(Hilbert[i][j]));
                System.out.print("} ");
            }           
            System.out.print("]");
            System.out.println();   
        }
        System.out.println("---------------------------------------------------------");
         
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
         
     
        double[][] HCopy = Hilbert;
        for (int i=0; i<n; i++) {
            for (int j=0; j<n; j++) {
                HCopy[i][j] = Hilbert[i][j];
            }
        }
         
        /** This code creates a vector of matrices so that Hn does not get lost while Householder
        * is calculating the reflection matrices. For example, as we proceed through the algorithm,
        * Hn will be modified in each step along the way, finally resulting in Q. Then if we would 
        * like to multiply Hn...H3*H2*H1 to find R, we won't be able to if Hn is not stored somewhere,
        * so I used this vector of matrices to store each Hn along the way in order.
        */
     
        double[][][] VectorofHs = new double[n][n][n];
        double[][] A = new double[n][n];
        for (int copy1=0; copy1<n; copy1++) {
            for (int copy2=0; copy2<n; copy2++) {   
                    A[copy1][copy2] = Hilbert[copy1][copy2];
            }
        }
         
        // Beginning the Householder reflections:
         
        //For matrices ai:
        for (int i=0; i<n; i++) {       
            double[] X = new double[n];
            //For vector X:
            for (int x=0; x<n; x++) {
                X[x] = HCopy[x][i];
                if (x<i) {
                    X[x] = 0;
                }
            }
             
            int y = i+1;
             
            double[] C = new double[n];
            for (int c=0; c<n; c++) {
                if (c==i) {
                    C[i] = norm(X);
                }
                else {
                    C[c] = 0;
                }
            }
             
         
            if (i!= n-1) {
                double[][] U = new double[n][1];
                double[] U1 = subtractVector(X, C);
         
                //Turning U into a 2D array vector:
                for (int l=0; l<n; l++) {
                    U[l][0] = U1[l];
                }
                double[][] Ut = new double[1][n];
                double[] u1 = subtractVector(X, C);
                //Turning Ut into a 2D array vector:
                for (int m=0; m<n; m++) {
                    Ut[0][m] = u1[m];
                }
                double[][] UUt = multiplyUUt(U, Ut);
                double TwoDivNorm2 = 2/(norm2D(U)*norm2D(U));
                double[][] TwoDivNormTimesUUt = scalar(UUt, TwoDivNorm2);
                double[][]Han = subtractMatrix(I, TwoDivNormTimesUUt);                          
         
                 
                for (int row=0; row<n; row++) {
                    for (int column=0; column<n; column++) {
                        if (row==column && row<=(i-1)) {
                            Han[row][column] = 1;
                        } 
                    }
                }
                 
                double[][] Hn = matrixMultiplication(Han, A);
                R = matrixMultiplication(Han, A);
                 
                for (int copy1=0; copy1<n; copy1++) {
                    for (int copy2=0; copy2<n; copy2++) {   
                        A[copy1][copy2] = Hn[copy1][copy2];
                    }
                }
                 
                //Setting Hn back to the HCopy to start over:
                for (int copy1=0; copy1<n; copy1++) {
                    for (int copy2=0; copy2<n; copy2++) {   
                        HCopy[copy1][copy2] = Hn[copy1][copy2];
                    }
                }                               
                //Inserting Hn into the matrix Vector.
                for (int copy1=0; copy1<n; copy1++) {
                    for (int copy2=0; copy2<n; copy2++) {
                        VectorofHs[copy1][copy2][i] = Hn[copy1][copy2];
                    }
                }   
                 
                for (int copy1=0; copy1<n; copy1++) {
                    for (int copy2=0; copy2<n; copy2++) {   
                        R[copy1][copy2] = Hn[copy1][copy2];
                    }
                }                           
                Q = matrixMultiplication(Q, Han);
            }           
        }
 
         
         
        print3DMatrix(VectorofHs);
         
        System.out.print("Q:");
        printMatrix(Q);
        System.out.println();
        System.out.print("R:");
        printMatrix(R);
         
        double[][] Z = matrixMultiplication(Q, R);
        System.out.println();
        System.out.print("QxR:");
        printMatrix(Z);
         
        // THE HILBERT MATRIX AGAIN:
        System.out.println();
        System.out.print("Compared to the original Hilbert matrix:");
        System.out.println();
        for (int i=0; i<n; i++) {           
            System.out.print("[ ");
            for (int j=0; j<n; j++) {
                double Hij2 = (1/(((double)i+1)+((double)j+1)-1));
                Hilbert2[i][j] = Hij2;
                fmt.setMinimumFractionDigits(4);
                System.out.print("{");
                System.out.print(fmt.format(Hilbert2[i][j]));
                System.out.print("} ");
            }           
            System.out.print("]");
            System.out.println();   
        }
        System.out.println("---------------------------------------------------------");    
         
         
         
        double[][] QRMinusH = subtractMatrix(Z, Hilbert2);
        double InfNormofQRMinusH = normOfInfinity(QRMinusH);
        System.out.println("The infinite norm of [QR - H]:");
        System.out.println(InfNormofQRMinusH);
         
         
 
         
        double[][] Qt = transpose(Q);
        double[] y = vectorMultiplication(Qt, b);
         
        double[] x = solveX(R, y);
         
        System.out.println("Qt");
        printMatrix(Qt);
 
        System.out.println("b");
        printVector(b);
 
        System.out.println("R");
        printMatrix(R);
         
        System.out.println("y");
        printVector(y);
         
        System.out.println("X");
        printVector(x);
         
        System.out.println("Rx");
        double[] Rx = vectorMultiplication(R, x);
        printVector(Rx);
         
        double[] Hx = vectorMultiplication(Hilbert2, x);
        double[] Hxb = subtractVector(Hx, b);
        double HxbNorm = maxNorm2D(Hxb);
        System.out.println("The infinite norm of [Hx - b]:");
        System.out.println(HxbNorm);        
 
         
         
         
    } //end of main method
} //end of class