
#include <SoftwareSerial.h>
#include<EEPROM.h>
#include <DHT.h>
#define DEBUG(a) Serial.println(a);

//Constants
#define DHT11  DHT11    // what pin we're connected to
#define DHT22 DHT22   // DHT 22  (AM2302)
/// WIFI Settings ///
String ssid_leido;
String pass_leido;
String host_leido;
int HIGROMETRO_index = 0, LLAMA_index=0,DHT11_index=0, DHT22_index=0, PIR_index=0,MQ2_index=0;
int HIGROMETRO_pins[50],LLAMA_pins[50],DHT11_pins[5], DHT22_pins[5],PIR_pins[50];
String MQ2_pins[16];
SoftwareSerial SoftSerial(2, 3); // RX, TX
unsigned long currentTime=0;
unsigned long previousTime_DHT11=0;
unsigned long previousTime_DHT22=0;
unsigned long previousTime_HIGROMETRO=0;
unsigned long previousTime_LLAMA=0;
unsigned long previousTime_PIR=0;
unsigned long previousTime_MQ2=0;
float hum; 
float temp;
String pin;
String humedad ;
String temperatura ;
        
DHT dht22_0(0, DHT22);
DHT dht22_1(1, DHT22);
DHT dht22_2(2, DHT22);
DHT dht22_3(3, DHT22);
DHT dht22_4(4, DHT22);
DHT dht11_5(5, DHT11);
DHT dht11_6(6, DHT11);
DHT dht11_7(7, DHT11);
DHT dht11_8(8, DHT11);
DHT dht11_9(9, DHT11);
void setup() {
  Serial.begin(9600);
  Serial.begin(9600);
  pinMode(12, OUTPUT);
  Serial.println("Init Serial");
  dht22_0.begin();
  dht22_0.begin();
  dht22_0.begin();
  dht22_0.begin();
  dht22_0.begin();
  dht11_5.begin();
  dht11_6.begin();
  dht11_7.begin();
  dht11_8.begin();
  dht11_9.begin();
}

