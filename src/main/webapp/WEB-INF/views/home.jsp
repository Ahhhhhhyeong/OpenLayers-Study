<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page contentType="text/html; charset=UTF8" pageEncoding="UTF-8" %>
<html>
<head>
	<title>OpenLayers Study</title>
	<link rel="stylesheet" href="https://openlayers.org/en/v3.20.1/css/ol.css" type="text/css">
    <!-- jQuery -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-migrate-1.2.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-ui.min.js"></script>
    
    
    <script type="text/javascript" src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
    <script type="text/javascript" src="https://openlayers.org/en/v3.20.1/build/ol.js"></script>	
    
	<script src="${pageContext.request.contextPath}/js/Map.js"></script>	
	<style>
		#map{
			height: 100%;
			width: 80%;
			float: right;			
		}		
		
		.right-menu{			
			float: left;
		}
	</style>
</head>
<body>
	<div class="right-menu">
		<h2>Layer</h2>
		<button onclick="projectionOnclick(3857)">3857지도</button>
		<button onclick="projectionOnclick(4326)">4326지도</button>
		
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
	
	
</body>
</html>
