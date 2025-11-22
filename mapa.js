const pontosColeta = [
  { nome: "IFSP Bragança", lat: -22.9531, lng: -46.5446 },
  { nome: "EcoPonto Bom Jardim", lat: -22.9602, lng: -46.5387 }
];

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: { lat: -22.95, lng: -46.54 },
    mapTypeControl: false
  });

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    panel: document.getElementById("directions-panel")
  });

  const infoWindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      new google.maps.Marker({
        position: userPos,
        map: map,
        label: "Você"
      });

      // Traçar ponto mais próximo
      let menorDist = Infinity;
      let pontoMaisProximo = null;

      pontosColeta.forEach((ponto) => {
        const dist = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(userPos),
          new google.maps.LatLng(ponto)
        );
        if (dist < menorDist) {
          menorDist = dist;
          pontoMaisProximo = ponto;
        }

        new google.maps.Marker({
          position: { lat: ponto.lat, lng: ponto.lng },
          map: map,
          title: ponto.nome
        });
      });

      if (pontoMaisProximo) {
        directionsService.route({
          origin: userPos,
          destination: { lat: pontoMaisProximo.lat, lng: pontoMaisProximo.lng },
          travelMode: google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: new Date(),
            trafficModel: "bestguess"
          }
        }, (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
          } else {
            alert("Erro ao traçar rota: " + status);
          }
        });
      }

    }, () => {
      infoWindow.setPosition(map.getCenter());
      infoWindow.setContent("Erro: não foi possível obter sua localização.");
      infoWindow.open(map);
    });
  } else {
    infoWindow.setPosition(map.getCenter());
    infoWindow.setContent("Erro: navegador não suporta geolocalização.");
    infoWindow.open(map);
  }
}
