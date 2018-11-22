
  const arrRest = Array.from(document.getElementsByClassName('draw'));
  console.log(arrRest)
  arrRest.forEach(element => {
    console.log(element)
    element.addEventListener('click', function() {
      console.log('Batman!');
    }); 
  });

  let map;

  function startMap() {
    let center = new google.maps.LatLng(-23.5505, -46.6333);
    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 13
    });

    let request = {
      location: center,
      radius: 3000,
      types: ['restaurants']
    };

    let service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
    if(status === google.maps.places.PlacesServiceStatus.OK) {
      for(let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
  }

  google.maps.event.addDomListener(window, 'load', startMap())