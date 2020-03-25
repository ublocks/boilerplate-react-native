# Monitors

This directory contains your app's state monitor components, you can add nested monitors on this folder if you need it, and **don't forget to register them in the file index.js.**

the following monitors are built-in in the boilerplate:

## 1 - AppMonitor.js

monitoring following changes of mobile device :

- app state(background/active/inactive...)
- app version number
- locale changes, and update the app's display i18n wordings.
- orientation changes

## 2 - NetInfoMonitor.js

monitoring the mobile device's network information changes.

## 3 - AndroidBackKeyMonitor.js

monitoring the onPress event of the Android device's hardware/software back key.
