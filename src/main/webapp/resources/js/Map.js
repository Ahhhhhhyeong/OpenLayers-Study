	var scaleLineControl = new ol.control.ScaleLine();

	// Mouse Position Control
	var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: function(coord){
        	var out = ol.coordinate.toStringHDMS(coord, 1);
        	console.log(out);
        	return out;
        },
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        //target: document.getElementById('mouseCoordinate'),
        undefinedHTML: '&nbsp;'
    });	
	
    var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'map',
        controls: ol.control.defaults({
          attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            collapsible: true
          })
        }).extend([
        	scaleLineControl,
        	mousePositionControl
        ]),
        view: new ol.View({
        	projection: 'EPSG:3857',
          center: ol.proj.transform([127.6, 37.8], 'EPSG:4326', 'EPSG:3857'),
          zoom: 7
        })
      });
    
	// Change View	
	function projectionOnclick(val){
		var projectionN = 'EPSG:' + val;
		console.log(projectionN);
		mapView = new ol.View({
			projection: projectionN,
	    	center: ol.proj.transform([127.6, 37.8], 'EPSG:4326', projectionN ),
	    	Zoom: 7
		});	
		map.setView(mapView);
	};			
	
	
	
	// Scale Unit Option Select
	var projectionSelect = document.getElementById('projection');
	projectionSelect.addEventListener('change', function(event) {
		console.log(event)
		mousePositionControl.setProjection(ol.proj.get(event.target.value));		
	});
	
