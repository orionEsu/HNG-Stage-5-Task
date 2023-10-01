/* eslint-disable no-undef */

// Polyfill for the Buffer object.
// if (!window.Buffer) {
//   window.Buffer = require('buffer');
// }

var recorder = null;
function onAccessApproved(stream) {
	recorder = new MediaRecorder(stream);

	recorder.start();

	recorder.onstop = function () {
		stream.getTracks().forEach(function (track) {
			if (track.readyState === 'live') {
				track.stop();
			}
		});
	};

	recorder.ondataavailable = function (event) {
		let recordedBlob = event.data;
        console.log(recordedBlob);
        
		// Create a FileReader to read the Blob as Data URL
		const reader = new FileReader();

		reader.onload = function () {
			// reader.result contains the base64 encoded string
			const base64String = reader.result;
			// Log the result to the console
			console.log('Base64 Encoded Video:', base64String);
            
            // If you need to send this base64 string to a server or perform any further actions, do it here:
			// Send the base64 string to the background script.
			chrome.runtime.sendMessage({
				message: 'recorded_blob',
				blob: base64String,
			});

		};

		reader.readAsDataURL(recordedBlob);
	};
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'request_recording') {
		console.log('requesting recording');
		sendResponse(`processed: ${message.action}`);

		navigator.mediaDevices
			.getDisplayMedia({
				audio: true,
				video: {
					width: 9999999999,
					height: 9999999999,
				},
			})
			.then((stream) => {
				onAccessApproved(stream);
			});
	}

	if (message.action === 'stop_recording') {
		console.log('stopping recording');
		sendResponse(`stopping: ${message.action}`);
		if (!recorder) return console.log('no recorder');
		recorder.stop();
	}
});