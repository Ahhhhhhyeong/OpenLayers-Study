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
		      
		  var remapview = new ol.View({
									         projection: projectionN,
									         center: ol.proj.transform([127.6, 37.8], 'EPSG:4326', projectionN),
									         zoom: 7
		   					         });
		      
	      map.setView(remapview);
	};   
	
    // popup
    /**
     * Elements that make up the popup.
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    
    /**
     * Create an overlay to anchor the popup to the map.
     */
    var overlay = new ol.Overlay({
    	element: container,
    	autoPan: {
    		animation: {
    			duration: 250,
    		},
    	},
    });
    
    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
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
        }),
        overlays: [overlay],
      });
    
    
    // show portLayer
    var portLayer = new ol.layer.Tile({
    	source: new ol.source.TileWMS({
    		url: "",
    		params: {
    			
    		} 
    	})
    });
    map.addLayer(portLayer);
    
    // show data with Overlay
    map.on('singleclick', function (evt) {
    	  var coordinate = evt.coordinate;
    	  var viewResolution = map.getView().getResolution(); 
    	  var viewProjection = map.getView().getProjection().et;
    	  
    	  var url = portLayer.getSource().getFeatureInfoUrl(
    	    coordinate,
    	    viewResolution,
    	    viewProjection,
    	    {'INFO_FORMAT': 'application/json'}
    	  );
    	  
    	  $.ajax({
    		 type: 'GET',
    		 url: url,
    		 datatype: 'json',
    		 contentType: false,
    		 async: false
    	  }).done(function(resp){   		  
    		  if(resp.features[0]){
    			  var strHtml="";
    			   var data = resp.features[0].properties;    			   
    			   for (variable in data) {
    					strHtml+=variable 
    					strHtml+= " : "
    					strHtml+= data[variable];
    					strHtml+="<br>"
    				} 			  
    			  content.innerHTML =  strHtml;
        		  overlay.setPosition(coordinate);
    		  }
    		  
    	  });
    });
    
