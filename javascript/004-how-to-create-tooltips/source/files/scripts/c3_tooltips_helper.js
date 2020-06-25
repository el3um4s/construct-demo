/*
 * c3_tooltips_helper.js
 *
 * Copyright 2020, Samuele (Strani Anelli) De Tomasi - https://blog.stranianelli.com/
 * Released under the MIT Licence
 * https://opensource.org/licenses/MIT
 *
 * Github:  https://github.com/el3um4s/construct-demo
 * Version: 20.06.25
*/


function createTooltip({text = "tooltip", useInlinePosition = true, x = 0, y = 0, width = 0, height = 0, cssClass = "", align = "center" } = {}) {
	//calculate position
	switch (align.toLowerCase()){
		case "center":
			x = width > 0 ? x - (width/2) : x;
			y = height > 0 ? y - (height/2) : y;
		break;
		case "right":
			x = width > 0 ? x - width : x;
		break;	
	}
	
	x = Math.trunc(x);
	y = Math.trunc(y);
	
	const cssClassTooltip = cssClass != "" ? `class="${cssClass}"`: ``
	const style = useInlinePosition ? `style="left: ${x}px; top: ${y}px;"` : "";
	
	const body = document.body;
	body.insertAdjacentHTML("beforeend",`<div ${cssClassTooltip} ${style}>${text}</div>`);
}
