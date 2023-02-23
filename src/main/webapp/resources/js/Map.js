	// ScaleLine Unit Option Select
	var scaleLineControl = new ol.control.ScaleLine();
	var projectionSelect = document.getElementById('projection');
	projectionSelect.addEventListener('change', function(event) {
		scaleLineControl = new ol.control.ScaleLine({units: event.target.value});
		$(".ol-scale-line-inner").css("display", "none");
		map.addControl(scaleLineControl);
	});
		
	
	// Mouse Position Control
	var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: function(coord){
        	var out = ol.coordinate.toStringHDMS(coord, 1);
        	return out;
        },
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        undefinedHTML: '&nbsp;'
    });	
	
	
	// Change View	
	function projectionOnclick(val){
		var projectionN = 'EPSG:' + val;
		var projectionF = map.getView().getProjection().hb;
		console.log(projectionF);
		map.setView(new ol.View({ projection: projectionN,
						    	  center: ol.proj.transform([127.6, 37.8], projectionF, projectionN),
						    	  Zoom: 7 
						    	}));
	};				 
	
	
	// Open View
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
    

