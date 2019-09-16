#include "pitches.h"
#include <LiquidCrystal.h>
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int BTN = 6;
const int ENC_A = 8;
const int ENC_B = 9;
const int PLAYER = 13;

bool clicked = false;
int button = 0, prevButton = 0;
int timer = 0;

void setup() {
  pinMode(BTN, INPUT);
  pinMode(ENC_A, INPUT_PULLUP);
  pinMode(ENC_B, INPUT_PULLUP);
  
  lcd.begin(16, 2);
  Serial.begin (9600);
  Serial.println("Start");
}

void loop() {
  lcd.setCursor(0, 0);
  static unsigned int counter4x = 0;      
  static unsigned int counter = 0;
  static unsigned int prevCounter = 0;
  int tmpdata;
  tmpdata = read_encoder();
  if(tmpdata && clicked == false) {
    counter4x += tmpdata;
    counter = counter4x/4;
    if (prevCounter != counter){
      lcd.clear();
      lcd.print(counter);
    }
    prevCounter = counter;
  }

  button = digitalRead(BTN);
  if (button != prevButton && clicked == false) {
    if (button == HIGH) {
      clicked = true;
      prevButton = button;
      timer = counter + ((millis() / 1000) + 1); 
      lcd.print("TIMER: ");
      lcd.print(counter);
      delay(1000);
      lcd.clear();
    }
  } 
  
  if (clicked) {
    int countDown = timer - (millis() / 1000);
    if (countDown > 0){
      lcd.clear();
      lcd.print(countDown);
    } else {
      lcd.print("TIME OUT!");
      play();
    }
  }
}

void play() {
  int melody[] = {
    NOTE_D3,NOTE_D3,NOTE_D3,NOTE_G3,NOTE_D4,NOTE_C4,NOTE_B3,NOTE_A3,NOTE_G4,NOTE_D4, \
    NOTE_C4,NOTE_B3,NOTE_A3,NOTE_G4,NOTE_D4,NOTE_C4,NOTE_B3,NOTE_C4,NOTE_A3,0};
    
  int noteDurations[] = {
    10,10,10,2,2,10,10,10,2,4, \
    10,10,10,2,4,10,10,10,2,4};
    
  for (int thisNote = 0; thisNote < 20; thisNote++) {
    int noteDuration = 1000 / noteDurations[thisNote];
    tone(PLAYER, melody[thisNote], noteDuration);
    int pauseBetweenNotes = noteDuration * 1.30;
    delay(pauseBetweenNotes);
    noTone(PLAYER); 
  }
}

int read_encoder() {
  static int enc_states[] = {
    0,-1,1,0,1,0,0,-1,-1,0,0,1,0,1,-1,0  };
  static byte ABab = 0;
  ABab *= 4;                  
  ABab = ABab%16;      
  ABab += 2*digitalRead(ENC_A)+digitalRead(ENC_B); 
  return ( enc_states[ABab]);
}
