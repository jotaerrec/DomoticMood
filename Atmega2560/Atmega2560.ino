#include <SoftwareSerial.h>
#include <DHT.h>

#define DHTPIN 6
#define DHTTYPE DHT11
#define DEBUG(a) Serial.println(a);

DHT dht(DHTPIN, DHTTYPE);
SoftwareSerial softSerial(2, 3); // RX, TX

const int baudRate = 9600;
String readString;   

void setup()
{
   Serial.begin(baudRate);
   softSerial.begin(baudRate);
   pinMode(12,OUTPUT);
   dht.begin();
}

void loop()
{     
    /*float h = dht.readHumidity();
    float t = dht.readTemperature();
    if (isnan(h) || isnan(t) ) {
      Serial.println("Error obteniendo los datos del sensor DHT11");
      return;
    }
   
    float hic = dht.computeHeatIndex(t, h, false);*/
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
