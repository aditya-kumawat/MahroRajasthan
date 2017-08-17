$(document).ready(function() {
  initMap();
  current_location();

  $(".pop-up .close").on("click", closePopUp);
  $(".start-tour").on("click", startTour);
});

var map, marker;
var check_marker = 0;
var source;
var curPos, newPos;
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

  showPopUp(dest);
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
      curPos = source
      newPos = curPos;
      initInterval();
      placeMarker(source);
    }, function(error) {
      if(error) 
        console.log("Fail");
    });
  }
}

function showPopUp(dest) {
  newPos = dest;
  $.get("/api/locationInfo", dest, function(data, response) {
    // if(response=='success') {
      openPopUp(data.locationTag, data.info);
    // }
  })
}

function closePopUp() {
  var $popUp = $(".pop-up-container.open");
  $popUp.removeClass("open");
  $popUp.find(".title").text("");
  $popUp.find(".content").text("");
}

function openPopUp(title, content) {
  var $popUp = $(".pop-up-container");
  $popUp.find(".title").text(title);
  $popUp.find(".content").text(content);
  $popUp.addClass("open");
}
    
function initInterval() {
  var locationInterval = window.setInterval(function() {
    var temp;
    navigator.geolocation.getCurrentPosition(function(position) {
      source = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
      };
      temp = source;
        if( (Math.abs(temp.lat - curPos.lat) <= 0.5) && (Math.abs(temp.lat - curPos.lat) <= 0.5) ) 
          return;
        else {
            newPos = temp;
          curPos = newPos;
          $.post("/api/updateTour", curPos, function(data, response) {
              console.log(response);
          });
        }
    }, function(error) {
      if(error) 
        console.log("Fail");
    });

  }, 5000);
}

function startTour() {
    $.get("api/getTour", function(data, response) {
        if(response == "success") {

        }
    });
}