var socket = io();

socket.on('coordinate', function(msg) {
	console.log(msg);
	var center = map.getCenter();
	x = parseFloat(msg[1]), y = parseFloat(msg[2]), z = parseFloat(msg[3]);
	if (Math.abs(x) < 2 && Math.abs(y) < 2) return;
	map.setCenter({lat: parseFloat(center.lat()) + y * 0.001, lng: parseFloat(center.lng()) + x * 0.001});
});

socket.on('fsr', function(msg) {
	msg = msg.toString().split(",")[1];
	if (msg == "1") {
		var zoom = map.getZoom();
		console.log(zoom);
		map.setZoom(zoom - 1);

		var center = map.getCenter()
		var lat = Math.round(center.lat() * 100) / 100;
		var lng = Math.round(center.lng() * 100) / 100;
		socket.emit('info', lat.toString() + ", " + lng.toString());
	} else if (msg == "2") {
		socket.emit('state', "HOME");
		window.location.href = "/";
	}
});

socket.on('flex', function(msg) {
	var zoom = map.getZoom();
	console.log(zoom);
	map.setZoom(zoom + 1);

	var center = map.getCenter()
	var lat = Math.round(center.lat() * 100) / 100;
	var lng = Math.round(center.lng() * 100) / 100;
	socket.emit('info', lat.toString() + ", " + lng.toString());
});

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: {lat: 40.7557767, lng: -73.9583999},
		mapTypeControl: true,
		mapTypeControlOptions: {
		  style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
		  position: google.maps.ControlPosition.TOP_CENTER
		},
		zoomControl: true,
		zoomControlOptions: {
		  position: google.maps.ControlPosition.LEFT_CENTER
		},
		scaleControl: true,
		streetViewControl: true,
		streetViewControlOptions: {
		  position: google.maps.ControlPosition.LEFT_TOP
		},
		mapTypeId: 'satellite'
		// fullscreenControl: true
	});
	socket.emit('state', "MAP");
}
