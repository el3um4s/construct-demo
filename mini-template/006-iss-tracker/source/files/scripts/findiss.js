export default async function findISS() {
	const issAPI = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
	const data = await issAPI.json();
	
	const lat = data.latitude.toFixed(2);
	const long = data.longitude.toFixed(2);
	const timestamp = new Date(data.timestamp * 1000).toUTCString();
    const speed = data.velocity.toFixed(2);
    const altitude = data.altitude.toFixed(2);
    const visibility = data.visibility;
	const units = data.units;
	
	const result = { lat, long, timestamp, speed, altitude, visibility, units}
	return result;
}