
#include <Arduino.h>
#include <ArduinoJson.h>
#include<ESP8266WiFi.h>
#include<ESP8266WebServer.h>
#include<EEPROM.h>

String pral = "<html>"
"<meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'>"
"<title>WIFI CONFIG</title><style type='text/css'>body,td,th{ color:#036; } body{background-color:#999;}</style></head>"
"<body>"
"<h1> WIFI CONF</hl><br>"
    "<form action='config' method='get' target='pantalla' id='form'><fieldset align='left' style='border-style:solid;border-color:#336666;width:200px;height:180px;padding:10px;margin:5px;'><legend><strong>Contifurar WI-FI</strong></legend>SSID:<br><input name='ssid' type='text' size='15'><br> <br>PASSWORD:<br><input name='pass' type='password' size='15'>HOST:<br><input name='host' type='text' size='30'><input type='submit' value='setear conexion'></fieldset></form>"
        "<iframe id='pantalla'name='pantalla'src='' width=900px height-400px frameborder='0'scrolling='no'></iframe>"
"</body>"
"</html>";

ESP8266WebServer server(80);
/// WIFI Settings ///
char ssid[30];
char pass[30];
char host[30];
String ssid_leido;
String pass_leido;
String host_leido;
int ssid_tamano=0;
int pass_tamano=0;
int host_tamano=0;
int port = 8080; // Socket.IO Port Address
const char* path = "/socket.io/?EIO=4"; 

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
            socketIO.onEvent(socketIOEvent);
            break;
        case sIOtype_CONNECT:
            USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

            // join default namespace (no auto join in Socket.IO V3)
            socketIO.send(sIOtype_CONNECT, "/");
            break;
        case sIOtype_EVENT:
        {
            char * sptr = NULL;
            int id = strtol((char *)payload, &sptr, 10);
            USE_SERIAL.printf("[IOc] get event: %s id: %d\n", payload, id);
            
            if(strstr((char *)payload, "PONG"))
              emitSocket("ConfigureAtmega", "$2a$12$8yibsMKrr/CFAKwk1y6TdOiN85crdCc9228cCiaaZ9djucC4fe1he");

            if(id)
              payload = (uint8_t *)sptr;
        
            DynamicJsonDocument doc(1024);
            DeserializationError error = deserializeJson(doc, payload, length);
            
            if(error) {
                USE_SERIAL.print(F("deserializeJson() failed: "));
                USE_SERIAL.println(error.c_str());
                return;
            }
            
            String eventName = doc[0];
            USE_SERIAL.printf("[Command],%s\n", eventName.c_str());
            
            if(id) {
                // creat JSON message for Socket.IO (ack)
                DynamicJsonDocument docOut(1024);
                JsonArray array = docOut.to<JsonArray>();

                // add payload (parameters) for the ack (callback function)
                JsonObject param1 = array.createNestedObject();
                param1["now"] = millis();

                // JSON to String (serializion)
                String output;
                output += id;
                serializeJson(docOut, output);

                // Send event
                socketIO.send(sIOtype_ACK, output);
            }
        }
            break;
        case sIOtype_ACK:
            USE_SERIAL.printf("[IOc] get ack: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_ERROR:
            USE_SERIAL.printf("[IOc] get error: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_EVENT:
            USE_SERIAL.printf("[IOc] get binary: %u\n", length);
            hexdump(payload, length);
            break;
        case sIOtype_BINARY_ACK:
            USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
            hexdump(payload, length);
            break;
    }
}

void setup() {
    USE_SERIAL.begin(9600);
    EEPROM.begin(4096);
    //Serial.setDebugOutput(true);
    USE_SERIAL.setDebugOutput(true);
    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();
    for(uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }
    WiFi.softAP("ESP-0266");
    server.on("/",[](){
     server.send(200,"text/html",pral);});
      server.on("/config",wifi_conf);
    server.begin();
    Serial.println("Webserver iniciado ...");
    //WiFi.disconnect();
    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }
        
    intento_conexion();
    String ip = WiFi.localIP().toString();
    USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());
    // server address, port and URL
    socketIO.onEvent(socketIOEvent);
}

unsigned long messageTimestamp = 0;
void loop() {
    socketIO.loop();
    server.handleClient();
}

