- [Overview](#overview)
  - [Project Photos](#project-photos)
    - [Launcher](#launcher)
    - [Hole](#hole)
- [Hardware](#hardware)
  - [CAD](#cad)
    - [Laser Cut Parts](#laser-cut-parts)
  - [Electronics](#electronics)
    - [Wiring Diagram Launcher](#wiring-diagram-launcher)
    - [Wiring Diagram Hole](#wiring-diagram-hole)
- [Development](#development)
  - [RFID](#rfid)
    - [Code Snippets](#code-snippets)
  - [Launcher](#launcher-1)
    - [Code Snippets](#code-snippets-1)
  - [Hole](#hole-1)
    - [Code Snippets](#code-snippets-2)

---

<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/GolfDaddy.png?raw=true" width="500">

[Demo Video (https://youtu.be/wagic4B7uYY)](https://youtu.be/wagic4B7uYY)
[RFID Video (https://youtu.be/jHi_h-PA1bc)](https://youtu.be/jHi_h-PA1bc)

# Overview

Welcome to the project documentation for an innovative addition to the world of mini golf: a High-Speed Golf Ball Shooter. This project began with a simple yet ambitious goal: to enhance the traditional golfing experience, particularly in the realm of putting. Our initial vision was to develop a tool that would assist golfers in refining their putting skills in a competitive and engaging manner. However, as we delved deeper into the project, our focus shifted, leading us to a more dynamic and playful interpretation of golfing aids.

**Main Reasons for Project Shift:**

1. Our motor was too powerful for the golf ball. We were unable to tune the motor speed too produce reasonable ball speeds.
2. Our RFID reader was unable to read the RFID tags on the golf balls. We were unable to find a solution to this problem that would be cost feasible with our limited budget.
3. The ball return mechanism was too complex for our limited time frame.

## Project Photos

### Launcher

<div class="img-holder">
    <img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/product_photos/PXL_20231204_000930088.jpg?raw=true" width="300" height="300">
    <img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/product_photos/PXL_20231204_000943244.jpg?raw=true" width="300" height="300">
</div>

### Hole

<div class="img-holder">
    <img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/product_photos/PXL_20231204_000956457.jpg?raw=true" width="300" height="300">
    <img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/product_photos/PXL_20231204_001002481.jpg?raw=true" width="300" height="300">
</div>

# Hardware

**BOM:**

| Part             | Quantity | Price  |
| ---------------- | -------- | ------ |
| Seeduino Xiao    | 2        | $5.90  |
| NeoPixel Matrix  | 2        | $9.95  |
| 6s LiPo Battery  | 1        | $30.00 |
| ESC SpeedyBee    | 1        | $60.00 |
| Bearings         | 4        | $10.00 |
| 3D Printed Parts | 1        | ~~~    |
| Limit Switch     | 2        | $5.00  |
| Switches         | 2        | $5.00  |
| Microphone       | 1        | $5.00  |

## CAD

**Launcher**:

<div class="img-holder">
    <img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/cad/Full%20Laucnher.png?raw=true" width="300" height="300">
    <img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/cad/Feeder%20Tube.png?raw=true" width="300" height="300">
</div>

### Laser Cut Parts

**Hole Plate**:

<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/cad/Plate.png?raw=true" height="300">

## Electronics

### Wiring Diagram Launcher

![Wiring Diagram](https://github.com/Ian-Boraks/Golf-Buddy/blob/main/Electrical/Launcher/Schematic.png?raw=true)

### Wiring Diagram Hole

![Wiring Diagram](https://github.com/Ian-Boraks/Golf-Buddy/blob/main/Electrical/Hole/Schematic.png?raw=true)

# Development

## RFID

[RFID Video (https://youtu.be/jHi_h-PA1bc)](https://youtu.be/jHi_h-PA1bc)

The original idea was to use the RFID tags embedded into the balls to read the player's score. Initial testing with the RFID was positive, as it could read different tags with different point values and add them.

<div class="img-holder">
<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/IMG_2636.jpg?raw=true" width="300" height="300">
<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/IMG_2637.jpg?raw=true" width="300" height="300">
</div>

However, the issue arose during integration with the golf balls. The RFID was not strong enough to travel through the golf ball to get consistent readings. The issue only worsened with the launcher integration because the ball traveled too fast to be read. The RFID hardware needed to be changed with something that could be more reliable and work at faster speeds. The change to limit swithces proved to be very reliable and work on any speed we tested because of the simplicity of the tech. The lessoned learned was to not overcomplicate things sometimes instead of trying to make a golf ball smart just add a simple button.

<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/IMG_2627.JPG?raw=true" width="300" height="300">

### Code Snippets

Even though RFID didn't get implemented into the final design. A lot of effort went into the development of the RFID tracking system.

<details>
<summary>Code used for RFID</summary>
<pre><code>
#include <SPI.h>
#include <MFRC522.h>
#include <MD_MAX72xx.h>

//DOT Matrix Setup
#define HARDWARE_TYPE MD_MAX72XX::GENERIC_HW

#define MAX_DEVICES 1
#define CS_PIN 6
#define DELAYTIME 50
MD_MAX72XX mx = MD_MAX72XX(HARDWARE_TYPE, CS_PIN, MAX_DEVICES);

//RFID Scanner Setup
#define RST_PIN 5 // Configurable, see typical pin layout above
#define SS_PIN 7 // Configurable, see typical pin layout above
MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance

byte readCard[4];
const char\* rfidTags[] = {"931D7CD", "492561", "4A23E1","451421"};
int tagPoints[] = {1,2,3,4};
String tagID = "";
int points = 0;

void setup() {
// put your setup code here, to run once:

Serial.begin(9600); // Initialize serial communications with the PC
while (!Serial); // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4)
SPI.begin(); // Init SPI bus
mfrc522.PCD_Init(); // Init MFRC522
delay(4);
mfrc522.PCD_DumpVersionToSerial(); // Show details of PCD - MFRC522 Card Reader details
mx.begin();
mx.control(MD_MAX72XX::INTENSITY, 0);
mx.clear();
Serial.println("Scan Card");

}

void loop() {

//Wait until new tag is available
while (getID()) {

    //Search for Tag in dictonary
    for(int i = 0; i < sizeof(rfidTags); i++) {
      if (tagID == rfidTags[i]) {
        points = points + tagPoints[i];
        Serial.print("TAG: ");
        Serial.println(tagID);

        Serial.print("Points: ");
        Serial.println(points);
        break;
      }
    }

    if (points >= 8) {
      Serial.println("WINNNER");
      win();

    } else {
      for(int i = 0; i < (points); i++) {

        //mx.setRow(i,0xff);
        mx.setColumn(i,0xff);
        delay(DELAYTIME);

      }

    }

    Serial.print("Total POINTS: ");
    Serial.println(points);
    delay(200);

}

}

//Read new tag if available
boolean getID() {
// Getting ready for Reading PICCs
if ( ! mfrc522.PICC_IsNewCardPresent()) { //If a new PICC placed to RFID reader continue
//Serial.println("NEWCARD");
return false;
}
if ( ! mfrc522.PICC_ReadCardSerial()) { //Since a PICC placed get Serial and continue
//Serial.println("READCARD");
return false;
}
tagID = "";
for ( uint8_t i = 0; i < 4; i++) { // The MIFARE PICCs that we use have 4 byte UID
//readCard[i] = mfrc522.uid.uidByte[i];
tagID.concat(String(mfrc522.uid.uidByte[i], HEX)); // Adds the 4 bytes in a single String variable
}
tagID.toUpperCase();
mfrc522.PICC_HaltA(); // Stop reading
return true;
}

void win() {
points = 0;

for (int i = 0; i < 3; i++) {
int rmin = 0, rmax = ROW_SIZE-1;
int cmin = 0, cmax = (COL_SIZE\*MAX_DEVICES)-1;

    mx.clear();
    while ((rmax > rmin) && (cmax > cmin))
    {
      // do row
      for (int i=cmin; i<=cmax; i++)
      {
        mx.setPoint(rmin, i, true);
        delay(DELAYTIME/MAX_DEVICES);
      }
      rmin++;

      // do column
      for (uint8_t i=rmin; i<=rmax; i++)
      {
        mx.setPoint(i, cmax, true);
        delay(DELAYTIME/MAX_DEVICES);
      }
      cmax--;

      // do row
      for (int i=cmax; i>=cmin; i--)
      {
        mx.setPoint(rmax, i, true);
        delay(DELAYTIME/MAX_DEVICES);
      }
      rmax--;

      // do column
      for (uint8_t i=rmax; i>=rmin; i--)
      {
        mx.setPoint(i, cmin, true);
        delay(DELAYTIME/MAX_DEVICES);
      }
      cmin++;
    }

}

mx.clear();
}
</code></pre>

</details>

---

## Launcher

The original design of the launcher was a tube that would need an additional feeder tube to function. The issue with this design was that the ball would get stuck in the feeder tube and not be able to be launched. The solution was to change the design to a single tube that would be able to launch the ball without the need of a feeder tube.

**Launcher Initial Design**:
<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/cad/Inital%20Concept.png?raw=true" height=300>

**Launcher Final Design**:
<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/cad/Full%20Laucnher.png?raw=true" height=300>

However, this design didn't allow enough balls to be loaded in and our project changed to a single ball launcher. At this point, we decided to completely pivot from a putting assistant to a fun golf ball launcher. The lesson learned was to not be afraid to change the design if it doesn't work.

The final pivot point was the addition of a miss counter. This is done via a mic on the back of the device that can track if the user misses. This allows us to re-gamify the system and add a competitive aspect to the game.

### Code Snippets

**ESC Arming**:

The most difficult part of the launcher code was the arming of the ESC. This required us to go through the BLHELI_32 documentation and codebase to figure out the specific commands to send to the ESC. The code below is the final code that we used to arm the ESC.
<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/ESC-ARM.png?raw=true" height=300>

```c++
Motor.attach(0);

delay(100);

Motor.writeMicroseconds(0);
delayMicroseconds(400);
Motor.writeMicroseconds(1800);
delayMicroseconds(500);
Motor.writeMicroseconds(1000);
```

---

## Hole

<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/product_photos/PXL_20231204_000956457.jpg?raw=true" width="300" height="300">

### Code Snippets

**Pixel Matrix**: \
The pixel matrix output is done via two ways.

1. Manually setting each row / col.
   1. The `win()` and `updatePoints()` functions use this method.
2. Using a custom `updateDisplay()` function.
   1. Other functions like `dissolve()`, `displayNumberOne()`, and `displayNumberTwo()` all use this update function.

The `updateDisplay()` function is as follows:

```cpp
void updateDisplay(bool matrix[][COL_SIZE])
{
  for (int r = 0; r < ROW_SIZE; r++)
  {
    for (int c = 0; c < COL_SIZE; c++)
    {
      mx.setPoint(r, c, matrix[r][c]);
    }
  }
}
```

**Score Tracking (Microphone)**:
Below is the code used to detect if the player missed their shot. It is a simple system that pulls the microphone to see if it drop below its volume threshold.

```c++
#define VOLUME_THRESHOLD 20
while (digitalRead(button))
  {
    int sound = analogRead(mic);
    if (sound < VOLUME_THRESHOLD)
    {
        hits++;
        delay(500);
        Serial.print("HIT: ");
        Serial.println(sound);

        points++;

        updatePoints();
    }

    if (hits >= 16)
    {
        break;
    }
  }
```

<!--
# Special Thanks

We would like to thank the following people for their contributions to this project:

Our ambassador and visionary, Golf Daddy:

<img src="https://github.com/Ian-Boraks/Golf-Buddy/blob/main/images/ambassador.jpg?raw=true" width=300 height=300>

Golf Daddy helped us and supported us through the initial stages of this project. He provided us with the inspiration and motivation to pursue this project, and we are forever grateful for his guidance. But in all seriousness, he did help bring our spirits up by playing guitar during our long nights at the HIVE.
-->
