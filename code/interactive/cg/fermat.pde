  /** Project by Russell Strauss
  **
  **/
  
  PImage pic;
  pt A=P(100,200), B=P(300,200), C=P(200,360);
  pt X;  // point reference used to represent the point picked by a mouse click
  color lightBlue=#3F79A7;
  color brown=#8B5701, darkBlue2=#052743, red=#DB0404, magenta=#FF00FB, darkBlue=#03365F, cyan=#00FDFF, green=#00FF01, greyBlue=#51728B, white = 255;
  float pathLength = 0;
  
  void setup() 
  {
    size(1920,1080);
    PFont font = loadFont("Batang-16.vlw"); textFont(font, 16);
    pic = loadImage("data/pic.jpg");
  }
  
  void draw() 
  {
    background(#001B31);
    fill(lightBlue); 
    stroke(greyBlue); // color of line borders
    strokeWeight(4); // triangle border thickness
    show(A,B,C); // show the triangle
    
    // labelling the vertices and edges of the triangle
    fill(white); 
    text("A", A.x - 20, A.y - 20);
    text("B", B.x + 20, B.y - 20);
    text("C", C.x - 5, C.y + 40);
    
    fill(greyBlue);
    shortestPath(A,B,C); // shortest path function
    
    fill(255); // text fill
    // Labelling the project
    text("CS3451 Fall 2010: Project 1",5,20);
    text("Minimum path",5,20+20);
    text("Russell Strauss",5,20+40);
    image(pic, width-pic.width, 0);    
  };  // end of draw
  
  void mousePressed() { 
    X=A;  // 28 assigns X to represent point A
    pt M = P(mouseX,mouseY); // 32 current mouse location
    if(d(M,B)<d(M,X)) X=B; // 33 updates X if B is closer to the mouse (the distance function must be written)
    if(d(M,C)<d(M,X)) X=C; // 34 updates X if C is closer to the mouse 
    } // 27
   
  void mouseDragged() { // 29 interrupt executed when the mouse is moved while the mouse button is pressed
    drag(X); // 30 procedure (to be written) for displacing point X by the displacement of the mouse 
  }
  
  // GEOMOETRIC UTILITIES
  pt P(float x, float y) {return new pt(x,y); };   // an easier point constructor pt Q = P(1,2);   
  vec V(float x, float y) {return new vec(x,y); };  // an easier vector constructor vec U = V(1,2);                                                      
  vec V(pt P, pt Q) {return V(Q.x-P.x,Q.y-P.y);};   // to make vectvector PQ from P to Q
  void show(pt P, float r) {ellipse(P.x, P.y, 2*r, 2*r);}; // 23 draws a disk of radius r around point P
  void show(pt P) {show(P,4);};                     // 24 draws point P
  void drag(pt P) {P.x+=mouseX-pmouseX; P.y+=mouseY-pmouseY; } // 31* updates coordinates of P by latest mouse displacement (to try, keep mouse button pressed and drag mouse)
  float d(pt P, pt Q) {return sqrt(sq(Q.x-P.x)+sq(Q.y-P.y));};   // 35* returns distance between two points
  void show(pt A, pt B, pt C) {beginShape(); v(A); v(B); v(C); endShape(CLOSE);} // 39 draws closed-loop polygon using v() to be written
  void v(pt P) {vertex(P.x,P.y);} //40* call to the graphics subsystem indicating the next location for drawing
  void show(pt P, pt Q) {line(P.x,P.y,Q.x,Q.y); };  // 49* draws line from P to Q
  pt A(pt A, pt B, pt C) {return P((A.x+B.x+C.x)/3,(A.y+B.y+C.y)/3);} // 64* computes average of 3 points
  vec R(vec V) {return new vec(-V.y,V.x);}; // rotate vector 90 degrees clockwise on-screen
  float dot(vec U, vec V) {return U.x*V.x+U.y*V.y; }; // vector dot product
  float n(vec V) {return sqrt(dot(V,V));}; // norm of a vector
  vec U(vec V) {float n = n(V); if (n==0) return new vec(0,0); else return new vec(V.x/n,V.y/n);}; // U(V): V/||V|| (Unit vector : normalized version of V)
  void show(pt P, vec V) {line(P.x,P.y,P.x+V.x,P.y+V.y); } // show vector originating from point P
  vec S(float s,vec V) {return new vec(s*V.x,s*V.y);}; 
  float angle (vec U, vec V) {return atan2(dot(R(U),V),dot(U,V)); }; // angle(U,V): angle <U,V> (between -PI and PI)
  float angle(pt A, pt B, pt C) {return  angle(V(B,A),V(B,C)); }  // angle(A,B,C): angle <BA,BC>
  int toDeg(float a) {return int(a*180/PI);} // convert radians to degrees
  float round(float number, float decimal) {return (float)(round((number*pow(10, decimal))))/pow(10, decimal);} 
  void label(pt P, String S) {text(S, P.x-4,P.y+6.5); }   // label(P,S): writes string S next to P on the screen ( for example label(P[i],str(i));)
  float cross2D(vec A, vec B) {return (A.x*B.y-A.y*B.x);}
  pt T(pt P, vec V) {return P(P.x + V.x, P.y + V.y); }                                                 // T(P,V): P+V (P transalted by vector V)
  pt T(pt P, float s, vec V) {return T(P,S(s,V)); }  
  pt intersection(pt a, pt b, pt c, pt d) 
  {
           vec AB = V(a,b); vec AC = V(a,c); vec CD = V(c,d);
           float S = (cross2D(AC, CD)/cross2D(AB, CD));
           return T(a, S, AB);
  }
  float grahamScan(pt A, pt B, pt C) { return ((B.x - A.x)*(C.y - A.y) - (B.y - A.y)*(C.x - A.x)); }
  float det(float a, float b, float c, float d) { return (a*d-c*b);}
  class pt 
  {                                       // 13 class for 2D points
     float x=0,y=0;                                // 14 coordinates : can be accessed as Q.x and Q.y for a point Q
     pt (float px, float py) {x = px; y = py;};    // 15 point constructor method 
  }
     
  class vec 
  {
     float x=0,y=0;
     vec (float px, float py) {x = px; y = py;}; 
  }
  
  void shortestPath(pt A, pt B, pt C) 
  { 
     pt Origin = P(0,0);
     // creating vectors made by the three sides of the tirangle
     vec AB = V(A,B); vec BC = V(B,C); vec CA = V(C,A);
     // calculate the angle between each pair of sides of the triangle
     float angleABC = abs(angle(A,B,C));
     float angleBCA = abs(angle(B,C,A));
     float angleCAB = abs(angle(C,A,B));
     
     stroke(darkBlue2); strokeWeight(2); fill(white); 
     text("Total length of paths between points = " + round(pathLength,2),5,20+60);
     
     // First, find the mid point of the edge of the triangle:
     //mCB stands for midpoint of triangle edge CB
     pt mCB = P((C.x+B.x)/2, (C.y+B.y)/2);
     // Creating the normal vector:
     vec nCB = V(mCB,B); // create vector from the midpoint of CB to B. nCB stands for normal to triangle edge CB
     // Graham scan is an algorithm that determines whether the points of the triangle are going clockwise or counter clockwise
     // so we know which way to rotate the equilateral triangles.
     if (grahamScan(A, B, C) > 1) nCB = R(nCB); // rotate that vector to make a vector normal to the edge of the triangle
     else nCB = R(R(R(nCB)));
     // The next step after rotating the vector, normalizes the vector, then multiplies it
     // by the height (scalar) of the equilateral triangle to get the vertex of that eq. triangle.
     nCB = U(nCB); // normalize it
     // The long digit is sqrt(3)/2, as determined by Law of Cosines. This step calculates
     // the height of the eq. triangle.
     nCB = S(d(C,B)*.866025403784439, nCB);  
     pt vCB = T(mCB, nCB);
     
     // Now repeat for other two edges:
     pt mAC = P((A.x+C.x)/2, (A.y+C.y)/2);
     vec nAC = V(mAC,C);
     if (grahamScan(A, B, C) > 1) nAC = R(nAC);
     else nAC = R(R(R(nAC)));
     nAC = U(nAC);
     nAC = S(d(A,C)*.866025403784439, nAC);
     pt vAC = T(mAC, nAC);

     pt mAB = P((A.x+B.x)/2, (A.y+B.y)/2);
     vec nAB = V(mAB,A);
     if (grahamScan(A, B, C) > 1) nAB = R(nAB);
     else nAB = R(R(R(nAB)));
     nAB = U(nAB);
     nAB = S(d(A,B)*.866025403784439, nAB);
     pt vAB = T(mAB, nAB);


    if (toDeg(angleABC) < 120 && toDeg(angleBCA) < 120 && toDeg(angleCAB) < 120)
    {
           // Drawing the equilateral triangles created by each side of the original triangle.
           stroke(#002062);
           strokeWeight(1);
           show(C, vCB); show(B, vCB); show(A, vAC); show(C, vAC); show(A, vAB); show(B, vAB);   
           // Drawing the lines connecting the vertex of the equilateral triangles to the opposite
           // vertex of the original triangle.      
           stroke(#393939);
           show(vCB, A); show(vAC, B); show(vAB, C);
       
           // Find the intersecting point of where the eq. triangle line crosses the edge
           // of the original triangle
           pt ACCrossPoint = intersection(C, A, vAC, B); 
           pt BCCrossPoint = intersection(B, C, vCB, A);
           pt ABCrossPoint = intersection(A, B, vAB, C);
           pt fermatPoint = intersection(BCCrossPoint, A, ABCrossPoint, C);
           stroke(#48D0FF); strokeWeight(3);
           // Create the paths from the fermat point
           show(fermatPoint, V(fermatPoint, A));
           show(fermatPoint, V(fermatPoint, B));
           show(fermatPoint, V(fermatPoint, C));
           pathLength = d(fermatPoint, A) + d(fermatPoint, B) + d(fermatPoint, C);     
     }
     
     // Creating the fermat point if the triangle has an angle greater than 120 degrees.
     stroke(#48D0FF); strokeWeight(3);
     if (toDeg(angleABC) >= 120)
     {
          show(A, V(A,B));
          show(B, V(B,C));
          pathLength = d(A,B) + d(B,C);       
     }
     
     if (toDeg(angleBCA) >=120)
     {
         show(B, V(B,C));
         show(C, V(C,A));
         pathLength = d(B,C) + d(C,A);
     }
      
     if (toDeg(angleCAB) >=120)
     {
          show(C, V(C, A));
          show(A, V(A, B));
          pathLength = d(C,A) + d(A,B);
     }   
     
} 
     
     
     
     
     
     
     
     
