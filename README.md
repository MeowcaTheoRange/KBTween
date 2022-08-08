# KBTweenLib
A tween library for Kaboom that allows easy usage of tweens. It also comes with a package for eases, so you can use it with Kaboom's `lerp()` function if you really wanted.
## Dependencies
### `tween.js`
- **Requires** Kaboom v2000 or later
- **Requires** a JavaScript version that supports ES6 functionality
- **Recommends** Visual Studio Code
- **Recommends** VS Code Intellisense for JSDocs
### `easingpackage.js`
- **Requires** a JavaScript version that supports ES6 functionality
- **Can be used with** Kaboom, any version
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
- `return` - `: Function(clean?)` - End the tween manually.

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
```js
import { KBTween } from "./KBTweenV2/tween.js";

kaboom({
	plugins: [KBTween]
});

loadBean();

var bean = add([
	sprite("bean"),
	pos(64, 64),
	color(255, 255, 255)
]);

tween(bean.pos, [ "x" ], {
	from: 64,
	to: 512,
	time: 1.2,
	type: 8
});

var stopTween = tween(bean.pos, [ "y" ], {
	from: 64,
	to: 512,
	time: 0.7,
	type: 8
});

tween(bean.color, [ "b" ], {
	from: 255,
	to: 0,
	time: 0.25,
	type: 8
});
```
