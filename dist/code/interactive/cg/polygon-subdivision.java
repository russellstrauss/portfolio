ArrayList subdivision(int r, float s) {

	Q.clear();
	for (int i=0; i<10; i++) {
		Q.add(new pt(x[i], y[i]));
	}
	
	if (s/.5 == 0.0) subColor = red;
	if (s/.5 == 1.0) subColor = blue;
	if (s/.5 == 2.0) subColor = green;
	
	for (int iteration = 0; iteration < r; iteration++) {
		R.clear();
		
		// Creates an array of empty points twice the length of Q to begin inserting vertices and their midpoints.
		for (int i = 0; i<Q.size(); i++) {
			R.add(P(0,0));
			R.add(P(0,0));
		} 
		
		for (int i = 0; i<Q.size(); i++) {
			
			// for the first case in the loop; drawing the new first vertex in the polygon:
			if (i == 0) {
				float avgX = (0.75*(((pt)Q.get(i)).x)) + (0.125*(((pt)Q.get(Q.size()-1)).x)) + (0.125*(((pt)Q.get(i+1)).x));
				float avgY = (0.75*(((pt)Q.get(i)).y)) + (0.125*(((pt)Q.get(Q.size()-1)).y)) + (0.125*(((pt)Q.get(i+1)).y));
				pt temp = P(avgX,avgY);
				R.set(2*i, temp);
			}
			// for the last case in the loop; drawing the new last vertex in the polygon:
			else if (i == Q.size()-1) {
				float avgX = (0.75*(((pt)Q.get(i)).x)) + (0.125*(((pt)Q.get(i-1)).x)) + (0.125*(((pt)Q.get(0)).x));
				float avgY = (0.75*(((pt)Q.get(i)).y)) + (0.125*(((pt)Q.get(i-1)).y)) + (0.125*(((pt)Q.get(0)).y));
				pt temp = P(avgX,avgY);
				R.set(2*i, temp);
			}
			// for every case in between:
			else {
				// calculates the weighted average of the cubic b-spline with the equation P(i) = (1/8)(i-1) + (3/4)(i) + (1/8)(i+1)
				float avgX = (0.75*(((pt)Q.get(i)).x)) + (0.125*(((pt)Q.get(i-1)).x)) + (0.125*(((pt)Q.get(i+1)).x));
				float avgY = (0.75*(((pt)Q.get(i)).y)) + (0.125*(((pt)Q.get(i-1)).y)) + (0.125*(((pt)Q.get(i+1)).y));
				pt temp = P(avgX,avgY);
				R.set(2*i, temp);
			}
		}
		
		untuck(s);
		
		// Clear Q and updates it with all the new vertices:
		Q.clear();
		for (int i = 0; i <R.size(); i++) {
			Q.add(R.get(i));  
		}
	}
	return untuckVectors;
} 

void refine() {
	// Calculates all the midpoints between every vertex (Q[]) and adds them to R[].
	for (int i = 0; i<Q.size(); i++) {
		if (i == Q.size()-1) {
			pt avg = A(((pt)Q.get(0)),((pt)Q.get(Q.size()-1)));
			R.set((R.size()-1), avg);
		}
		else {
			pt avg = A(((pt)Q.get(i)),((pt)Q.get(i+1)));
			R.set(((2*i)+1), avg); 
		}
	}
}

void untuck(float s) {
	untuckVectors.clear();
	vectors.clear();
	
	// Initilizes ArrayLists with empty points.
	for (int i=0; i<R.size(); i++) {
		vectors.add( V( P(0,0), P(0,0) ) );
		untuckVectors.add(P(0,0));
	}
	
	for (int i=0; i<R.size(); i+=2) { 
		if (i == 0) {
			vectors.set(i, V( (pt)R.get(i), (pt)Q.get(0) ));
			untuckVectors.set(i, T( (pt)R.get(i), s, (vec)vectors.get(i)));
		}
		
		else {
			vectors.set(i, V( (pt)R.get(i), (pt)Q.get(i/2) ));
			untuckVectors.set(i,T( (pt)R.get(i), s, (vec)vectors.get(i)));
		}
	} 

	// Calculates the midpoints in between every vertex:
	refine(); 

	for (int i=1; i<R.size(); i+=2) {
		if (i==R.size()-1) {
			float vecX = ( ((vec)vectors.get(0)).x + (((vec)vectors.get(i-1)).x) ) / 2.0;
			float vecY = ( ((vec)vectors.get(0)).y + (((vec)vectors.get(i-1)).y) ) / 2.0;
			vec finalValue = V(P(0,0),P(0,0));
			finalValue.x = vecX;
			finalValue.y = vecY; 
			
			vectors.set(i, finalValue);
			untuckVectors.set(i, T( (pt)R.get(i), s, finalValue) );
		}
		else {
			float vecX = ( ((vec)vectors.get(i+1)).x + (((vec)vectors.get(i-1)).x) ) / 2.0;
			float vecY = ( ((vec)vectors.get(i+1)).y + (((vec)vectors.get(i-1)).y) ) / 2.0;
			vec finalValue = V(P(0,0),P(0,0));
			finalValue.x = vecX;
			finalValue.y = vecY;
			
			vectors.set(i, finalValue);
			untuckVectors.set(i, T( (pt)R.get(i), 0.5, finalValue) );
		}
	} 
}