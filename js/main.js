$(function(){
	
	$(".findOut").click(function(){
	milesAway();
	});
	
	function milesAway(){
		$(".geoOne").hide(400);
		$(".findOut").hide(400);
		$(".milesAway").show(400);
			
	var x=$('.miles');
	function distance(lon1, lat1, lon2, lat2) {
	var R = 3957; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2-lon1).toRad(); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in miles
  return d;
	}
	
	/** Converts numeric degrees to radians */
	if (typeof(Number.prototype.toRad) === "undefined") {
	  Number.prototype.toRad = function() {
	    return this * Math.PI / 180;
	  }
	}
	
	window.navigator.geolocation.getCurrentPosition(function(pos) {
	  var loc = Math.floor(distance(pos.coords.latitude, pos.coords.longitude, 33.9688358, -84.3621999));
	  x.append(loc);
	 console.log("lat = " + pos.coords.latitude + ". long = " + pos.coords.longitude);
	});

} //End milesAway function
	
	
	
});