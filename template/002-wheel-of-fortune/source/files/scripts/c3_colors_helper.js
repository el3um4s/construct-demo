/*
 * c3_colors_helper.js
 *
 * Copyright 2020, Samuele (Strani Anelli) De Tomasi - https://blog.stranianelli.com/
 * Released under the MIT Licence
 * https://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/el3um4s/construct-demo
 * Version: 20.07.17
 *
 * Based on Converting Color Spaces in JavaScript by Jon Kantner
 *  -  https://css-tricks.com/converting-color-spaces-in-javascript/
*/

function hexToRGBA(hex,{ formatNumber = "0-1 Range", formatReturn = "array" } = {}) {
	// formatNumber = "0-1 Range" or "Percentage" or "0-255 Range"
	// formatReturn = "array" or "object"
	let r = 0, g = 0, b = 0, a = 255;
	const h = hex.replace(/"/g, "").replace(/'/g, "");

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