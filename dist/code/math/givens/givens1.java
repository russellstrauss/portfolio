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