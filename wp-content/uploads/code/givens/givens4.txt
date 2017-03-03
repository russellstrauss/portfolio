			System.out.println("G" + iteration + ":");
			printMatrix(Gn);            
			
			An = matrixMultiplication(Gn, An);
			
			System.out.println("A" + iteration + ":");
			printMatrix(An);                
			 
			Q = matrixMultiplication(Gn, Q);