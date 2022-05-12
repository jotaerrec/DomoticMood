#include <ESP8266WiFi.h>
#include <WebSocketClient.h>


boolean handshakeFailed=0;
String data= "";
char path[] = "/";   //identifier of this device
const char* ssid     = "moto g(6) 6725";
const char* password = "123456789";
char* host = "192.168.43.97";  //replace this ip address with the ip address of your Node.Js server
const int espport= 3000;
  
WebSocketClient webSocket;
unsigned long previousMillis = 0;
unsigned long currentMillis;
unsigned long interval=300; //interval for sending data to the websocket server in ms
// Use WiFiClient class to create TCP connections
WiFiClient client;

//*********************************************************************************************************************
//***************function definitions**********************************************************************************
void wsconnect(){
  // Connect to the websocket server
  if (client.connect(host, espport)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
      delay(1000);  
   
   if(handshakeFailed){
    handshakeFailed=0;
    ESP.restart();
    }
    handshakeFailed=1;
  }
  // Handshake with the server
  webSocket.path = path;
  webSocket.host = host;
  if (webSocket.handshake(client)) {
    Serial.println("Handshake successful");
  } else {    
   Serial.println("Handshake failed.");
   delay(4000);  
   
   if(handshakeFailed){
    handshakeFailed=0;
    ESP.restart();
   }
   handshakeFailed=1;
  }
}

void setup() {
  Serial.begin(115200);
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  delay(1000);
  wsconnect();
}
void loop() {
  if (client.connected()) {
    currentMillis=millis(); 
    webSocket.getData(data);    
    if (data.length() > 0) {
      Serial.println(data);
      //*************send log data to server in certain interval************************************
      //currentMillis=millis();   
      if (abs(currentMillis - previousMillis) >= interval) {
      previousMillis = currentMillis;
      webSocket.sendData("Hola juju");//send sensor data to websocket server
      }
    }
    else{
      delay(5);
    }
  }
}
