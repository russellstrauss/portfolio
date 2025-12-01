double[][] QRMinusH = subtractMatrix(Z, Hilbert2);
double InfNormofQRMinusH = normOfInfinity(QRMinusH);
System.out.println("The infinite norm of [QR - H]:");
System.out.println(InfNormofQRMinusH);