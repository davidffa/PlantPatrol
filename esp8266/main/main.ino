// *** start imports ***
  //sensors
  #include "DHT.h"
  //display
  #include <Wire.h>     // Only needed for Arduino 1.6.5 and earlier
  #include "SSD1306.h"  // alias for `#include "SSD1306Wire.h"`
  //Wifi and MQTTClient
  #include "EspMQTTClient.h"
  //Json
  #include <ArduinoJson.h>
// *** end imports ***


//** Constants definition**
#define DHTTYPE DHT11  // DHT11 sensor type
#define DHTPIN 4       // DHT11 data pin connected to digital pin 2
//***

//JsonDocument
JsonDocument doc;
//temperature and humidity sensors
DHT dht(DHTPIN, DHTTYPE);
//display
SSD1306 display(0x3c, D1, D2);
unsigned long globalTime;
unsigned long displayTime;
bool modeTH = true;
int modeInterval=2400;
//broker times
unsigned long publisingTime;
int publishingInterval=60000;

String id="e3ba4698-d64b-447e-81f5-0bf0e09700eb";

//Wifi
#define SSID "HenriqueFreitas"
#define WIFI_PASSWORD "irnz6912"
//Topic
#define TOPIC "ies/sensors"
//Broker IP or dns
#define IP_BROKER "192.168.222.64"
//Device Name
#define DEVICE_NAME "ESP8266-IES"

EspMQTTClient client(
  SSID,
  WIFI_PASSWORD,
  IP_BROKER,  // MQTT Broker server ip
  DEVICE_NAME,     // Client name that uniquely identify your device
  1883              // The MQTT port, default to 1883. this line can be omitted
);
void setup() {
  displayTime = millis();
  publisingTime  = millis();
  //id = uuid.toCharArray();
  // put your setup code here, to run once:
  Serial.begin(115200);
  //initialize sensors
  dht.begin();
  //initialize screen
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
  client.enableDebuggingMessages(); // Enable debugging messages sent to serial output
}

void loop() {
  globalTime = millis();
  //mode to change between the temperature and the humidity on the display
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  if (isnan(humidity) || isnan(temperature)) {
    display.clear();
    display.setTextAlignment(TEXT_ALIGN_CENTER);
    display.drawString(64, 22, "Failed to read sensors");
    display.display();
    return;
  }
  sensorDisplay(temperature, humidity);


  if(globalTime -publisingTime > publishingInterval ){
    publisingTime=globalTime;
    doc["temperature"]=String(temperature);
    doc["humidity"]=String(humidity);
    doc["uuid"]=String(id);
    doc["aiq"]=String(random(10,500));
    doc["uv"]=String(random(100,200));
    String message;
    serializeJson(doc, message);
    client.publish(TOPIC,message);
  }
  client.loop();
}

void sensorDisplay(float temperature, float humidity) {
  String temp = " Temperature: " + String(temperature) + "°C";
  String hum = " Humidity: " + String(humidity) + "%";


  if (globalTime - displayTime < modeInterval) {
    return;
  }
  displayTime = globalTime;
  if (modeTH==true) {
    modeTH = false;
    display.clear();
    display.setTextAlignment(TEXT_ALIGN_CENTER);
    display.drawString(64, 22, temp);
    display.display();
  } else {
    modeTH =true;
    display.clear();
    display.setTextAlignment(TEXT_ALIGN_CENTER);
    display.drawString(64, 22, hum);
    display.display();
  }
  return;
}

// Change and set the new callback function if there is more than one client 
void onConnectionEstablished()
{
  // Publish a message to "mytopic/test"
  Serial.println("Connected to the broker!");
}
