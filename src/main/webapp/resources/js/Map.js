window.onload = function(){
	var scaleLineControl = new ol.control.ScaleLine();
	
	var map = new ol.Map({
	      target: 'map',
	      layers: [
	          new ol.layer.Tile({
	            source: new ol.source.OSM()
	          })
	        ],
	      controls: ol.control.defaults().extend([
	        	scaleLineControl
	      ]),
	 });
	
	// view 생성
	var mapView = new ol.View({
		projection: 'EPSG:4326',
    	center: [127.6, 37.8],
    	Zoom: 7
	});
	
	function projectionOnclick(val){
		console.log(val);
		var projectionN = 'EPSG:' + val;
		/*mapView = new ol.View({
			projection: projectionN,
	    	center: ol.projectionN.transform([127.6, 37.8], "EPSG:4326", projectionN),
	    	Zoom: 7
		});	
		map.setView(mapView);*/
	};	
	
	map.setView(mapView);
			
	// layer생성 및 Source 셋팅

	var projectionSelect = document.getElementById('projection');
	projectionSelect.addEventListener('change', function(event) {
		//mousePositionControl.setProjection(ol.proj.get(event.target.value));		
	});
	
	var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
    });
	
	// map 생성 및 view, layer 적용
	
}