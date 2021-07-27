export function createItems(quantity = 88) {
	const layer = "Scrollable_Items";
	const x = 0;
	const y = 0;
	const createHierarchy = true;
	for (let i = 0; i < 88; i++) {
		const item = g_runtime.objects.Item.createInstance(layer, x, y, createHierarchy);
		item.instVars.ID = i;
		item.instVars.Order = i;
		item.instVars.Order_Visible = i;
		item.instVars.Selected = false;
		item.instVars.Visible = true;
	}
}