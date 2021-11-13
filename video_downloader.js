/*
	UNDOWNLOADED VIDEOS
	-----------------------------
	-----------------------------
	
	BST Connstruction (BST)
	Min Height BST (BST)
	Kadane (Famous Algorithm)
	Cycle In Graph(Graph)
	Rectangle Mania(Graph)
	Sort K-Sorted Array (Heap)
	Ambiguous Measurements (Recursion)
	Search In Sorted Matrix (Searching)
	Shifted Biary Search(Searching)
	Quick Sort(Sorting)
	Balanced Brackets(Stacks)
	Sort Stacks(Stacks)
*/

var d = document.getElementsByClassName('_20zF1-8gEjy_tDQRHhze44');
var topics = document.getElementsByClassName('_3wMafTA1m7ljHnUCrBLc6i\n_3ohcBzjBqhdi58tZQjVQNM\n');

for(var i = 0 ; i < d.length ; ++i) {
    var topicName = topics[i].innerText;
    console.log('Downloading video for topic name : ', topicName);
    d[i].getElementsByTagName('a')[0].click()
    await new Promise(r => setTimeout(r, 3000));
    var akd = document.getElementsByClassName('_3HWhZbcZrROUecgeZoJvMV\n_2ZphQg0Zzr4BB_TOiDpAqS\n_2mf0xUw5fnT-EwtWcClJfO\n_3N0XnSo7wlU7fMQaf-9af-\n\n\n\n\n\n')
    akd[3].click();
    await new Promise(r => setTimeout(r, 3000));
    downloadEmbededVideos(topicName)
    history.back()
    await new Promise(r => setTimeout(r, 3000));
}

/**
 * Finds and downloads all embeded Vimeo videos.
 */
function downloadEmbededVideos(topicName) {
	// Find Vimeo embed frame
	var embedFrames = document.querySelectorAll('iframe[src*="player.vimeo.com"]');
	
	// No embed frames found?
	if (!embedFrames.length) {
		console.error("Failed to identify embeded video frame");
		return;
	}

	console.log('total videos found: ', embedFrames.length);

	// Retrieve embed source
	for (var i = 0; i < embedFrames.length; i++) {
		console.log('Requesting source for embedded video: ', embedFrames[i]);
		getSource(embedFrames[i].src, topicName, function(response, filename) {
			var mp4Url = findMp4Url(response);
			console.log('Downloading "' + mp4Url + '"...');
			downloadFile(mp4Url, filename);
		});
	}
}

/**
 * Retrieves content source at given URL.
 * @param {string} url URL from which content source will be retrieved
 * @param {function} callback Called with the retrieved source on successful retrieval
 */
function getSource(url, filename, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			callback(xhr.responseText, filename);
		}
	};
	xhr.open("GET", url, true);
	xhr.send(null);
};

/**
 * Finds mp4 URL within Vimeo embed source.
 * @param {string} source Source to search for mp4 URL
 * @return {string} The mp4 URL
 */
function findMp4Url(source) {
	return source.match(/"url"\s*:\s*"(https?:\/\/vod-progressive.akamaized.net[^"]+\.mp4(\?([^"]+=[^"]+;?)+)?)"/)[1];
}

/**
 * Downloads the file at a given URL.
 * @param {string} url The URL of the file to download
 */
function downloadFile(url, filename) {
	// var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
	
	console.log(filename);

	var xhr = new XMLHttpRequest();
	xhr.responseType = 'blob';
	xhr.onload = function() {
		var a = document.createElement('a');
		a.href = window.URL.createObjectURL(xhr.response);
		a.download = filename;
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		delete a;
	};
	xhr.open('GET', url);
	xhr.send();
}
