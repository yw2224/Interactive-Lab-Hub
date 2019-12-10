var i = 0;
var selected = 0;
var tot = 4;
var socket = io();

function expand() {
	if (i == 0) {
		document.getElementById("menu").style.transform = "scale(3)";
   		document.getElementById("plus").style.transform = "rotate(45deg)";
    	i = 1;
  	} else {
		document.getElementById("menu").style.transform = "scale(0)";
   		document.getElementById("plus").style.transform = "rotate(0deg)";
    	i = 0;
  	}
  	$('a:nth-child(1)').css("color", "#c87f8a");
	console.log("back to home");
}

socket.on('flex', function(msg) {
	var prev = selected;
	$('a:nth-child(' + (prev + 1) + ')').css("color", "#bbbbbb");
	selected = (selected + 1) % tot;
	$('a:nth-child(' + (selected + 1) + ')').css("color", "#c87f8a");
});

socket.on('fsr', function(msg) {
	console.log($('a:nth-child(' + (selected + 1) + ')'));
	console.log($('a:nth-child(' + (selected + 1) + ')').attr('href'));
	window.location.href = $('a:nth-child(' + (selected + 1) + ')').attr('href');
});
