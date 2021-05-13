require('./dist/dash.all.debug.js')
require('./dist/dash.offline.debug.js')
const DOMParser = require ('xmldom')
const XMLHttpRequest = require('xmlhttprequest')
const { PerformanceObserver, performance } = require('perf_hooks');

global.window = {};
global.window.DOMParser = DOMParser.DOMParser;
global.DOMParser = DOMParser.DOMParser;
global.XMLSerializer = DOMParser.XMLSerializer;

global.XMLHttpRequest = XMLHttpRequest.XMLHttpRequest;

global.window.performance = performance;
global.performance = performance;



console.log("main START", performance.now());

let records = [];
let offlinePlayer;
let offlineController;

let getAllRecords = function () {
	records.splice(0, records.length);
	offlineController.getAllRecords().forEach(function (element) {
			records.push(element);
			});
};


try {
	offlinePlayer = dashjs.MediaPlayer().create();
	offlinePlayer.on(dashjs.MediaPlayer.events.ERROR, function (e) {
			console.log("err", e);
			});
	offlinePlayer.initialize(null, null, false);
	offlineController = offlinePlayer.getOfflineController();
	offlinePlayer.on(dashjs.MediaPlayer.events.OFFLINE_RECORD_LOADEDMETADATA, function (e) { /* jshint ignore:line */
			//                console.log("JSON.stringified", JSON.stringify(e));
			//                $scope.mediaInfos = e.mediaInfos;
			//                $scope.manifestId = e.id;
			//                $scope.showRepresentationModal();
			let mediaInfos = [];
			mediaInfos.push(e.mediaInfos[0]);
			mediaInfos.forEach(function (item) {
					console.log(item)
					});

			offlinePlayer.getOfflineController().startRecord(e.id, mediaInfos);
			}, this/*$scope*/);
offlinePlayer.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, function (e) { 
console.log("MANIFEST_LOADED", e);
});
offlinePlayer.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (e) { 
console.log("QUALITY_CHANGE_REQUESTED", e);
});
offlinePlayer.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (e) {
console.log("QUALITY_CHANGE_RENDERED", e);
});
offlinePlayer.on(dashjs.MediaPlayer.events.PERIOD_SWITCH_COMPLETED, function (e) {
console.log(dashjs.MediaPlayer.events.PERIOD_SWITCH_COMPLETED, e);
});
offlinePlayer.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function (e) {
console.log(dashjs.MediaPlayer.events.STREAM_INITIALIZED, e);
});
offlinePlayer.on(dashjs.MediaPlayer.events.PLAYBACK_ENDED, function (e) {
console.log(dashjs.MediaPlayer.events.PLAYBACK_ENDED, e);
});
offlinePlayer.on(dashjs.MediaPlayer.events.OFFLINE_RECORD_STARTED, function (e) {
console.log(dashjs.MediaPlayer.events.OFFLINE_RECORD_STARTED, e);
});
offlinePlayer.on(dashjs.MediaPlayer.events.OFFLINE_RECORD_FINISHED, function (e) {
console.log(dashjs.MediaPlayer.events.OFFLINE_RECORD_FINISHED, e);
});
offlinePlayer.on(dashjs.MediaPlayer.events.OFFLINE_RECORD_STOPPED, function (e) { 
console.log(dashjs.MediaPlayer.events.OFFLINE_RECORD_STOPPED, e);
});


	offlineController.createRecord("http://livesim.dashif.org/dash/vod/testpic_2s/multi_subs.mpd")
		.then(function (id) {
				id = id;
				// new record has been created, let's refresh record list
				getAllRecords();

				})
	        .catch(function(msg) {
			console.log(msg);
	        });
}
catch (e) {
	console.log("catch", e);
}

console.log("main END", performance.now());
