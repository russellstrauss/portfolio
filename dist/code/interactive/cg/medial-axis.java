// Calculating arcs:

vec AD = V(A,D);
vec AB = V(A,B);
vec CD = V(C,D);

float nAB = d(A,B);
float nAD = d(A,D);
float nCD = d(C,D);

float s = (((nAD*nAD) - (nAB * nAB))* nCD) / (2*( nAB*nCD-dot(V(A,D),V(C,D)) ));
vec norm1 = U(V(C,D));     
pt Q = T(D, s, norm1);
noFill();
showPt(Q, black);
text("Q", Q.x+5, Q.y+5);

float nCB = d(C,B);

float s2 = (((nCB*nCB) - (nCD * nCD))* nAB) / (2*( nCD*nAB-dot(V(C,B),V(A,B)) ));
vec norm2 = U(V(A,B));     
pt R = T(B, s2, norm2);
noFill();
showPt(R, black);
text("R", R.x+5, R.y+5);

// find point E and point F
vec RC = U(R,C);
vec QA = U(Q, A);
pt E=Q, F=R;
E = T(Q, d(Q,D), QA);
F = T(R, d(R,B), RC);
showPt(E, black);
showPt(F, black);
fill(#888888);
text("F", E.x+5, E.y+5);
text("E", F.x+5, F.y+5);

//drawing the arcs:
pt[] blueArc = createArc(Q, d(Q,D), D, E, blue);
pt[] orangeArc = createArc(R, d(R,B), B, F, orange);

//drawing the medial axis:
pt[] midpoints = new pt[subsections+1];
vec[] diameterVectors = new vec[subsections+1];
vec[] radiusVectors = new vec[subsections+1];
pt[] medial = new pt[subsections+1];
float[] medialRadius = new float[subsections+1];
for (int i=0; i<subsections+1; i++) {
	diameterVectors[i] = V(orangeArc[i], blueArc[subsections-i]);
	radiusVectors[i] = S(.5, diameterVectors[i]);
	
	vec BE = V(orangeArc[i], blueArc[subsections-i]);
	pt midpoint = T(orangeArc[i], .5, BE);
	midpoints[i] = midpoint;

	if (concave(D,E,Q)) {
			medial[i] = medialAxis(blueArc[i], Q, R, s2);
			medialRadius[i] = medialRadius(blueArc[i], Q, R, s2);
			//showPt(medial[i], black);
	}
	if (concave(B,F,R)) {
			medial[i] = medialAxis(orangeArc[i], R, Q, s);
			medialRadius[i] = medialRadius(orangeArc[i], R, Q, s);
			//showPt(medial[i], black);
	}
	else {
			medial[i] = P(0,0);
			medialRadius[i] = 0;
	}
	
	strokeWeight(1); stroke(black, 50); fill(yellow, 10); 
	ellipse(medial[i].x, medial[i].y, medialRadius[i], medialRadius[i]);
		
	//showing the 3D radius vectors:
	stroke(black);
	strokeWeight(1);
	//show(orangeArc[i], diameterVectors[i]);
	noFill();
}

float dist = n(radiusVectors[subsections/2]);
//createDisc(midpoints[subsections/2], dist, 10);


for (int i=0; i<subsections+1; i++) {
	stroke(maroon); strokeWeight(3);
	if (i != 0) 
		line(medial[i].x, medial[i].y, medial[i-1].x, medial[i-1].y);
}

//drawing the circles:
showArc(A, B, E, red);
showArc(C, D, F, green);

labelPoints();