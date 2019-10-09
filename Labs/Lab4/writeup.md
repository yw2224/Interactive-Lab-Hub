# Paper Puppets

**yw2224@cornell.edu**

## Part A. Actuating DC motors

**Link to a video of your virbation motor**

[![](http://img.youtube.com/vi/3ftO98Uj308/0.jpg)](https://youtu.be/3ftO98Uj308)

## Part B. Actuating Servo motors

### Part 1. Connect the Servo to your breadboard

**a. Which color wires correspond to power, ground and signal?**

Red to power, brown to ground, and orange to signal.

### Part 2. Connect the Servo to your Arduino

**a. Which Arduino pin should the signal line of the servo be attached to?**

9.

**b. What aspects of the Servo code control angle or speed?**

```c++
for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
	delay(15);                       // waits 15ms for the servo to reach the position
}
```

## Part C. Integrating input and output

**Include a photo/movie of your raw circuit in action.**

[![](http://img.youtube.com/vi/f-Lc2FU5dSw/0.jpg)](https://youtu.be/f-Lc2FU5dSw)

[Arduino Code](./Code/potentiometer_servo/potentiometer_servo.ino)

## Part D. Paper puppet

**a. Make a video of your proto puppet.**

[![](http://img.youtube.com/vi/DvekFRr3jSc/0.jpg)](https://youtu.be/DvekFRr3jSc)

## Part E. Make it your own

**a. Make a video of your final design.**
 
 [![](http://img.youtube.com/vi/rxvxoWiSsRs/0.jpg)]( https://youtu.be/rxvxoWiSsRs)