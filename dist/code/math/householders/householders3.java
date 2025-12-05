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
} // close if