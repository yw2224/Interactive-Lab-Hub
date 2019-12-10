var game = null;
var menu = null;

var KEY_LEFT = 37;
var KEY_RIGHT = 39;

var SCREEN_WIDTH = 600;
var SCREEN_HEIGHT = 480;

function init() {
	socket.emit('state', "BREAKOUT");
    menu = new Menu('menu-container');
    game = new Game('canvas', SCREEN_WIDTH, SCREEN_HEIGHT);

    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('keydown', keyDown, false);

    ImageLoader.load({
        'ball': 'assets/ball.png',
        'player': 'assets/player_tron.png',
        'brick': 'assets/bricks_tron60x20.png'
    }, function(){
        menu.init();
    });
}

var socket = io();
socket.on('direction', function(msg) {
	msg = msg.toString();
	console.log(msg);
	if (msg == "left") {
		document.body.dispatchEvent(new KeyboardEvent("keydown", {
    		bubbles: true, cancelable: true, keyCode: KEY_LEFT
		}));
	} else if (msg == "right") {
		document.body.dispatchEvent(new KeyboardEvent("keydown", {
    		bubbles: true, cancelable: true, keyCode: KEY_RIGHT
		}));
	} else if (msg == "mid") {
		document.body.dispatchEvent(new KeyboardEvent("keyup", {
    		bubbles: true, cancelable: true, keyCode: KEY_LEFT
		}));
		document.body.dispatchEvent(new KeyboardEvent("keyup", {
    		bubbles: true, cancelable: true, keyCode: KEY_RIGHT
		}));
	}
});

//===============================================================
// Key Handler
//===============================================================

function keyDown(e) {
    switch (e.keyCode) {
        case KEY_RIGHT:
            game.keys.right = true;
            break;
        case KEY_LEFT:
            game.keys.left = true;
            break;
    }
}

function keyUp(e) {
    switch (e.keyCode) {
        case KEY_RIGHT:
            game.keys.right = false;
            break;
        case KEY_LEFT:
            game.keys.left = false;
            break;
    }
}