String arregla_simbolos(String a){
   a.replace("%C3%A1","á");
   a.replace("%C3%A9","é");
   a.replace("%C3%A","í");
   a.replace("%C3%B3","ó");
   a.replace("%C3%BA","ú");
   a.replace("%21","!");
   a.replace("%23","#");
   a.replace("%24","$");
   a.replace("%25","%");
   a.replace("%26","&");
   a.replace("%2F","/");
   a.replace("%28","(");
   a.replace("%29",")");
   a.replace("%3D","=");
   a.replace("%3F","?");
   a.replace("%27","'");
   a.replace("%C2ABF","¿");
   a.replace("%C2%A1",";");
   a.replace("%C3AB1","ñ");
   a.replace("%C3491","Ñ");
   a.replace("+"," ");
   a.replace("%2B","+");
   a.replace("%22","\"");
   return a;
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
  }
  delay(5000);
  bool state = EEPROM.commit();
  Serial.println("Grabado");
  Serial.println(state);
}
    
String lee(int addr){
    String nuevostring;
    int valor;
    int tamano=EEPROM.read(addr);
    for(int i=0;i<tamano; i++){
       addr++;
       valor=EEPROM.read(addr);
       nuevostring += (char)(valor);
       delay(100);
    }
    return nuevostring;
}

void intento_conexion (){
  if(lee(70).equals("configurado")){
   ssid_leido=lee(1);// leemos ssid y clave.
   pass_leido=lee(30);
   host_leido=lee(110);
   ssid_tamano=ssid_leido.length()+1;// calculamos la cantidad de caracteres que tiene el ssidyla clave
   pass_tamano=pass_leido.length()+1;
   host_tamano=host_leido.length()+1;
   ssid_leido.toCharArray(ssid,ssid_tamano);// transtornamos el string en un char array ya que es lo que nos pide WiFl.begin();
   pass_leido.toCharArray(pass,pass_tamano);
   host_leido.toCharArray(host,host_tamano);
   int cuenta=0;
   WiFi.begin(ssid,pass);// intentamos conectar
   while(WiFi.status()!=WL_CONNECTED){
    delay(100);
    cuenta++;
    Serial.println(cuenta);
    if(cuenta>20){
     Serial.println("Fallo en la Conexion");
     return;
    }
   }
  }
  if(WiFi.status()== WL_CONNECTED){
    Serial.print("Exito! Conectados a:");
    Serial.println(ssid);
    Serial.println(WiFi.localIP());
  }
  socketIO.begin(host, 8080, path);
}
void wifi_conf(){
  int cuenta=0;
  String getssid = server.arg("ssid");// recibo los valores que envia por ger el formulario web
  String getpass = server.arg("pass");
  String gethost = server.arg("host");
  getssid=arregla_simbolos(getssid);// reemplazo los simbolos que aparecen con UTFS con el simbolo correcto
  getpass=arregla_simbolos(getpass);
  gethost=arregla_simbolos(gethost);
  ssid_tamano=getssid.length()+1;// calculamos la cantidad de caracteres que tiene el ssidyla clave
  pass_tamano=getpass.length()+1;
  host_tamano=gethost.length()+1;
  getssid.toCharArray(ssid,ssid_tamano);// tabsformatos el string en un char array ya que es lo que nos pide 
  getpass.toCharArray(pass,pass_tamano);
  gethost.toCharArray(host,host_tamano);
  Serial.println(getssid);// para depuración
  Serial.println(getpass);
  Serial.println(gethost);
  WiFi.begin(ssid,pass);// intentamos conectar
  while(WiFi.status() !=  WL_CONNECTED){
    delay(5000);
    Serial.print(".");
    cuenta++;
      if(cuenta> 20){
        graba(70,"noconfigurado");
        Serial.print("no se conecto");
        return ;
      }
  }
  Serial.println(WiFi.localIP());
  graba(1,getssid);
  graba(30,getpass);
  graba(70,"configurado");
  graba(110,gethost)
  Serial.println("Se grabo");
  socketIO.begin(host, 8080, path);
  server.send(200,"text/html",String("<h2>Bien !!!! Conexion Exitosa a :"+getssid+"</h2><br> "));
}

void emitSocket(const String event, const String payload)
{

        // creat JSON message for Socket.IO (event)
        DynamicJsonDocument doc(1024);
        JsonArray array = doc.to<JsonArray>();

        // add evnet name
        // Hint: socket.on('event_name', ....
        array.add(event);

        // add payload (parameters) for the event
        JsonObject param1 = array.createNestedObject();
        param1["now"] = payload;

        // JSON to String (serializion)
        String output;
        serializeJson(doc, output);

        // Send event
        socketIO.sendEVENT(output);

        // Print JSON for debugging
        USE_SERIAL.println(output);
    
}
