var main = (function(document) {
	function getVideos() {
		var videoReference = api.get('videos');
		var videolist = [];
		
		videoReference.once("value", function(videos) { 
			videolist = videos.val();
		});
			console.log(videolist);
		return videolist;
	}
  
  var interface = {
    'getVideos': getVideos
  };
  return interface;
})(document);