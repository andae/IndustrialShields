#include <relaybox.h>

void callback(uint8_t relay_number, bool value) {
  Serial.print(relay_number); Serial.print(" - "); Serial.println(value?"ON":"OFF");
}

RelayBox ardbox(_20IO);

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }  
  Serial.println("Hello Computer");
  ardbox.setup(callback);
}

void loop() {
  ardbox.loop();
  String relay_name;
  if (Serial.available() > 0) {
    relay_name = Serial.readString();
    int relay_number = atoi(relay_name.c_str());

    ardbox.switchRelay(relay_number, 5000);
  }

}
