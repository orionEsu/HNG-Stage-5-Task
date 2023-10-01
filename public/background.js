/* eslint-disable no-undef */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === 'complete' && /^http/.test(tab?.url)) {
		{
			chrome.scripting
				.executeScript({
					target: { tabId },
					files: ['./content.js'],
				})
				.then(() =>
					console.log('Successfully Injected Script on Line 6')
				)
				.catch((err) => console.log(err));
		}
	}
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.message === 'recorded_blob') {
		// Convert base64 string back to binary data
		const binaryData = atob(message.blob.split(',')[1]);

		// Create a buffer from the binary data
		const buffer = new ArrayBuffer(binaryData.length);
		const view = new Uint8Array(buffer);
		for (let i = 0; i < binaryData.length; i++) {
			view[i] = binaryData.charCodeAt(i);
		}

		// Now you have the buffer, you can send it to an endpoint
		// sendBufferToEndpoint(buffer);
	}
});