void loop() {
  intento_conexion();
  currentTime=millis();
  if(DHT22_index>0 && (currentTime- previousTime_DHT22 >60000) ){    
    for(int i = 0; i<DHT22_index;i++){
      if(DHT22_pins[i] == 0){
        hum = dht22_0.readHumidity();
        temp= dht22_0.readTemperature();
        pin = String(DHT22_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        Serial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      }else if(DHT22_pins[i] == 1){
        hum = dht22_1.readHumidity();
        temp= dht22_1.readTemperature();
        pin = String(DHT22_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        SoftSerial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      } else if(DHT22_pins[i] == 2){
        hum = dht22_2.readHumidity();
        temp= dht22_2.readTemperature();
        pin = String(DHT22_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        SoftSerial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      }else if(DHT22_pins[i] == 3){
        hum = dht22_3.readHumidity();
        temp= dht22_3.readTemperature();
        pin = String(DHT22_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        SoftSerial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      }else if(DHT22_pins[i] == 4){
        hum = dht22_4.readHumidity();
        temp= dht22_4.readTemperature();
        pin = String(DHT22_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        SoftSerial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      }
    }
    previousTime_DHT22 = currentTime;
  }  
  if(DHT11_index>0 && (currentTime- previousTime_DHT22 >60000)){    
    for(int i = 0; i<DHT11_index;i++){
      if(DHT11_pins[i] == 5){
        hum = dht11_5.readHumidity();
        temp= dht11_5.readTemperature();
        pin = String(DHT11_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        SoftSerial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      }else if(DHT11_pins[i] == 6){
        hum = dht11_6.readHumidity();
        temp= dht11_6.readTemperature();
        pin = String(DHT11_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        SoftSerial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      } else if(DHT11_pins[i] == 7){
        hum = dht11_7.readHumidity();
        temp= dht11_7.readTemperature();
        pin = String(DHT11_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        SoftSerial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      }else if(DHT11_pins[i] == 8){
        hum = dht11_8.readHumidity();
        temp= dht11_8.readTemperature();
        pin = String(DHT11_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        SoftSerial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      }else if(DHT11_pins[i] == 9){
        hum = dht11_9.readHumidity();
        temp= dht11_9.readTemperature();
        pin = String(DHT11_pins[i]);
        humedad = String(hum);
        temperatura = String(temp);
        SoftSerial.println(String("[SEND],DHT/@/"+pin+"/@/"+humedad+"/@/"+temperatura));  
      }
    }
    previousTime_DHT11 = currentTime;
  }
  if(HIGROMETRO_index>0 && (currentTime-previousTime_HIGROMETRO>30000)){
    for(int i = 0; i<HIGROMETRO_index; i++){
      String Pin_Higro = String(HIGROMETRO_pins[i]);
      if(digitalRead(HIGROMETRO_pins[i]) == HIGH)
        Serial.println(String("[SEND],HIGROMETRO/@/"+Pin_Higro+"/@/TRUE"));
      else 
        SoftSerial.println(String("[SEND],HIGROMETRO/@/"+Pin_Higro+"/@/FALSE"));
    }
    previousTime_HIGROMETRO = currentTime;
  }
  if(LLAMA_index>0 && (currentTime-previousTime_LLAMA>30000)){
    for(int i = 0; i<LLAMA_index; i++){
      String Pin_LLAMA = String(LLAMA_pins[i]);
      if(digitalRead(LLAMA_pins[i]) == HIGH)
        SoftSerial.println(String("[SEND],LLAMA/@/"+Pin_LLAMA+"/@/TRUE"));
      else 
        SoftSerial.println(String("[SEND],LLAMA/@/"+Pin_LLAMA+"/@/FALSE"));
    }
    previousTime_LLAMA = currentTime;
  }  if(PIR_index>0 && (currentTime-previousTime_PIR>30000)){
    for(int i = 0; i<PIR_index; i++){
      String Pin_PIR = String(PIR_pins[i]);
      if(digitalRead(PIR_pins[i]) == HIGH)
        SoftSerial.println(String("[SEND],PIR/@/"+Pin_PIR+"/@/TRUE"));
      else 
        SoftSerial.println(String("[SEND],PIR/@/"+Pin_PIR+"/@/FALSE"));
    }
    previousTime_PIR = currentTime;
  }  
  if(MQ2_index>0 && (currentTime-previousTime_MQ2>30000)){
    for(int i = 0; i<MQ2_index; i++){
      float value = analogRead( atoi(MQ2_pins[i].substring(0, 2).c_str()));
      String Value_MQ2 = String(value);
      SoftSerial.println(String("[SEND],MQ2/@/"+MQ2_pins[i]+"/@/"+Value_MQ2));
    }
    previousTime_MQ2 = currentTime;
  }

  
  if (SoftSerial.available())
  {
    String data = SoftSerial.readStringUntil('\n');
    DEBUG(data);

    int index = data.indexOf(',');
    int dataLength = data.length();
    String command = data.substring(0, index);
    String subS = data.substring(index + 1, dataLength);
    if (command == "[Command]") {
      DEBUG(subS);
      int indexAction = subS.indexOf('=');
      String action = subS.substring(0, indexAction);
      String params = subS.substring(indexAction + 1, subS.length());
      doAction(action, params);
    }else if (command == "[CONFIG]"){
      int indexNetwork  = subS.indexOf("/@/");
      String ssid = subS.substring(0, indexNetwork);
      DEBUG(ssid)
      subS = subS.substring(indexNetwork + 3, subS.length());
      indexNetwork = subS.indexOf("/@/");
      String pass = subS.substring(0, indexNetwork);
      DEBUG(pass)
      String host = subS.substring(indexNetwork + 3, subS.length());
      DEBUG(host)
      graba(1,ssid);
      graba(30,pass);
      graba(70,"configurado");
      graba(90,host);
    }else if (command == "[NOCONNECT]"){
      graba(70,"noconfigurado");
    }else if (command == "[CONFIGUREPIN]"){
      int indexNetwork  = subS.indexOf("/@/");
      String typePin = subS.substring(0, indexNetwork);
      subS = subS.substring(indexNetwork + 3, subS.length());
      String PIN_ = subS;
      int PIN = PIN_.toInt();
      if( typePin == "DHT11"){
          DHT11_pins[DHT11_index]=PIN;
          DHT11_index++;
      }else if( typePin == "HIGROMETRO" ){
          pinMode(PIN, INPUT);
          HIGROMETRO_pins[HIGROMETRO_index]=PIN;
          HIGROMETRO_index++;
      }else if( typePin == "LLAMA"){
          pinMode(PIN, INPUT);
          LLAMA_pins[LLAMA_index]=PIN;
          LLAMA_index++;
      }else if( typePin == "DHT22"){
          if(DHT22_index == 0){
            DHT dht22_0(PIN, DHT22);
            dht22_0.begin();
          }
          else if(DHT22_index == 1){
            DHT dht22_1(PIN, DHT22);
            dht22_1.begin();
          }
          else if(DHT22_index == 2){
            DHT dht22_2(PIN, DHT22);
            dht22_2.begin();
          }
          else if(DHT22_index == 3){
            DHT dht22_3(PIN, DHT22);
            dht22_3.begin();
          }
          else if(DHT22_index == 4){
            DHT dht22_4(PIN, DHT22);
            dht22_4.begin();
          }
          DHT22_pins[DHT22_index]=PIN;
          DHT22_index++;
      }else if( typePin == "DHT11"){
          if(DHT11_index == 0){
            DHT dht11_0(PIN, DHT11);
            dht11_0.begin();
          }
          else if(DHT11_index == 1){
            DHT dht11_1(PIN, DHT11);
            dht11_1.begin();
          }
          else if(DHT11_index == 2){
            DHT dht11_2(PIN, DHT11);
            dht11_2.begin();
          }
          else if(DHT11_index == 3){
            DHT dht11_3(PIN, DHT11);
            dht11_3.begin();
          }
          else if(DHT11_index == 4){
            DHT dht11_4(PIN, DHT11);
            dht11_4.begin();
          }
          DHT11_pins[DHT11_index]=PIN;
          DHT11_index++;
      }      else if ( typePin == "PIR"){
          pinMode(PIN, INPUT);
          PIR_pins[PIR_index]=PIN;
          PIR_index++;
      }else if( typePin == "MQ2"){
          uint8_t AnalogPin = atoi (PIN_.substring(0, 2).c_str());
          MQ2_pins[MQ2_index] = PIN_;
          pinMode(AnalogPin , INPUT);
          MQ2_index++;
      }
    }
  }
}


void graba(int addr,String a){
  int tamano = (a.length()+1);
  Serial.println(addr);
  char inchar[tamano];
  a.toCharArray(inchar,tamano);
  EEPROM.write(addr,tamano);
  for(int i=0;i<tamano; i++){
    addr++;
    EEPROM.write(addr,inchar[i]);
    delay(500);
  }
  Serial.println("Grabado");
}

String lee(int addr){
    String nuevostring;
    int valor;
    int tamano=EEPROM.read(addr);
    for(int i=0;i<tamano; i++){
       addr++;
       valor=EEPROM.read(addr);
       nuevostring += (char)(valor);
       delay(500);
    }
    Serial.println(nuevostring);
    return nuevostring;
}
void intento_conexion(){
  if(lee(70).equals("configurado")){
    ssid_leido=lee(1);
    pass_leido=lee(30);
    host_leido=lee(110);
    Serial.print("[CONFIG],");
    Serial.print(ssid_leido);
    Serial.print("/@/");
    Serial.println(pass_leido);
  }
}

void doAction(String action, String params) {
  int index = params.indexOf(',');
  String pinsString = params.substring(1, index);
  String valueString = params.substring(index + 1, params.length());
  int pins = pinsString.toInt();
  DEBUG(pins);
  DEBUG("----------------")
  DEBUG(valueString);
  if (action == "Switch") {
    digitalWrite(pins, ToBool(valueString));
  } else {
  }

}

boolean ToBool(String value)
{
  bool returnValue;
  if (value == "true")
    return returnValue = true;
  else
    return returnValue = false;
  
}
