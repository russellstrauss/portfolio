//For matrices an:
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