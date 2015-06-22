var user = (function(document) {
	var userId;
		
	function login() {
		api.ref.authWithOAuthPopup("google", function(error, authData) {
	    	if (error) {
	        	console.log("Login Failed!", error);
	        } else {
	          	console.log("Authenticated successfully with payload:", authData);
	          	userId = authData.uid;
	        }
		});
	}
	
	function logout() {
		api.ref.unauth();
	}
	
	function isLoggedIn() {
        return api.ref.getAuth();
	}
	
	function favorite(trailerId) {
		if (isLoggedIn()) {
			var path = 'favorites/' + isLoggedIn().uid;
			api.put(path, trailerId, true);
		}
	}
	
	function unfavorite(trailerId) {
		if (isLoggedIn()) {
			var favoritesReference = api.get('favorites/' + isLoggedIn().uid);
	        favoritesReference.on("value", function(snapshot) {
	          var favoritesSnapshot = snapshot.val();
	          delete favoritesSnapshot[trailerId];
	          favoritesReference.set(favoritesSnapshot);
	        }, function (errorObject) {
	          console.log("The delete failed: " + errorObject.code);
	        });
		}
	}
	
	var interface = {
		'login': login,
		'logout': logout,
		'isLoggedIn': isLoggedIn,
		'favorite': favorite,
		'unfavorite': unfavorite
	};
	
	return interface;
})(document);