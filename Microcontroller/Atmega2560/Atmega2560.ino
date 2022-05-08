#include <SoftwareSerial.h>

/*DEFINICIÓN DE PINES*/
#define rxPin 2                                   //Pines para el envío se Arduino Uno al ESP-01.
#define txPin 3                                      

/*DEFINICIÓN DE VARIABLES*/
const int BUFFER_SIZE = 100;
char buf[BUFFER_SIZE];


SoftwareSerial Trans(rxPin, txPin);               //Definimos puerto serie virtual. Pines para Rx y Tx.
                                                                  //inicializarlo.

void setup()
{
  pinMode (rxPin , INPUT);
  pinMode (txPin , OUTPUT);
  Serial.begin(9600);
  Trans.begin(9600);                            //Velocidad de envío para la transmisión al ESP-01.
}

void loop()
{
  if(Serial.available() > 0 ){
    int rlength = Serial.readBytesUntil('\n',buf,BUFFER_SIZE);
    Serial.print("I received : ");
    for(int i=0; i< rlength;i++){
      Serial.print(buf[i]);
    }
    Serial.print("\n");
  }
  if(Trans.available() > 0 ){
    int rlength = Trans.readBytesUntil('\n',buf,BUFFER_SIZE);
    Serial.print("I received : ");
    for(int i=0; i< rlength;i++){
      Serial.print(buf[i]);
    }
    Serial.print("\n");
  }
}
