var trailer = (function(document) {
	var currentId = "", 
		currentTitle = "",
		currentSource = "", 
		currentDescription = "";
		
	function getId() {
		return currentId;
	}
	
	function setId(id) {
		currentId = id;
	}
		
	function getTitle() {
		return currentTitle;
	}
	
	function setTitle(title) {
		currentTitle = title;
	}
		
	function getSource() {
		return currentSource;
	}
	
	function setSource(source) {
		currentSource = source;
	}
		
	function getDescription() {
		return currentDescription;
	}
	
	function setDescription(description) {
		currentDescription = description;
	}
	
	function extractYoutubeIdFromSource() {
                var rxp = new RegExp("v=(.*?)(?=&|\r|\n|$)");
                return currentSource ? rxp.exec(currentSource)[1] : "";
        }
	
	var interface = {
		'getYoutubeId': extractYoutubeIdFromSource,
		'getId': getId,
		'setId': setId,
		'getTitle': getTitle,
		'setTitle': setTitle,
		'getSource': getSource,
		'setSource': setSource,
		'getDescription': getDescription,
		'setDescription': setDescription
		
	};
	
	return interface;
})(document);