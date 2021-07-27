"use strict";



{
	const scriptsInEvents = {

		async Main_Event1_Act1(runtime, localVars)
		{
			const myDiv = document.createElement("div");
			myDiv.id = 'mapid';
			document.body.appendChild(myDiv);
			myDiv.style.position = "absolute";
			
			const sourceGeoJSON = await runtime.assets.getProjectFileUrl("ds964_nil_wm.geojson");
			
			
			const style = new ol.style.Style({
			  fill: new ol.style.Fill({
			    color: 'rgba(255, 255, 255, 0.6)',
			  }),
			  stroke: new ol.style.Stroke({
			    color: '#319FD3',
			    width: 1,
			  }),
			  text: new ol.style.Text({
			    font: '10px "SourceCodePro-Regular",Calibri,sans-serif',
			    fill: new ol.style.Fill({
			      color: '#000',
			    }),
			    stroke: new ol.style.Stroke({
			      color: '#fff',
			      width: 1,
			    }),
			  }),
			});
			
			const mymap = new ol.Map({
			        target: 'mapid',
			        layers: [
			          new ol.layer.Tile({
			            source: new ol.source.OSM()
			          }),
					  new ol.layer.Tile({
			      		source: new ol.source.TileJSON({
			        		url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
			        		crossOrigin: 'anonymous',
			     			 }),
			   			 }),
					new ol.layer.Vector({
						source: new ol.source.Vector({
							url: sourceGeoJSON,
							format: new ol.format.GeoJSON(),
						}),
						style: function (feature) {
			    			style.getText().setText(feature.get('NIL'));
			    			return style;
			  			},
					})
			        ],
			        view: new ol.View({
			          center: ol.proj.fromLonLat([9.1892, 45.4641]),
			          zoom: 12
			        })
			      });
			
			const highlightStyle = new ol.style.Style({
			  stroke: new ol.style.Stroke({
			    color: '#f00',
			    width: 1,
			  }),
			  fill: new ol.style.Fill({
			    color: 'rgba(255,0,0,0.1)',
			  }),
			  text: new ol.style.Text({
			    font: '10px "SourceCodePro-Regular",Calibri,sans-serif',
			    fill: new ol.style.Fill({
			      color: '#000',
			    }),
			    stroke: new ol.style.Stroke({
			      color: '#f00',
			      width: 1,
			    }),
			  }),
			});
			
			const featureOverlay = new ol.layer.Vector({
			  source: new ol.source.Vector(),
			  map: mymap,
			  style: function (feature) {
			    highlightStyle.getText().setText(feature.get('NIL'));
			    return highlightStyle;
			  },
			});
			
			let highlight;
			const displayFeatureInfo = function (pixel) {
			  const feature = mymap.forEachFeatureAtPixel(pixel, function (feature) {
			    return feature;
			  });
			
			  const info = runtime.objects.NIL_MILAN.getFirstInstance();
			  if (feature) {
			    info.text = `${feature.get('ID_NIL')} - ${feature.get('NIL')}`;
			  } else {
			    info.text = '';
			  }
			
			  if (feature !== highlight) {
			    if (highlight) {
			      featureOverlay.getSource().removeFeature(highlight);
			    }
			    if (feature) {
			      featureOverlay.getSource().addFeature(feature);
			    }
			    highlight = feature;
			  }
			};
			
			mymap.on('pointermove', function (evt) {
			  if (evt.dragging) {
			    return;
			  }
			  var pixel = mymap.getEventPixel(evt.originalEvent);
			  displayFeatureInfo(pixel);
			});
			
			mymap.on('click', function (evt) {
			  displayFeatureInfo(evt.pixel);
			});
		},

		async Loader_Event1_Act4(runtime, localVars)
		{
			await runtime.assets.loadScripts("ol.js");
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
