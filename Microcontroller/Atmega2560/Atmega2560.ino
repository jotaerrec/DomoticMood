#include <SoftwareSerial.h>

/*DEFINICIÓN DE PINES*/
#define rxPin 2                                                       //Pines para el envío se Arduino Uno a NodeMCU.
#define txPin 3                                       // Trabajamos con el DHT 11. 

/*DECLARACIÓN DE VARIABLES GLOBALES*/
unsigned int valor_medido;                                     //Valor obtenido al leer por A0.
int ledPin = 10;                                                     //Pin de conexión del led de prueba.
float LR;                                                                   //Variable para almacenar la luminosidad relativa.
int val;                                          //Variable empleada para el mapeo del valor medido para enviarlo al pin 10.
const int DHTPin = 5;                           //Pin de conexión a Arduino para tomar la lectura.
float h;
float t;

/*PROTOTIPADO*/

SoftwareSerial Trans(rxPin, txPin);               //Definimos puerto serie virtual. Pines para Rx y Tx.
                                                                  //inicializarlo.

void setup()
{
  pinMode (rxPin , INPUT)
  pinMode (txPin , OUTPUT);
  Serial.begin(9600);
  Trans.begin(9600);                            //Velocidad de envío para la transmisión al NodeMCU.
}

void loop()
{
  {
    delay(2000);                                 // Wait a few seconds between measurements.
    h = dht.readHumidity();                      //Leemos humedad y temperatura respectivamente.
    t = dht.readTemperature();
    if (isnan(h) || isnan(t))                    //Si no se lee valor numérico indicamos el fallo y volvemos a 
                                                         //comprobar.
    {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }
    Serial.print("Humedad: ");
    Serial.print(h);
    Serial.print(" %\t");
    Serial.print("Temperatura: ");
    Serial.print(t);
    Serial.print(" *C ");
    Serial.print(" \n");
    delay(2000);
    Trans.println(h);                                               //Transmisión del valor a NodeMCU.
  } delay(1000);

  { valor_medido = analogRead(A0);                   //Valor de luminosidad medido en A0
    LR = (valor_medido * 100.0) / 1023.0;           //Luminosidad medida en tanto por ciento
    Serial.print("Luminosidad relativa: ");             //Para mostrar el valor en el monitor serie de arduino.
    Serial.print(LR);
    Serial.print(" %");
    Serial.print(" \n");
    delay(1000);
     
  } delay(1000);
}
