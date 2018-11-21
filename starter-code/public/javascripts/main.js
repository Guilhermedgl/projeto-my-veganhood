const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;

window.onload = () => {
  function startMap() {

    // Initial coordinates
    const initialCortinates = {
      lat: -23.550305,
      lng: -46.6363896
    };
    // Initialize the map
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: initialCortinates
    });
    // Get geolocation from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Center map with user location
        map.setCenter({
          lat: (user_location.lat - 0.001),
          lng: (user_location.lng + 0.004)
        })

        // Add a marker
        let iconMarker = {
          url: '../images/broccoli.svg', // brocolis url
          scaledSize: new google.maps.Size(40, 40), // size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };

        const newMarker = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          icon: iconMarker
        });

        const directionRequest = {
          origin: { lat: user_location.lat, lng: user_location.lng},
          destination: 'Rio de Janeiro, BR',
          travelMode: 'DRIVING'
        };
        
        directionsService.route(
          directionRequest,
          function(response, status) {
            if (status === 'OK') {
              // everything is ok
              directionsDisplay.setDirections(response);
        
            } else {
              // something went wrong
              window.alert('Directions request failed due to ' + status);
            }
          }
        );
        
        directionsDisplay.setMap(map);

      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }

  startMap();

};