window.onload = () => {
  const ironhackBCN = {
    lat: 41.386230,
    lng: 2.174980,
  };

  const markers = [];

  // const map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 13,
  //   center: ironhackBCN,
  // });

  const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;
const mapElement = document.getElementById('map');

const mapOptions = {
  zoom: 5,
  center: ironhackBCN
};

const map = new google.maps.Map(mapElement, mapOptions);

function addMarker(title, lat, lng) {
  return new google.maps.Marker({ position: { lat, lng }, title });
}

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, function () {
        reject('Error in the geolocation service.');
      });
    } else {
      reject('Browser does not support geolocation.');
    }
  });
}

function drawRoute(src, dest) {
  console.log('drawRoute');
  directionsService.route({
      origin: { lat: src.lat, lng: src.lng },
      destination: { lat: dest.lat, lng: dest.lng },
      travelMode: 'WALKING'
    },
    function(response, status) {
      if (status === 'OK') {
        console.log('callback called success');
        directionsDisplay.setDirections(response);
      } else {
        console.log('callback called error');
        console.log('Directions request failed due to ' + status);
      }
    }
  );
  directionsDisplay.setMap(map);
}

function start() {
  getCurrentLocation()
    .then(objLoc => {
      drawRoute(objLoc, {
        lat: -10.973229,
        lng: -37.075218
      })
    })
    .catch(err => console.log('Error on promise', err));
  // addMarker('My first marker', 41.3977381, 2.190471916);
}

start();
};
