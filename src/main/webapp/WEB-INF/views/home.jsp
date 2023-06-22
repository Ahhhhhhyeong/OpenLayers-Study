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
	<script type="text/javascript"> var pageContextPath = '${pageContext.request.contextPath}'; </script>	
	<!-- css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.15.1/css/ol.css" type="text/css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/main.css"> 	
</head> 
<body>	
	<div id="map" class="map" tabindex="0"></div>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/Map.js"></script>	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/Typhoon.js"></script>	
</body>
</html>
