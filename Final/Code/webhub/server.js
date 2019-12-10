var express = require('express'); // web server application
var app = express(); // webapp
var http = require('http').Server(app); // connects http library to server
var io = require('socket.io')(http); // connect websocket library to server
var serverPort = 8000;
var SerialPort = require('serialport'); // serial library
var Readline = SerialPort.parsers.Readline; // read serial data as lines


//---------------------- WEBAPP SERVER SETUP ---------------------------------//
app.use(express.static('public/home/')); // find pages in public directory
app.use(express.static('public'));

// start the server and say what port it is on
http.listen(serverPort, function() {
  console.log('listening on *:%s', serverPort);
});

const serial = new SerialPort("/dev/tty.SLAB_USBtoUART", {});
const parser = new Readline({
  delimiter: '\r\n'
});
serial.pipe(parser);

// arduino to server
parser.on('data', data => {
	if (data.includes('fsr')) {
	  	io.emit('fsr', data);
  	} else if (data.includes('flex')) {
	  	io.emit('flex', data);
  	} else if (data.includes('acc')) {
	  	dirs = data.toString().split(",");
	  	x = dirs[1], y = dirs[2], z = dirs[3];
	  	if (Math.abs(x) <= 2 && Math.abs(y) <= 2) {
			io.emit('direction', "mid");
		} else {
			if (Math.abs(x) >= Math.abs(y)) {
				if (x >= 0) io.emit('direction', "right");
				else io.emit('direction', "left");
			} else {
				if (y >= 0) io.emit('direction', "down");
				else io.emit('direction', "up");
			}
		}
		io.emit('coordinate', dirs);
  	} else {
		console.log("data" + data);
	}
});

// server to arduino
io.on('connect', function(socket) {
  console.log('a user connected');
  socket.on('info', (data) => { 
	serial.write(data.toString());
  });
  socket.on('state', (data) => {
	serial.write(data.toString());
  });
});
