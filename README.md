# node-libnotify-terminal
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/SolarLiner/node-libnotify-terminal/master/LICENSE)
![Not yet on npm](https://img.shields.io/badge/npm-Not%20yet-yellowgreen.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/945c18de3e3b46ee9c84c0c623c9f2e9)](https://www.codacy.com/app/solarliner/node-libnotify-terminal?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SolarLiner/node-libnotify-terminal&amp;utm_campaign=Badge_Grade) 
[![Codacy Coverage Badge](https://api.codacy.com/project/badge/Coverage/945c18de3e3b46ee9c84c0c623c9f2e9)](https://www.codacy.com/app/solarliner/node-libnotify-terminal?utm_source=github.com&utm_medium=referral&utm_content=SolarLiner/node-libnotify-terminal&utm_campaign=Badge_Coverage)
[![Build Status](https://travis-ci.org/SolarLiner/node-libnotify-terminal.svg?branch=master)](https://travis-ci.org/SolarLiner/node-libnotify-terminal)  
libnotify-terminal, ported to nodejs.

## What is libnotify-terminal ?

`libnotify-terminal` is a small program written in python that interacts with the Linux Desktop through the Freedesktop na nodeotifications specifications. You can look over at the repo in there: https://github.com/SolarLiner/libnotify-terminal

## What is node-libnotify-terminal ?

`node-libnotify-terminal` is a node module made to interact with those same notifications through `libnotify-terminal` as a child process. It is similar to `libnotify` in this way.

## Why should I use this package over the old one?

`libnotify` uses `notifysend` a program that fires a notification but does not allow you to do anything with it. `node-libnotify-terminal`, on the other hand, supports button and notification press callbacks which in turn allow the user to interact with your application in a whole new way on Linux WMs that support sending notifications (so all of them, basically).

## How simple is it?

Firing a simple notification, without callbacks, is as simple as this:
```typescript
import { Notification } from "node-libnotify-terminal";
Notification.fire("Application title", "Notification body", "Notification title");
```

Note that the body is before the title, as only the body is required to fire a notification.

More examples are available on the Wiki.
