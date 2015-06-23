var user = (function(document) {
	var userId,
		favorites = [];
		
	function login() {
		if (!isLoggedIn()) {
		api.ref.authWithOAuthPopup("google", function(error, authData) {
	    	if (error) {
	        	console.log("Login Failed!", error);
				document.getElementById('favelid').setAttribute("user-id", "");
	        } else {
	          	console.log("Authenticated successfully with payload:", authData);
	          	userId = authData.uid;
				document.querySelector("#login-success").show();
	        }
		});
		} else {
			document.querySelector("#already-logged-in-error").show();
		}
		
	}
	
	function logout() {
		if (isLoggedIn()) {
			api.ref.unauth();
			console.log('User logged out.');
        	location.replace('http://localhost:3000/');		
			document.querySelector("#logout-success").show();
		} else {
			document.querySelector("#already-logged-out-error").show();
		}
	}
	
	function isLoggedIn() {
        return api.ref.getAuth();
	}
	
	function favorite(trailerId) {
		if (isLoggedIn()) {
			var path = 'favorites/' + isLoggedIn().uid;
			api.put(path, trailer.getId(), {
				'source': trailer.getSource(),
				'title': trailer.getTitle(),
				'youtubeid': trailer.getYoutubeId(),
				'description': trailer.getDescription()
				});
			console.log('Added ' + trailer.getId() + ' to favorites.');
		} else {
			console.log('Cannot add to favorite because user is not logged in.');
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
		} else {;
			console.log('Login to remove from favorites')
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