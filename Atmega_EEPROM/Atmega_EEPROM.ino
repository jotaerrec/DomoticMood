
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
bool connectWifi = false;
int HIGROMETRO_index = 0, LLAMA_index = 0, DHT11_index = 0, DHT22_index = 0, PIR_index = 0, MQ2_index = 0;
int HIGROMETRO_pins[50], LLAMA_pins[50], DHT11_pins[5], DHT22_pins[5], PIR_pins[50];
String MQ2_pins[16];
SoftwareSerial SoftSerial(2, 3); // RX, TX
unsigned long currentTime = 0;
unsigned long previousTime_DHT11 = 0;
unsigned long previousTime_DHT22 = 0;
unsigned long previousTime_HIGROMETRO = 0;
unsigned long previousTime_LLAMA = 0;
unsigned long previousTime_PIR = 0;
unsigned long previousTime_MQ2 = 0;
float hum;
float temp;
String pin;
String humedad ;
String temperatura ;

DHT dht22_4(4, DHT22);
DHT dht11_5(5, DHT11);

void setup() {
  Serial.begin(9600);
  SoftSerial.begin(9600);
  pinMode(23, OUTPUT);
  digitalWrite(23,HIGH);
  
  pinMode(12, OUTPUT);
  Serial.println("Init Serial");
  dht22_4.begin();
  dht11_5.begin();
  intento_conexion();
}

void loop() {
  currentTime = millis();
  if (currentTime - previousTime_DHT22 > 60000 ) {
    hum = dht22_4.readHumidity();
    temp = dht22_4.readTemperature();
    pin = String(4);
    humedad = String(hum);
    temperatura = String(temp);
    SoftSerial.println(String("[SEND],DHT/@/" + pin + "/@/" + humedad + "/@/" + temperatura+"/@@/"));
    previousTime_DHT22 = currentTime;
  }
  if (currentTime - previousTime_DHT22 > 60000) {
    hum = dht11_5.readHumidity();
    temp = dht11_5.readTemperature();
    pin = String(5);
    humedad = String(hum);
    temperatura = String(temp);
    SoftSerial.println(String("[SEND],DHT/@/" + pin + "/@/" + humedad + "/@/" + temperatura));
    previousTime_DHT11 = currentTime;
  }
  
  if (HIGROMETRO_index > 0 && (currentTime - previousTime_HIGROMETRO > 30000)) {
    for (int i = 0; i < HIGROMETRO_index; i++) {
      String Pin_Higro = String(HIGROMETRO_pins[i]);
      if (digitalRead(HIGROMETRO_pins[i]) == HIGH)
        SoftSerial.println(String("[SEND],HIGROMETRO/@/" + Pin_Higro + "/@/TRUE"+"/@@/"));
      else
        SoftSerial.println(String("[SEND],HIGROMETRO/@/" + Pin_Higro + "/@/FALSE"+"/@@/"));
    }
    previousTime_HIGROMETRO = currentTime;
  }
  if (LLAMA_index > 0 && (currentTime - previousTime_LLAMA > 30000)) {
    for (int i = 0; i < LLAMA_index; i++) {
      String Pin_LLAMA = String(LLAMA_pins[i]);
      if (digitalRead(LLAMA_pins[i]) == HIGH)
        SoftSerial.println(String("[SEND],LLAMA/@/" + Pin_LLAMA + "/@/TRUE"+"/@@/"));
      else
        SoftSerial.println(String("[SEND],LLAMA/@/" + Pin_LLAMA + "/@/FALSE"+"/@@/"));
    }
    previousTime_LLAMA = currentTime;
  }  if (PIR_index > 0 && (currentTime - previousTime_PIR > 30000)) {
    for (int i = 0; i < PIR_index; i++) {
      String Pin_PIR = String(PIR_pins[i]);
      if (digitalRead(PIR_pins[i]) == HIGH)
        SoftSerial.println(String("[SEND],PIR/@/" + Pin_PIR + "/@/TRUE"+"/@@/"));
      else
        SoftSerial.println(String("[SEND],PIR/@/" + Pin_PIR + "/@/FALSE"+"/@@/"));
    }
    previousTime_PIR = currentTime;
  }
  if (MQ2_index > 0 && (currentTime - previousTime_MQ2 > 30000)) {
    for (int i = 0; i < MQ2_index; i++) {
      float value = analogRead( atoi(MQ2_pins[i].substring(0, 2).c_str()));
      String Value_MQ2 = String(value);
      SoftSerial.println(String("[SEND],MQ2/@/" + MQ2_pins[i] + "/@/" + Value_MQ2+"/@@/"));
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
    } else if (command == "[CONFIG]") {
      int indexNetwork  = subS.indexOf("/@/");
      String ssid = subS.substring(0, indexNetwork);
      DEBUG(ssid)
      subS = subS.substring(indexNetwork + 3, subS.length());
      String pass = subS;
      DEBUG(pass)
      graba(1, ssid);
      graba(30, pass);
      graba(70, "configurado");
    } else if (command == "[CONNECT]"){
      connectWifi = true;
    } else if (command == "[NOCONNECT]") {
      connectWifi = false;
      graba(70, "noconfigurado");
    } else if (command == "[CONFIGUREPIN]") {
      int indexNetwork  = subS.indexOf("/@/");
      String typePin = subS.substring(0, indexNetwork);
      subS = subS.substring(indexNetwork + 3, subS.length());
      String PIN_ = subS;
      int PIN = PIN_.toInt();
       if ( typePin == "HIGROMETRO" ) {
        pinMode(PIN, INPUT);
        HIGROMETRO_pins[HIGROMETRO_index] = PIN;
        HIGROMETRO_index++;
      } else if ( typePin == "LLAMA") {
        pinMode(PIN, INPUT);
        LLAMA_pins[LLAMA_index] = PIN;
        LLAMA_index++;
      }  else if ( typePin == "PIR") {
        pinMode(PIN, INPUT);
        PIR_pins[PIR_index] = PIN;
        PIR_index++;
      } else if ( typePin == "MQ2") {
        uint8_t AnalogPin = atoi (PIN_.substring(0, 2).c_str());
        MQ2_pins[MQ2_index] = PIN_;
        pinMode(AnalogPin , INPUT);
        MQ2_index++;
      }
    }
  }
}


void graba(int addr, String a) {
  int tamano = (a.length() + 1);
  Serial.println(addr);
  char inchar[tamano];
  a.toCharArray(inchar, tamano);
  EEPROM.write(addr, tamano);
  for (int i = 0; i < tamano; i++) {
    addr++;
    EEPROM.write(addr, inchar[i]);
    delay(500);
  }
  Serial.println("Grabado");
}

String lee(int addr) {
  String nuevostring;
  int valor;
  int tamano = EEPROM.read(addr);
  for (int i = 0; i < tamano; i++) {
    addr++;
    valor = EEPROM.read(addr);
    nuevostring += (char)(valor);
    delay(500);
  }
  Serial.println(nuevostring);
  return nuevostring;
}
void intento_conexion() {
  if (lee(70).equals("configurado")) {
    ssid_leido = lee(1);
    pass_leido = lee(30);
    SoftSerial.print("[CONFIGSSID],");
    SoftSerial.print(ssid_leido);
    SoftSerial.println("");
    SoftSerial.print("[CONFIGPASS],");
    SoftSerial.print(pass_leido);
    SoftSerial.println("");
    Serial.println("Enviado");
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
