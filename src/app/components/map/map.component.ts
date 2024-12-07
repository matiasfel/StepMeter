import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  estimatedTime: string | null = null;
  lastDestination: google.maps.LatLngLiteral | null = null;

  // Coordenadas iniciales
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 12;

  // Variables para estadísticas y pasos
  distance: number = 0; // En kilómetros
  calories: number = 0; // Calorías estimadas
  steps: number = 0; // Contador de pasos

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
      { "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "weight": 2 }] },
      { "featureType": "all", "elementType": "geometry.stroke", "stylers": [{ "color": "#9c9c9c" }] },
      { "featureType": "all", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] },
      { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
      { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] },
      { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] },
      { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
      { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
      { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#eeeeee" }] },
      { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#7b7b7b" }] },
      { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] },
      { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] },
      { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
      { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] },
      { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }] },
      { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b5dae1" }] },
      { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#070707" }] },
      { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }
    ]
  };

  marker: google.maps.Marker | null = null;
  map: google.maps.Map | null = null;

  directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
  directionsRenderer: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer();

  constructor(
    private alertController: AlertController
  ) {}

  showAlert(header: string, message: string) {
    this.alertController
      .create({
        header,
        message,
        buttons: ['Aceptar'],
      })
      .then((alert) => alert.present());
  }

  async promptDestination() {
    const alert = await this.alertController.create({
      header: 'Calcular Ruta',
      inputs: [
        {
          name: 'destination',
          type: 'text',
          placeholder: 'Ubicación del destino',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            const destination = data.destination;
            if (destination) {
              try {
                const geocoder = new google.maps.Geocoder();
                const results = await geocoder.geocode({ address: destination });
                if (results.results && results.results[0]) {
                  const location = results.results[0].geometry.location;
                  const destinationCoords = {
                    lat: location.lat(),
                    lng: location.lng(),
                  };

                  // Guardar el destino ingresado
                  this.lastDestination = destinationCoords;

                  // Calcular y mostrar la ruta
                  this.calculateAndDisplayRoute(this.center, destinationCoords);
                } else {
                  this.showAlert('Error', 'No se pudo encontrar la ubicación ingresada.');
                }
              } catch (error) {
                console.error('Error al geocodificar la ubicación', error);
                this.showAlert('Error', 'Ocurrió un error al buscar la ubicación.');
              }
            } else {
              this.showAlert('Error', 'Debe ingresar una ubicación válida.');
            }
          },
        },
      ],
    });

    await alert.present();
  }
  
  estimateCalories(distance: number): number {
    const caloriesPerKm = 50;
    return distance * caloriesPerKm;
  }

    // Métodos para el marcador de pasos
  increaseSteps() {
    this.steps += 1;
  }

  decreaseSteps() {
    if (this.steps > 0) {
      this.steps -= 1;
    }
  }

  calculateAndDisplayRoute(
    start: google.maps.LatLngLiteral,
    end: google.maps.LatLngLiteral
  ) {
    const request: google.maps.DirectionsRequest = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.WALKING,  // Puedes cambiar esto a TRANSPORT si usas vehículo.
    };
  
    this.directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK && response) {
        this.directionsRenderer.setDirections(response);
  
        // Extraer distancia y tiempo estimado
        const route = response.routes[0];
        if (route && route.legs && route.legs[0]) {
          const leg = route.legs[0];
          this.distance = leg.distance ? leg.distance.value / 1000 : 0; // Convertir metros a kilómetros
          this.estimatedTime = leg.duration ? leg.duration.text : 'No se pudo obtener la información de la ruta.'; // Tiempo estimado
          this.calories = this.estimateCalories(this.distance); // Calcular calorías estimadas
        } else {
          this.distance = 0;
          this.estimatedTime = 'No se pudo obtener la información de la ruta.';
        }
      } else {
        console.error('Error al obtener la ruta:', status);
        this.distance = 0;
        this.estimatedTime = 'No se pudo calcular la ruta. Intente nuevamente.';
      }
    });
  }

  ngAfterViewInit() {
    this.initMap();
    this.getCurrentLocation();
  }

  initMap() {
    if (this.googleMap && this.googleMap.googleMap) {
      this.map = this.googleMap.googleMap;
      this.directionsRenderer.setMap(this.map);
    }
  }

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

          // Si hay un destino previo, calcular la ruta hacia él
          if (this.lastDestination) {
            this.calculateAndDisplayRoute(this.center, this.lastDestination);
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
    if (this.center && this.map) {
      this.marker = new google.maps.Marker({
        position: this.center,
        map: this.map,
        title: 'Mi ubicación',
        icon: {
          url: 'assets/images/mark.png', 
          scaledSize: new google.maps.Size(50, 50),
        },
      });
    }
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