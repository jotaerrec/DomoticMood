void setup() {
  Serial.begin(9600);  

}

void loop() {
  if(Serial.available() > 0 ){
    Serial.print("Hola\n");
  }
  delay(1000);

}
