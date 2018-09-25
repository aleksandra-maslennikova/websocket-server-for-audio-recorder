const fileWriter = null;
const WebSocket = require('ws');
const wav = require('wav');
const ws = new WebSocket.Server({ port: 4000 })

ws.on('connection', function connection(client) {
	var fileWriter = new wav.FileWriter(`audio-${Date.now()}.wav`, {
		channels: 1,
		sampleRate: 48000,
		bitDepth: 16
	});

	var data = new Buffer(0);

	client.on('message', function (newData) {
		data = Buffer.concat([data, newData], data.length + newData.length);
	});

	client.on('close', function () {
		fileWriter.write(data);
		fileWriter.end();
	});
});

