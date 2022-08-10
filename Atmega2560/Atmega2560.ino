// La velocidad depende del modelo de ESP-01
// siendo habituales 9600 y 115200
const int baudRate = 9600;
String readString;   
#include <SoftwareSerial.h>
SoftwareSerial softSerial(2, 3); // RX, TX
#define DEBUG(a) Serial.println(a);

void setup()
{
   Serial.begin(baudRate);
   softSerial.begin(baudRate);
}
//"hola,jajajaj,todobien"
//','
//0
String split (String &data, char pattern){
 int index = data.indexOf(pattern);
 int dataLength = data.length();
 String subS; 
 subS = data.substring(index+1,dataLength);
 data = data.substring(1,index);
 return subS;
}
void loop()
// enviar los datos de la consola serial al ESP-01, 
// y mostrar lo enviado por el ESP-01 a nuestra consola
{   
   if (softSerial.available())
   {
     String data = softSerial.readStringUntil('\n');      
     int index = data.indexOf(",");
     /*String subS = split(data, ',');
     DEBUG(data);
     DEBUG(subS);*/
     DEBUG(data)
   }
}
