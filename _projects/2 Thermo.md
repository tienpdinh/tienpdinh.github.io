---
title: Thermometer Simulation
image: /img/cover_photos/thermo.png
permalink: /project/thermo
hide: true
---

# Thermometer Simulation

This is a project I implemented for a class I took at the university. I implemented both the C and the x86-64 Assembly
versions.

This project demonstrated the use of bit manipulations in C and Assembly.

## Example Run
```shell
THERMO_SENSOR_PORT set to: 3000
set_temp_from_sensors(&temp );
temp is {
  .tenths_degrees = -453
  .is_fahrenheit  = 0
}
Simulated temp is: -45.3 deg C

Checking results for display bits
set_display_from_temp(temp, &display);

display is:
        3         2         1         0
index: 10987654321098765432109876543210
bits:  00011000000110011011011011001111
guide:  |    |    |    |    |    |    |
index:  30        20        10        0

Running thermo_update()

THERMO_DISPLAY_PORT is:
index:  3         2         1    0    0
index: 10987654321098765432109876543210
bits:  00011000000110011011011011001111
guide:  |    |    |    |    |    |    |
index:  30        20        10        0

Thermometer Display:
              ~~   ~~  o       
        |  | |       |  C      
    ~~   ~~   ~~   ~~          
           |    |    |         
              ~~ o ~~         
```

## Source Codes

The full source code for this project can be found [here](https://github.com/tienpdinh/Thermometer)

The C and Assembly versions are located under the C and Assembly directories respectively.

## Build Instructions

To build the project, simply run `make` from each individual directory.

To run the executable, use the syntax:
```shell
$ ./thermo_main {sensor_val} {C | F}
```

Where `sensor_val` is the sensor reading value.