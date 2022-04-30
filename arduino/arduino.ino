#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include <HTTPClient.h>
#include <WiFi.h>

Adafruit_PWMServoDriver servos = Adafruit_PWMServoDriver (0x40);

int pos0=204;                             //ancho de pulso en cuentas para pocición 0°
int pos180=409;                           //ancho de pulso en cuentas para la posición 180°

const char* ssid = "ecoarmIA";
const char* password =  "eco1234567";
const char* url = "https://eco-arm-ia.herokuapp.com/ia/detect/test-arm?x=7&y=7";

const float servo_angles_rest[] = {0, 0, 0};
const float servo_angles_trash[] = {0, 0, 0};

const int basePin = 13;
const int atlasPin = 14;
const int codoPin = 15;

void setup() {
  delay(10);
  Serial.begin(115200);

  WiFi.begin(ssid, password);

  Serial.print("Conectando...");
  while (WiFi.status() != WL_CONNECTED) { //Check for the connection
    delay(500);
    Serial.print(".");

    servos.begin();
  servos.setPWMFreq(60);                 //Frecuencia PWM para servo MG995 de entre 50-60 Hz
  }

  Serial.print("Conectado con éxito, mi IP es: ");
  Serial.println(WiFi.localIP());

}
void moveServos(float base,float atlas,float codo) {
  servos.setPWM(basePin,0,map(base,0,180,pos0,pos180));
  servos.setPWM(atlasPin,0,map(atlas,0,180,pos0,pos180));
  servos.setPWM(codoPin,0,map(codo,0,180,pos0,pos180));
}

void loop() {

  if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status

    HTTPClient http;
    http.begin(url);        //Indicamos el destino
    http.addHeader("Content-Type", "plain-text"); //Preparamos el header text/plain si solo vamos a enviar texto plano sin un paradigma llave:valor.

    int codigo_respuesta = http.GET();   //Enviamos el post pasándole, los datos que queremos enviar. (esta función nos devuelve un código que guardamos en un int)

    if(codigo_respuesta>0){
      if(codigo_respuesta == 200){
        String payload = http.getString(); //obtenemos la respuesta del servidor
        Serial.println(payload); // EJEMPLO  "100,80,250"

        // Convertimos la respuesta de un string por comas a 3 valores flotantes
        int commaIndex = payload.indexOf(',');
        int secondCommaIndex = payload.indexOf(',', commaIndex + 1);

        float base = payload.substring(0, commaIndex).toFloat();
        float atlas = payload.substring(commaIndex + 1, secondCommaIndex).toFloat();
        float codo = payload.substring(secondCommaIndex + 1).toFloat();

        // Secuencia de movimiento Objetivo -> Reposo -> Contenedor -> Reposo
        moveServos(base,atlas,codo);
        moveServos(servo_angles_rest[0],servo_angles_rest[1],servo_angles_rest[2]);
        moveServos(servo_angles_trash[0],servo_angles_trash[2],servo_angles_trash[2]);
        delay(1000);
        moveServos(servo_angles_rest[0],servo_angles_rest[1],servo_angles_rest[2]);

      }
    }else{
     Serial.print("Error enviando POST, código: ");
     Serial.println(codigo_respuesta);
    }
    http.end();
  }else{
     Serial.println("Error en la conexión WIFI");
  }
}
