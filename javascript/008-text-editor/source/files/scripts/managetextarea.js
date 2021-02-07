// https://github.com/GoogleChromeLabs/text-editor/blob/e3a33c2c0b1832ecdb7221f17d7f8a1b23e1ad19/src/inline-scripts/text-area.js#L71

export function insertInto(contents) {
	const textArea = document.getElementById("text-editor");
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd;
    const before = textArea.value;
    const left = before.substring(0, startPos);
    const right = before.substring(endPos);
    textArea.value = left + contents + right;
	g_runtime.objects.TextInput.getFirstInstance().text = textArea.value;
    const newPos = startPos + contents.length;
    textArea.selectionStart = newPos;
    textArea.selectionEnd = newPos;
};