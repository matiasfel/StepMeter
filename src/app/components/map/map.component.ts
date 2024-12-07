import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  // Coordenadas iniciales
  center: google.maps.LatLngLiteral = { lat: -33.4489, lng: -70.6693 }; // Santiago, Chile
  zoom = 12;

  // Opciones personalizadas del mapa
  options: google.maps.MapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    scaleControl: true,
    rotateControl: true,
    minZoom: 8,
    maxZoom: 16,
    styles: [
      {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "weight": "2.00"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#9c9c9c"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#eeeeee"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#7b7b7b"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#46bcec"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#b5dae1"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#070707"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#ffffff"
              }
          ]
      }
  ]
  };

  marker: google.maps.Marker | null = null;
  map: google.maps.Map | null = null;

  directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
  directionsRenderer: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer();

  constructor() {
    // Definición de la ubicación inicial (Santiago)
    this.center = { lat: -33.4489, lng: -70.6693 }; // Santiago, Chile
  }

  ngAfterViewInit() {
    this.initMap();
    this.getCurrentLocation(); // Obtener la ubicación y calcular la ruta
  }

  initMap() {
    if (this.googleMap && this.googleMap.googleMap) {
      this.map = this.googleMap.googleMap;
      this.directionsRenderer.setMap(this.map); // Establecer el mapa en el renderer
    }
  }

  // Función para obtener la geolocalización y poner el marcador
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.center = { lat, lng };

          // Centra el mapa en la ubicación actual
          if (this.map) {
            this.map.setCenter(this.center);
          }

          // Actualiza o añade el marcador
          if (this.marker) {
            this.marker.setPosition(this.center);
          } else {
            this.addMarker();
          }

          // Definir el destino (Santiago, Chile)
          const destination = { lat: -33.4489, lng: -70.6693 };

          // Calcular y mostrar la ruta desde la ubicación actual a Santiago
          this.calculateAndDisplayRoute(this.center, destination);
        },
        (error) => {
          console.error('Error al obtener la geolocalización', error);
        }
      );
    } else {
      alert('La geolocalización no está disponible en este dispositivo.');
    }
  }

  addMarker() {
    if (this.center && this.map) {
      this.marker = new google.maps.Marker({
        position: this.center,
        map: this.map,
        title: 'Mi ubicación',
        icon: {
          url: 'assets/images/mark.png',  // Ruta al icono personalizado
          scaledSize: new google.maps.Size(50, 50),  // Tamaño del icono
        },
      });
    }
  }

  // Función para calcular y mostrar la ruta
  calculateAndDisplayRoute(start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral) {
    const request: google.maps.DirectionsRequest = {
      origin: start,  // Punto de inicio
      destination: end,  // Punto de destino (Santiago, Chile en este caso)
      travelMode: google.maps.TravelMode.DRIVING,  // Modo de transporte (puedes cambiar a WALKING o BICYCLING)
    };

    // Calcular la ruta usando el DirectionsService
    this.directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        // Si la respuesta es OK, renderiza la ruta
        this.directionsRenderer.setDirections(response);
      } else {
        console.error('Error al obtener la ruta:', status);
      }
    });
  }

  // Función para actualizar el centro del mapa y el marcador
  updateMapCenter(lat: number, lng: number) {
    this.center = { lat, lng };

    if (this.googleMap) {
      this.googleMap.googleMap?.setCenter(this.center);
    }

    if (this.marker) {
      this.marker.setPosition(this.center);
    } else {
      this.addMarker();
    }
  }
}