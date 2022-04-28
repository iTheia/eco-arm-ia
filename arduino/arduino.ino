//#include <Wire.h>
//#include <Adafruit_PWMServoDriver.h>

//Se pueden determinar dos direcciones para la tarjeta "0x40" hasta "0x44"

//Adafruit_PWMServoDriver servos = Adafruit_PWMServoDriver (0x40);

int pos0 = 204;                           //ancho de pulso en cuentas para pocición 0°
int pos180 = 409;                         //ancho de pulso en cuentas para la posición 180°
int servo_array[] = {0, 1, 2, 3, 4};
int servo_angles[5];
int servo_angles_rest[] = {0, 0, 0, 0, 0};
int servo_angles_trash[] = {0, 0, 0, 0, 0};

void setup() {
   servos.begin();
   servos.setPWMFreq(60);                 //Frecuencia PWM para servo MG995 de entre 50-60 Hz
}

void setServo(uint8_t n_servo, int angulo) {
  servos.setPWM(n_servo, 0, map(angulo, 0, 180, pos0, pos180));
}

void smothMovment(int current_array[], int destiny_array[]) {
  for (int i = 0; i < sizeof(servo_array) - 1; i++) {
    int destiny = destiny_array[i];
    int current = current_array[i];
    int ratio = abs((current - destiny) / 10);
    if (destiny > current) {
      while (destiny >= current) {
        setServo(servo_array[i], current )
        current  += ratio;
        delay(25);
      }
    } else {
      while (destiny <= current) {
        setServo(servo_array[i], current )
        current -= ratio;
        delay(25);
      }
    }
  }
}


void loop() {

  boolean battery = false;

  setAngles(); // dado una coordenada
  smothMovment(servo_angles_rest, servo_angles);
  smothMovment(servo_angles, servo_angles_rest);
  smothMovment(servo_angles_rest, servo_angles_trash);
  smothMovment(servo_angles_trash, servo_angles_rest);

  setServo(1, -100);
}
