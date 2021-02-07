export default function LogInfo(message){
	g_runtime.objects.InfoFile.getFirstInstance().text = message;
};