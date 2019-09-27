
void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  Serial.println(analogRead(A0));
  if (analogRead(A0) < 150) {
    digitalWrite(LED_BUILTIN, HIGH); 
  } else if (analogRead(A0) >= 150) {
    digitalWrite(LED_BUILTIN, LOW);
  }
}
