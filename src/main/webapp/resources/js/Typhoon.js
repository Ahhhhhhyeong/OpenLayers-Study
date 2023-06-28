const mapView = map.getView();
const projection = mapView.getProjection();
const resolutionAtEquator = mapView.getResolution();		//점포인트해상도
let typCircleFeatureLayer;

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
	drawingTypIcon(features, within);
	//태풍 경로 그리기
	drawingTypPaht(features);
}

//태풍 아이콘 그리기
const drawingTypIcon = (path, within) => {
	const typhoonCenterSource = new ol.source.Vector();
	const typDanSource = new ol.source.Vector();
	
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
		
		if(within[i] != 0){
			let transpoint = ol.proj.fromLonLat(path[i]);
			let pointResolution = ol.proj.getPointResolution(projection,resolutionAtEquator, transpoint);		// 지도의 픽셀 해상도를 얻는함수
			let resolutionFactor = resolutionAtEquator/pointResolution; 										// 오픈레이어스에서 거리맞추기 위해 필요
			let typRadius = (within[i] / ol.proj.Units.METERS_PER_UNIT.m) * resolutionFactor;
			
			const circle = new ol.geom.Circle(transpoint, typRadius);				 
			let typCircleFeature = new ol.Feature(circle);
			
			const circleStyle = new ol.style.Style({
				image: new ol.style.Circle({
					fill: new ol.style.Fill({
						color: 'rgba(255, 26, 26, 0.45)'
					})
				})
			});
			
			typCircleFeature.setStyle(circleStyle);
			typDanSource.addFeature(typCircleFeature); // 원 요소를 추가해야 함
		}		
	}

	const typPointFeatureLayer = new ol.layer.Vector({
		source: typhoonCenterSource,
		zIndex: 100,
	});
	
	typCircleFeatureLayer = new ol.layer.Vector({
		source: typDanSource,
		zIndex: 80,
	});

	map.addLayer(typPointFeatureLayer);
	//map.addLayer(typCircleFeatureLayer);
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
	const typLineFeatureLayer = new ol.layer.Vector({
		source: typLineSource,
		zIndex: 99,
	});
	map.addLayer(typLineFeatureLayer);
}
