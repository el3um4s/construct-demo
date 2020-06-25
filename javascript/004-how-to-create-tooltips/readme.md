# How to create tooltips

* **c3p** [004-how-to-create-tooltips-20.06.25.c3p](source/c3p/004-how-to-create-tooltips-20.06.25.c3p)
* **demo** [link](demo)

### c3_tooltips_helper.js

```javascript
function createTooltip({text = "tooltip", useInlinePosition = true, x = 0, y = 0, width = 0, height = 0, cssClass = "", align = "center" } = {}) {
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
```

### Event Sheet

![event sheet](event.png)

