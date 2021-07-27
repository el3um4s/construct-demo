import Globals from "./globals.js";
import findISS from "./findISS.js";

export default async function createMap(id = "mapid", iconName = "space-station.png") {
	const myMapDiv = document.createElement("div");
	myMapDiv.id = id;
	document.body.appendChild(myMapDiv);
	myMapDiv.style.position = "absolute";
	
	
	const issPosition = await findISS();
	const { lat, long } = issPosition;
		
	Globals.iss = new ol.geom.Point(ol.proj.fromLonLat([long, lat]))
	
	const feature = new ol.Feature({geometry: Globals.iss})
	
	const iconURL = await g_runtime.assets.getProjectFileUrl(iconName);
	feature.setStyle(
		new ol.style.Style({
			image: new ol.style.Icon({
				color: 'rgba(250, 0, 0, 0.9)',
				crossOrigin: 'anonymous',
				src: iconURL,
				scale: 0.4
			})
		})
	)
	
	const vectorSource = new ol.source.Vector({
  		features: [feature]
	});

	const vectorLayer = new ol.layer.Vector({
	  source: vectorSource,
	});
		
	Globals.map = new ol.Map({
		target: id,
		layers: [
			new ol.layer.Tile({	
            	source: new ol.source.OSM()
          	}),
			new ol.layer.Tile({
      			source: new ol.source.Stamen({
					layer: 'toner',
		  		}),
			}),
			new ol.layer.Tile({
      			source: new ol.source.Stamen({
					layer: 'terrain-labels',
		  		}),
			}),
		  vectorLayer
		],
		view: new ol.View({
          center: ol.proj.fromLonLat([long, lat]),
          zoom: 1
        })
	});
}
