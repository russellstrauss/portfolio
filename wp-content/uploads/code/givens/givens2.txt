// The for loops that begin the Givens rotation matrices.
 
for (int i=0; i<n; i++) {
        for (int j=(n-1); j>i; j--) {                                       
             
            a = An[j-1][i];
            b = An[j][i];   
            cosX = a/(Math.sqrt(a*a+b*b));
            sinX = -b/(Math.sqrt(a*a+b*b));