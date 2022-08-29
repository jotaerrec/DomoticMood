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
   pinMode(12,OUTPUT);
}

void loop()
// enviar los datos de la consola serial al ESP-01, 
// y mostrar lo enviado por el ESP-01 a nuestra consola
{   
   if (softSerial.available())
   {
     String data = softSerial.readStringUntil('\n');    
     DEBUG(data);
     
     int index = data.indexOf(',');
     int dataLength = data.length();
     String command = data.substring(0,index);
     String subS = data.substring(index+1,dataLength);
     if(command == "[Command]"){
        DEBUG(subS);
        int indexAction = subS.indexOf('=');
        String action = subS.substring(0, indexAction);
        String params = subS.substring(indexAction+1, subS.length());
        doAction(action,params);
     
     }    
   }
}
boolean ToBool(String value)
    {
        bool returnValue;
        if(value == "true"){
          return returnValue = true;
        }else{
          return returnValue = false;
          DEBUG("HOLA")
        }
    }
void doAction(String action, String params){
  int index = params.indexOf(',');
  String pinsString = params.substring(1, index);
  String valueString = params.substring(index+1, params.length()-1);
  int pins = pinsString.toInt();
  DEBUG(pins);
  DEBUG(valueString);
  if(action == "Switch"){
        digitalWrite(pins, ToBool(valueString));
  }else{
  }

}
String split (String &data, char pattern){
 int index = data.indexOf(pattern);
 int dataLength = data.length();
 String subS; 
 subS = data.substring(index+1,dataLength);
 data = data.substring(1,index);
 return subS;
}
