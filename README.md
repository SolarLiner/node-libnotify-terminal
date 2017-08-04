# node-libnotify-terminal
libnotify-terminal, ported to nodejs.

## What is libnotify-terminal ?

`libnotify-terminal` is a small program written in python that interacts with the Linux Desktop through the Freedesktop na nodeotifications specifications. You can look over at the repo in there: https://github.com/SolarLiner/libnotify-terminal

## What is node-libnotify-terminal ?

`node-libnotify-terminal` is a node module made to interact with those same notifications through `libnotify-terminal` as a child process. It is similar to `libnotify` in this way.

## Why should I use this package over the old one?

`libnotify` uses `notifysend` a program that fires a notification but does not allow you to do anything with it. `node-libnotify-terminal`, on the other hand, supports button and notification press callbacks which in turn allow the user to interact with your application in a whole new way on Linux WMs that support sending notifications (so all of them, basically).

## How simple is it?

That will be discussed once I actually come around and type some code.
