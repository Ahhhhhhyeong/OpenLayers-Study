var scaleLineControl = new ol.control.ScaleLine();

var mousePositionControl = new ol.control.MousePosition({
	coordinateFormat: function(coord){
		var out = ol.coordinate.toStringHDMS(coord, 1);
		return out;
	},
	projection: 'EPSG:4326',
	className: 'custom-mouse-position',
	undefinedHTML: '&nbsp;'
});	
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

