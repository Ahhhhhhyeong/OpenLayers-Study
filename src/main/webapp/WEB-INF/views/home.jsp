<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page contentType="text/html; charset=UTF8" pageEncoding="UTF-8" %>
<html>
<head>
	<title>OpenLayers Study</title>	
    <!-- jQuery -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-3.0.0.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-ui.min.js"></script>
    <!-- OpenLayers -->
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/build/ol.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/css/ol.css" type="text/css">
	<!-- css -->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/main.css">	
</head> 
<body>
	<div class="left-menu">
		<h2>Layer</h2>
		<button onclick="projectionOnclick(3857)" >3857지도</button>
		<button onclick="projectionOnclick(4326)" >4326지도</button>
		
		<br/><br/><br/><br/>
		
		<h2>Scale Unit Option</h2>
		<select id=projection>
	      <option value="degrees">degrees</option>
	      <option value="imperial">imperial inch</option>
	      <option value="us">us inch</option>
	      <option value="nautical">nautical mile</option>
	      <option value="metric" selected="">metric</option>
    	</select>
	</div>	
	
	<div id="map" class="map" tabindex="0"></div>
	<div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
	<script src="${pageContext.request.contextPath}/js/Map.js"></script>
</body>
</html>
