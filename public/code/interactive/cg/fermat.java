function shortestPath() {
	
	if (angleABC >= 120) {
		pt fermatPoint = B;
		float pathLength = d(C,B) + d(B,A);
		draw(AB, BC);
	}
	
	// Repeat for all three angles.
	if (angleABC < 120) {
		mAB = midpoint(A,B);
		vec triangleHeight = vector(mAB, A);
		float triangleHeight = rotate(triangleHeight);
		// In the full code, the Graham Scan algorithm is applied to determine which way to rotate the vector. {citation here}
		triangleHeight = normalize(triangleHeight);
		triangleHeight = scalar(d(A,B)*sqrt(3)/2, triangleHeight);
		pt outerVertex = translate(mAB, triangleHeight);
		vec fermatLineAB = vector(outerVertex, C);
		// Now repeat these steps for the other two sides of the triangle and determine the intersection of those three lines to find the Fermat Point.
	}

	pt fermatPoint = intersection(fermatLineAB, fermatLineBC, fermatLineCA);
	float pathLength = d(fermatPoint, A) + d(fermatPoint, B) + d(fermatPoint, C);
}
