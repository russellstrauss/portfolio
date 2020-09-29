pt[] subdivide(pt[] pts, int iterations) {

	pt[] subdivisions = pts.clone();

	for (int i=0; i<iterations; i++) {
		subdivisions = refine(pts);
		subdivisions = tuck(subdivisions, .5);
		subdivisions = tuck(subdivisions, -.5);
	}
	return subdivisions;
}

pt[] refine(pt[] points) {

	pt[] refined = new pt[points.length*2-1];

	for (int i=0; i<refined.length; i+=2) refined[i] = points[i/2];
	for (int i=1; i<refined.length-1; i+=2) refined[i] = M(refined[i-1], refined[i+1]);
	
	return refined;
}

pt[] tuck(pt[] points, float s) {
	
	pt[] tucked = points.clone();

	for (int i=1; i<tucked.length-1; i++) {
		vec MB = V(points[i], M(points[i-1], points[i+1]));
		tucked[i] = T(points[i], s, MB);
	}
	return tucked;
}