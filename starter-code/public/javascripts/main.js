
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

    let center = new google.maps.LatLng(41.3977381, 2.190471916);
    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 15
    });

    
    let request = {
      location: center,
      radius: 3000,
      types: ['restaurants']
    };
    
    let service = new google.maps.places.PlacesService(map);
    
    service.nearbySearch(request, callback);
    
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
          const user_location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      };
  
      map.setCenter(user_location);
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