#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include<ESP8266WebServer.h>
#include<EEPROM.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <Hash.h>

String pral = "<html>"
              "<meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'>"
              "<title>WIFI CONFIG</title><style type='text/css'>body,td,th{ color:#036; } body{background-color:#999;}</style></head>"
              "<body>"
              "<h1> WIFI CONF</hl><br>"
              "<form action='config' method='get' target='pantalla' id='form'><fieldset align='left' style='border-style:solid;border-color:#336666;width:200px;height:180px;padding:10px;margin:5px;'><legend><strong>Contifurar WI-FI</strong></legend>SSID:<br><input name='ssid' type='text' size='15'><br> <br>PASSWORD:<br><input name='pass' type='password' size='15'><input type='submit' value='Conectar'></fieldset></form>"
              "<iframe id='pantalla'name='pantalla'src='' width=900px height-400px frameborder='0'scrolling='no'></iframe>"
              "</body>"
              "</html>";

SocketIOclient socketIO;
ESP8266WebServer server(80);

/// WIFI Settings ///
char ssid[30];
char pass[30];
const char* host = "https://API.javierrodrguez.repl.co";
int port = 8080; // Socket.IO Port Address
const char* path = "/socket.io/?EIO=4";
#define USE_SERIAL Serial

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case sIOtype_DISCONNECT:
            USE_SERIAL.printf("[IOc] Disconnected!\n");
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
            USE_SERIAL.printf("%s\n", eventName.c_str());

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
  USE_SERIAL.setDebugOutput(true);
  USE_SERIAL.println();
  USE_SERIAL.println();
  USE_SERIAL.println();
  for (uint8_t t = 4; t > 0; t--) {
    USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
    USE_SERIAL.flush();
    delay(1000);
  }
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP("ESP-0266");
  USE_SERIAL.println("...");
  server.on("/", []() {
    server.send(200, "text/html", pral);
  });
  server.on("/config", wifi_conf);
  server.begin();
  USE_SERIAL.println("...");
  USE_SERIAL.println("[WEBSERVER] Iniciado ...");

  socketIO.begin(host, 8080, path);
  socketIO.onEvent(socketIOEvent);
}

unsigned long messageTimestamp = 0;
void loop() {
  if (USE_SERIAL.available())
  {
    String data = USE_SERIAL.readStringUntil('\n');
    int index = data.indexOf(',');
    int dataLength = data.length();
    String command = data.substring(0, index);
    String subS = data.substring(index + 1, dataLength);

    if (command == "[CONFIG]") {
      int indexNetwork  = subS.indexOf("/@/");
      String ssid = subS.substring(0, indexNetwork);
      subS = subS.substring(indexNetwork + 3, subS.length());
      indexNetwork = subS.indexOf("/@/");
      String pass = subS.substring(0, indexNetwork);
      intento_conexion(ssid, pass);
    }
  }
  socketIO.loop();
  server.handleClient();
}

String arregla_simbolos(String a) {
  a.replace("%C3%A1", "á");
  a.replace("%C3%A9", "é");
  a.replace("%C3%A", "í");
  a.replace("%C3%B3", "ó");
  a.replace("%C3%BA", "ú");
  a.replace("%21", "!");
  a.replace("%23", "#");
  a.replace("%24", "$");
  a.replace("%25", "%");
  a.replace("%26", "&");
  a.replace("%2F", "/");
  a.replace("%28", "(");
  a.replace("%29", ")");
  a.replace("%3D", "=");
  a.replace("%3F", "?");
  a.replace("%27", "'");
  a.replace("%C2ABF", "¿");
  a.replace("%C2%A1", ";");
  a.replace("%C3AB1", "ñ");
  a.replace("%C3491", "Ñ");
  a.replace("+", " ");
  a.replace("%2B", "+");
  a.replace("%22", "\"");
  return a;
}

void intento_conexion (String ssid_leido, String pass_leido) {
  int ssid_tamano = ssid_leido.length() + 1; // calculamos la cantidad de caracteres que tiene el ssidyla clave
  int pass_tamano = pass_leido.length() + 1;
  ssid_leido.toCharArray(ssid, ssid_tamano); // transtornamos el string en un char array ya que es lo que nos pide WiFl.begin();
  pass_leido.toCharArray(pass, pass_tamano);
  int cuenta = 0;
  WiFi.begin(ssid, pass); // intentamos conectar
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    cuenta++;
    USE_SERIAL.println(cuenta);
    if (cuenta > 20) {
      server.send(200, "text/html", String("<h2>Error! No se pudo conectar a:" + ssid_leido + "</h2><br> "));
      USE_SERIAL.println("Fallo en la Conexion");
      return;
    }
  }
  if (WiFi.status() == WL_CONNECTED) {
    USE_SERIAL.print("Exito! Conectados a:");
    USE_SERIAL.println(ssid);
    socketIO.begin(host, 8080, path);
    socketIO.onEvent(socketIOEvent);
  }
}

void wifi_conf() {
  int cuenta = 0;
  String getssid = server.arg("ssid");// recibo los valores que envia por ger el formulario web
  String getpass = server.arg("pass");
  getssid = arregla_simbolos(getssid); // reemplazo los simbolos que aparecen con UTFS con el simbolo correcto
  getpass = arregla_simbolos(getpass);
  int ssid_tamano = getssid.length() + 1; // calculamos la cantidad de caracteres que tiene el ssidyla clave
  int pass_tamano = getpass.length() + 1;
  getssid.toCharArray(ssid, ssid_tamano); // tabsformatos el string en un char array ya que es lo que nos pide
  getpass.toCharArray(pass, pass_tamano);
  WiFi.begin(getssid, getpass); // intentamos conectar
  while (WiFi.status() !=  WL_CONNECTED) {
    delay(1000);
    USE_SERIAL.println(".");
    cuenta++;
    if (cuenta > 20) {
      USE_SERIAL.println("[NOCONNECT]");
      server.send(200, "text/html", String("<h2>Error! No se pudo conectar a:" + getssid + "</h2><br> "));
      return ;
    }
  }
  USE_SERIAL.print("[CONFIG],");
  USE_SERIAL.print(getssid);
  USE_SERIAL.print("/@/");
  USE_SERIAL.println(getpass);
  socketIO.begin(host, 8080, path);
  socketIO.onEvent(socketIOEvent);
  server.send(200, "text/html", String("<h2>Bien !!!! Conexion Exitosa a :" + getssid + "</h2><br> "));
}

void emitSocket(const String event, const String payload)
{

  // creat JSON message for Socket.IO (event)
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();
  // add event name
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
