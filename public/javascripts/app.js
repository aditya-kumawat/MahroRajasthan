function initMap(pos) {
  // console.log(pos);
  var x = {lat: pos.coords.latitude, lng: pos.coords.longitude};
  // console.log(x)
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: x
  });
  var marker = new google.maps.Marker({
    position: x,
    map: map
  });
}

window.onload = function() {
  var startPos;
  var geoopts = {
    enableHighAccuracy: true
  };
  var geoSuccess = function(position) {
    startPos = position;
    initMap(startPos);
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoopts);
}; 