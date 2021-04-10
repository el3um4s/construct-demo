# How to use HEX color

* **c3p** [how-to-use-hex-color-20.06.05.c3p](source/c3p/how-to-use-hex-color-20.06.05.c3p)
* **demo** [link](demo)
* **Patreon** [link](https://patreon.com/el3um4s)

### global_runtime.js

```javascript
runOnStartup(async  runtime =>  {  globalThis.g_runtime  =  runtime })
```

### c3_colors_helper.js

```javascript
function hexToRGBA(h,{ formatNumber = "0-1 Range", formatReturn = "array" } = {}) {
	// formatNumber = "0-1 Range" or "Percentage" or "0-255 Range"
	// formatReturn = "array" or "object"
	let r = 0, g = 0, b = 0, a = 255;

	switch (h.length) {
		case 4:
			r = "0x" + h[1] + h[1];
    		g = "0x" + h[2] + h[2];
    		b = "0x" + h[3] + h[3];
			break;
		case 7:
			r = "0x" + h[1] + h[2];
    		g = "0x" + h[3] + h[4];
    		b = "0x" + h[5] + h[6];
			break;
		case 5:
			r = "0x" + h[1] + h[1];
    		g = "0x" + h[2] + h[2];
    		b = "0x" + h[3] + h[3];
    		a = "0x" + h[4] + h[4];
			break;
		case 9:
			r = "0x" + h[1] + h[2];
    		g = "0x" + h[3] + h[4];
    		b = "0x" + h[5] + h[6];
    		a = "0x" + h[7] + h[8];
			break;
		default:
			break;
	}

	switch (formatNumber.toUpperCase()) {
		case "0-1 RANGE":
			r = +(r / 255).toFixed(3);
    		g = +(g / 255).toFixed(3);
    		b = +(b / 255).toFixed(3);
			a = +(a / 255).toFixed(3);
			break;
		case "PERCENTAGE":
			r = +(r / 255 * 100).toFixed(1);
    		g = +(g / 255 * 100).toFixed(1);
    		b = +(b / 255 * 100).toFixed(1);
			a = +(a / 255 * 100).toFixed(3);
			break;
		default:
			break;
	}

  	if (formatReturn.toUpperCase() === "ARRAY") return [+r,+g,+b,+a];
	return {r:+r, g:+g, b:+b, a:+a}
 }
```
