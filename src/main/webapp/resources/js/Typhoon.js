let typFeatureLayer;


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
			console.log(data);
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
	//경로 좌표 그리기
	drawingTypPaht(features);	
}

//경로 좌표 그리기
const drawingTypPaht = (path) => {
	const mapView = map.getView();
	const projection = mapView.getProjection();
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

	typFeatureLayer = new ol.layer.Vector({
		source: typhoonCenterSource,
		zIndex: 1000,
	});

	map.addLayer(typFeatureLayer);
};

const pointStyles = new ol.style.Style({
	image: new ol.style.Circle({
		radius: 5, // 원의 반지름 크기 설정
		fill: new ol.style.Fill({ color: 'red' }), // 원의 채우기 색상 설정
		stroke: new ol.style.Stroke({ color: 'black', width: 2 }) // 원의 외곽선
	})
});

//선 스타일
const strokeStyles = new ol.style.Style({
	stroke: new ol.style.Stroke({
		color: 'blue',
		width: 3
	})
});
