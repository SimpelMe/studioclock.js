# studioclock.js
A studioclock written in js unsing svg.js

studioclock.js is licensed under the terms of the MIT License.

# Usage

Include this plugin after including the svg.js library in your html document.

To fire up the clock:

```js
var draw = SVG('clock').size(1000, 1000)
var clock = draw.studioclock('100%')
clock.start();
```

For a complete example look at index.html 

You can find a hosted version of this clock at https://masterbase.at/studioclock/

# Dependecies
 * [svg.js]
(https://github.com/wout/svg.js)

# Attribution
 * Uses the [DSEG 7segmet font](http://www.keshikan.net/fonts-e.html)
 * This plugin is inspired by [svg.clock.js](https://github.com/wout/svg.clock.js)