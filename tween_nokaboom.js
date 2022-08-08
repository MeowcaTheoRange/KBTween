/**
 * @callback onUpdate - What to run every time the tween updates.
 * @param {number} frame
 * @param {number} second
 * @param {number} percent
 * @param {number} easePercent
 * @param {number} value
 */
/**
 * @callback onFinish - What to run when the tween ends.
 * @param {Object} time - The properties that defined how to animate this object.
 * @param {Object} config - The properties that defined how to style this animation.
 * @param {number} [loops] - How many times the tween has looped.
 */
 export function KBTween() {
	const tweentypes = {
		NORMAL: 0,
		FOREVER: 2,
		CONTINUE: 4,
		PINGPONG: 8,
		__NOOP: (x) => {return x;}
	};
	function lerp(a, b, t) {
		return (1 - t) * a + t * b;
	}
	/**
	 * @function tween
	 * Creates a tween to animate properties of an object.
	 * @param {string} object - The object with the properties being animated.
	 * @param {string[]} prop - The properties that will be animated.
	 * @param {Object} time - The properties that define how to animate the object.
	 * @param {number} time.from - The initial value to animate from.
	 * @param {number} time.to - The new value to animate to.
	 * @param {number} time.time - The time it takes to animate the object.
	 * @param {number} [time.type] - Defines how the animation works.
	 * @param {Object} [config] - The properties that define how to style the animation.
	 * @param {Function} [config.ease] - The ease and smoothness of the animation.
	 * @param {Function} [config.onStart] - What to run when the tween starts.
	 * @param {onUpdate} [config.onUpdate] - What to run every time the tween updates.
	 * @param {onFinish} [config.onFinish] - What to run when the tween ends.
	 * @returns {Function} - End the tween manually.
	 */
	const tween = (object, prop, time, config) => {
		time.type = time.type ?? 0;
		var config = config ?? {};
		config.ease = config.ease ?? tweentypes.__NOOP;
		config.onStart = config.onStart ?? tweentypes.__NOOP;
		config.onUpdate = config.onUpdate ?? tweentypes.__NOOP;
		config.onFinish = config.onFinish ?? tweentypes.__NOOP;

		var frame = 0;
		var startTime = performance.now() / 1000;
		var loops = 0;
		var loopIsDone = true;
		config.onStart();
		var updateFunc = () => {
			var curTime = (performance.now() / 1000) - startTime;
			var curPercent = curTime / time.time;
			for (let i in prop) {
				object[prop[i]] = lerp(time.from, time.to, config.ease(curPercent));
			}
			if (curPercent >= 1) {
				switch (time.type) {
					case 0:
						for (let i in prop) {
							 object[prop[i]] = time.to;
						}
						loopIsDone = false;
						break;
					case 2:
						startTime = performance.now() / 1000;
						break;
					case 4:
						 break;
					case 8:
						var x = time.from;
						time.from = time.to;
						time.to = x;
						startTime = performance.now() / 1000;
						break;
				}
				loops++;
				config.onFinish(time, config, loops);
			}
			config.onUpdate(frame, curTime, curPercent, config.ease(curPercent), lerp(time.from, time.to, config.ease(curPercent)));
			frame++;
			if (loopIsDone) {
				window.requestAnimationFrame(updateFunc);
			}
		};
		window.requestAnimationFrame(updateFunc);
		return (clean) => {
			if (!clean) {
				for (let i in prop) {
					 object[prop[i]] = time.to;
				}
			}
			time.type = 0;
			loopIsDone = false;
		}
	};
  return {
	  tweentypes: tweentypes,
	  tween: tween
  };
}