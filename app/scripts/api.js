var api = (function(document) {
	var apiUrl = "https://resplendent-inferno-5602.firebaseio.com",
		rootReference = new Firebase(apiUrl);
	
	function apiGet(path) {
		var data = rootReference.child(path);
		return data;		
	}
	
	function apiPost(path, data) {
		var target = rootReference.child(path);
		target.push(data);
		console.log("Post(" + path +"): " + data);
	}
	
	function apiPut(path, id, data) {
		var pathReference = rootReference.child(path);
		var target = pathReference.child(id);
		target.set(data);
		console.log("Put(" + path + " " + id + "): " + data);
	}
	
	var interface = {
		'url': apiUrl,
		'get': apiGet,
		'post': apiPost,
		'put': apiPut,
		'ref': rootReference
	};
	
	return interface;
})(document);