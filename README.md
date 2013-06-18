SpaceStatus
===========

A small Google Chrome extension that checks whether your favorite hacker-space has open or not. Only available for hacker-spaces that use the SpaceAPI.

## About

This project is not done yet, so feel free to finish it!

## Doc Tips

This version of the SpaceStatus is mostly based on a HTML <select> element. Each entry value in the <selecct> element can be a link, a message, etc., so it uses in each value a prefix ("__:__") to determ the purpose of the entry and the way, the entry should be treated.
Here is a quick example:
- if "welcome_message__:__Chose a space..." get selected, it will just show a text with the value after the prefix
- if "source_link__:__http://acemonstertoys.org/status.json" get selected, it will go to the source link (json file) and load the speace informations via AJAX

There are to functions that are necessary, in order to use entries with prefixes:
- attache_prefix()
- determ_prefix()
