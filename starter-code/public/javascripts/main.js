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
          lat: (user_location.lat),
          lng: (user_location.lng + 0.004)
        })

        // Add a marker
        let iconMarker = {
          url: '../images/broccoli.svg', // brocolis url
          scaledSize: new google.maps.Size(40, 40), // size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 32) // anchor
        };

        const newMarker = new google.maps.Marker({
          position: {
            lat: user_location.lat,
            lng: user_location.lng
          },
          map: map,
          icon: iconMarker
        });

      }, function () {
        console.log('Error in the geolocation service.');
      });
    } else {
      console.log('Browser does not support geolocation.');
    }
  }

  startMap();
};