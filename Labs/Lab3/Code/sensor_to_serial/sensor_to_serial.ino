void setup() {
  Serial.begin(9600); 
}

void loop() {
  Serial.println(map(analogRead(A0), 0, 1023, 0, 255));
  delay(200);
}
