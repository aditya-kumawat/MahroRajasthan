$(document).ready(function() {
  initMap();
  current_location();
});

var map, marker;
var check_marker = 0;
var source;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 13
    });
    google.maps.event.addListener(map, 'click', function(event) {
     placeMarker(event.latLng);
  });
}

function placeMarker(location) {
    if(check_marker==1)
        marker.setMap(null);
    marker = new google.maps.Marker({
        position: location, 
        map: map
    });

    if(typeof location.lat ==="function")
        var dest = {
            lat : location.lat(),
            lng : location.lng(),
        }
    else
        var dest = {
            lat : location.lat,
            lng : location.lng,
        }
    map.setCenter(dest);

    console.log(dest);
    check_marker=1;
}

function current_location() {
    // Try HTML5 geolocation.
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            source = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            placeMarker(source);
        }, function(error) {
            if(error)
                console.log("Fail");
        });
    }
}