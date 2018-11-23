function startMap() {

  //First coordinates
  const saoPaulo = {
    lat: -23.5505,
    lng: -46.6333
  };

  //Create map
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: saoPaulo
  });

  //Geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(user_location);
      // Add a marker for your user location
      const marker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }

  //Get textContent from clicked restaurant
  let arr = Array.from(document.getElementsByClassName('rest-name'))
  arr.forEach(rest => {
    rest.addEventListener('click', () => {
      let address = rest.nextElementSibling.textContent
      geocodeAddress(geocoder, map, address);
    })
  });

  //Create the marker converting the address to geocoder
  let geocoder = new google.maps.Geocoder();

  function geocodeAddress(geocoder, resultsMap, address) {
    let address = address
    geocoder.geocode({
      'address': address
    }, function (results, status) {
      console.log(results)
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        let marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }

    });
    
  }
}

startMap();