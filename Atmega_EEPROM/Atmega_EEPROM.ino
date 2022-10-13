#include<EEPROM.h>
#define DEBUG(a) Serial.println(a);
/// WIFI Settings ///
String ssid_leido;
String pass_leido;
String host_leido;
    
void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Serial.available())
  {
    String data = Serial.readStringUntil('\n');
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
    }
    if (command == "[CONFIG]"){
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
    }
    if (command == "[NOCONNECT]"){
      graba(70,"noconfigurado");
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
    return nuevostring;
}
void intento_conexion (){
  if(lee(70).equals("configurado")){
    ssid_leido=lee(1);
    pass_leido=lee(30);
    host_leido=lee(110);
    Serial.print("[CONFIG],");
    Serial.print(ssid_leido);
    Serial.print("/@/");
    Serial.print(pass_leido);
    Serial.print("/@/");
    Serial.println(host_leido);
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
