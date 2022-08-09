# KBTweenLib
A tween library for Kaboom that allows easy usage of tweens. It also comes with a package for eases, so you can use it with Kaboom's `lerp()` function if you really wanted.
## Dependencies
### `KBTween.js`
- **Requires** Kaboom v2000 or later
- **Requires** a JavaScript version that supports ES6 functionality
- **Recommends** Visual Studio Code
- **Recommends** VS Code Intellisense for JSDocs
### `easingpackage.js`
- **Requires** a JavaScript version that supports ES6 functionality
- **Can be used with** Kaboom, any version
## Differences between `KBTween.js` and `JSTween.js`

### `KBTween.js`
- Smaller file size, but depends heavily on Kaboom functions
- Perfect for Kaboom games
- Uses `onUpdate()`, `lerp()`, and `time()`

### `JSTween.js`
- Bigger file size, but not dependent on Kaboom at all
- Uses `performance.now()`, a very precise and lightweight time getter function
- Do not use while making a Kaboom game, it would be pointless! Use for normal JS Canvas games instead.
- Uses `Window.requestAnimationFrame()`

## Documentation

`tween()` - Creates a tween to animate properties of an object.

- `0` - `object: string` - The object with the properties being animated.
- `1` - `prop[]: string` - The properties that will be animated.
- `2` - `time: Object` - The properties that define how to animate the object.
    - `.from: number` - The initial value to animate from.
    - `.to: number` - The new value to animate to.
    - *`.time?: number` - The time it takes to animate the object.*
    - `.type: number`- Defines how the animation works.
- `3` - *`config?: Object` - The properties that define how to style the animation.*
    - *`.ease?: Function` - The ease and smoothness of the animation.*
    - *`.onStart?: Function()` - What to run when the tween starts.*
    - *`.onUpdate?: onUpdate()` - What to run every time the tween updates.*
    - *`.onFinish?: onFinish()` - What to run when the tween ends.*
- `return` - `: Function()` - End the tween manually.
    - *`0` - `clean?: bool` - Whether the tween should end where it is (true) or end at `time.to` (false).*

`onFinish` - What to run when the tween ends.

- `0` - `time: Object` - The properties that defined how to animate this object.
- `1` - `config: Object` - The properties that defined how to style this animation.
- `2` - *`loops?: number` - How many times the tween has looped.*

`onUpdate` - What to run every time the tween updates.

- `0` - `frame: number`
- `1` - `second: number`
- `2` - `percent: number`
- `3` - `easePercent: number`
- `4` - `value: number`

`tweentypes`

- `.NORMAL: number`
- `.FOREVER: number`
- `.CONTINUE: number`
- `.PINGPONG: number`
- private `__NOOP: Function`

## Example
`KBTween.js`
```js
import { KBTween } from ".../tween.js";
import { easings } from ".../easingpackage.js";

var k = kaboom(); // Make Kaboom global but also a variable
var twnlib = KBTween(k); // Create new TweenLib instance, pass in Kaboom
                         // This fixes Intellisense on VSCode not picking up on how Kaboom imports plugins
                         // Otherwise, if your IDE is smart enough, you can just pass in the tween lib normally, using KBTween as a plugin
loadBean();

var bean = add([
	sprite("bean"),
	pos(64, 64),
	color(255, 255, 255)
]);

twnlib.tween(bean.pos, [ "x" ], {
	from: 0,
	to: width() - 64,
	time: 3.2,
	type: tweentypes.PINGPONG
});

twnlib.tween(bean.pos, [ "y" ], {
	from: 0,
	to: height() - 64,
	time: 2,
	type: tweentypes.PINGPONG
});

twnlib.tween(bean.color, [ "g", "r" ], {
	from: 255,
	to: 0,
	time: 0.25,
	type: tweentypes.PINGPONG
});
```
`JSTween.js`
```html
<p>Points: <span id="number">0</span></p>
<script type="module" src="...js"></script>
```
```js
import { JSTween } from ".../JSTween.js";
import { easings } from ".../easingpackage.js";

var twnlib = JSTween();

twnlib.tween(document.getElementById("number"), ["innerHTML"], {
	from: 0,
	to: 1000,
	time: 10,
	type: twnlib.tweentypes.NORMAL
})
```
