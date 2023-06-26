let typPointFeatureLayer;	//태풍아이콘
let typLineFeatureLayer;	//태풍경로
let typCircleFeatureLayer;	//태풍반경
const mapView = map.getView();
const projection = mapView.getProjection();

$("document").ready(function(){
	readJson();
});

// Json 파일 읽어오기
const readJson = () => {
	let typhoonData;
	$.ajax({
		url: pageContextPath+"/json/data.json",
		type: "GET",
		async: false,
		dataType: "JSON",
		success: function(data) {
			//console.log(data);
			typhoonData = data.data;
		},
		error: function (xhr, status, error) {
			console.log(status);
		}
	});
	distTypD(typhoonData);
}

// 태풍 데이터 분배
const distTypD = (param) => {
	const features = param.map(item => [item.lon, item.lat]);
	const obsTm = param.map(item => [item.obs_tm]);
	const within = param.map(item => [(item.within2)*1000]);
	//태풍 아이콘 그리기
	drawingTypIcon(features);
	//태풍 경로 그리기
	drawingTypPaht(features);
	//위험 반경 그리기
	drawingTypDanger(features, within);
}

//태풍 아이콘 그리기
const drawingTypIcon = (path) => {
	const typhoonCenterSource = new ol.source.Vector();

	// 포인트 icon 그리기
	for(let i = 0; i < path.length; i++) {
		let typicon = new ol.geom.Point(ol.proj.fromLonLat(path[i]));
		let typiconFeature = new ol.Feature({
			geometry: typicon,
			cate: 'typhoon',
			data: path[i]
		});

		const iconStyle = new ol.style.Style({
			image: new ol.style.Icon({
				src: pageContextPath+'/image/typhoonIcon.png',
				size: [32, 32],
				offset: [0, 0]
			})
		});

		typiconFeature.setStyle(iconStyle);
		typhoonCenterSource.addFeature(typiconFeature);
	}

	typPointFeatureLayer = new ol.layer.Vector({
		source: typhoonCenterSource,
		zIndex: 100,
	});

	map.addLayer(typPointFeatureLayer);
};

//태풍 경로 그리기
const drawingTypPaht = (path) => {
	const typLineSource = new ol.source.Vector();
	for(let i = 1; i < path.length; i++){
		let linePoint =  [ol.proj.fromLonLat(path[i-1]), ol.proj.fromLonLat(path[i])];
		let lineString = new ol.geom.LineString(linePoint);
		let typLineFeature = new ol.Feature({
			geometry: lineString,
			cate: 'typhoon',
			data: linePoint
			
		});
		//선 스타일
		const strokeStyles = new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: 'blue',
				width: 3
			})
		});		
		typLineFeature.setStyle(strokeStyles);
		typLineSource.addFeature(typLineFeature);
	}
	typLineFeatureLayer = new ol.layer.Vector({
		source: typLineSource,
		zIndex: 99,
	});
	map.addLayer(typLineFeatureLayer);
}

//태풍 within반경 그리기
const drawingTypDanger = (path, within) => {
	console.log(within);
	const typDanSource = new ol.source.Vector();
	/*for(let i = 0; i < path.length; i++){
		
	}*/
	
}
