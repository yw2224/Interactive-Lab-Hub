var socket = io();
socket.on('direction', function(msg) {
	msg = msg.toString();
	if (msg != "mid") console.log(msg);
	if (msg == "right") {
		player.seekTo(player.getCurrentTime() + 5);
	} else if (msg == "left") {
		player.seekTo(player.getCurrentTime() - 5);
	} else if (msg == "up") {
		player.setVolume(player.getVolume() + 1);
	} else if (msg == "down") {
		player.setVolume(player.getVolume() - 1);
	}
});
socket.on('flex', function(msg) {
	var playerStatus = player.getPlayerState();
	if (playerStatus == 1)
		player.pauseVideo();
	else if (playerStatus == 2 || playerStatus == 5) // paused or cued
		player.playVideo();
});
socket.on('fsr', function(msg) {
	msg = msg.toString().split(",")[1];
	if (msg == "1") {
		player.nextVideo();
	} else if (msg == "3") {
		player.previousVideo();
	} else if (msg == "2") {
		socket.emit('state', "HOME");
		window.location.href = "/";
		return;
	}
	console.log(player.getVideoData().title);
});

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
	height: '390',
	width: '640',
	// videoId: 'M7lc1UVf-VE',
	// playlist: 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
	playerVars: {
	  listType:'playlist',
	  list: 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG'
  	},
	events: {
	  'onReady': onPlayerReady,
	  'onStateChange': onPlayerStateChange
	}
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	socket.emit('state', "YOUTUBE");
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  socket.emit('info', player.getVideoData().title);
  if (event.data == YT.PlayerState.PLAYING && !done) {
	setTimeout(stopVideo, 6000);
	done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
