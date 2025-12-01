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