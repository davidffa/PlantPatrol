// *** start imports ***
#include "DHT.h"
#include <Wire.h>     // Only needed for Arduino 1.6.5 and earlier
#include "SSD1306.h"  // alias for `#include "SSD1306Wire.h"`
// *** end imports ***


//** Constants definition**
#define DHTTYPE DHT11  // DHT11 sensor type
#define DHTPIN 4       // DHT11 data pin connected to digital pin 2
//***
//temperature and humidity sensors
DHT dht(DHTPIN, DHTTYPE);
//display
SSD1306 display(0x3c, D1, D2);
unsigned long globalTime;
unsigned long displayTime;
bool modeTH = true;
int modeInterval=2400;
void setup() {
  displayTime = millis();
  // put your setup code here, to run once:
  Serial.begin(115200);
  //initialize sensors
  dht.begin();
  //initialize screen
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
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
