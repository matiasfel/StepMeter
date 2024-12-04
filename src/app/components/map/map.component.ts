import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  // Coordenadas iniciales (puedes cambiar a otra ubicación si lo deseas)
  center: google.maps.LatLngLiteral = { lat: -33.4489, lng: -70.6693 }; // Santiago, Chile
  zoom = 12;

  // Opciones personalizadas
  options: google.maps.MapOptions = {
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    scaleControl: true,
    rotateControl: true,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [{ "color": "#ebe3cd" }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#523735" }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#f5f1e6" }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#c9b2a6" }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#dcd2be" }]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#444444" }]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{ "color": "#f2f2f2" }]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          { "saturation": -100 },
          { "lightness": 45 }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{ "visibility": "simplified" }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          { "color": "#46bcec" },
          { "visibility": "on" }
        ]
      }
    ],
  };

  marker: google.maps.Marker | null = null;
  map: google.maps.Map | null = null;

  constructor() {
    // Establece una ubicación inicial por si la geolocalización no funciona
    this.center = { lat: -33.4489, lng: -70.6693 }; // Santiago, Chile
  }

  ngAfterViewInit() {
    this.getCurrentLocation();
  }

  // Función para obtener la geolocalización y poner el marcador
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Obtén las coordenadas de la ubicación actual
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Actualiza el centro del mapa
          this.center = { lat, lng };

          // Centra el mapa en la ubicación actual
          if (this.googleMap) {
            this.googleMap?.googleMap?.setCenter(this.center);
          }

          // Si el marcador ya existe, actualízalo. Si no, créalo.
          if (this.marker) {
            this.marker.setPosition(this.center);
          } else {
            this.addMarker();
          }
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
    if (this.center && this.googleMap) {
      this.marker = new google.maps.Marker({
        position: this.center,
        map: this.googleMap.googleMap,
        title: 'Mi ubicación',
        icon: {
          url: 'assets/images/mark.png',  // Ruta al icono personalizado
          scaledSize: new google.maps.Size(50, 50),  // Tamaño del icono
        },
      });
    }
  }
  
  // Función para centrar el mapa
  centerMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Obtén las coordenadas de la ubicación actual
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Actualiza el centro del mapa
          this.center = { lat, lng };

          // Centra el mapa en la ubicación actual
          if (this.googleMap) {
            this.googleMap?.googleMap?.setCenter(this.center);
          }

          // Si el marcador ya existe, actualízalo. Si no, se créa.
          if (this.marker) {
            this.marker.setPosition(this.center);
          } else {
            this.addMarker();
          }
        },
        (error) => {
          console.error('Error al obtener la geolocalización', error);
        }
      );
    } else {
      alert('La geolocalización no está disponible en este dispositivo.');
    }
  }
}
