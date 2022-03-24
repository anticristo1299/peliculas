import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker, icon } from 'leaflet';
import { coordenadas } from './coordenadas';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit {
   //esto recibe las coordenadas del componente formulario-cines 
   @Input() coordenadas:coordenadas[]=[];
  //envio esta coordenadas al formulario de editar-cine
  @Output() coordenadaSeleccionada:EventEmitter<coordenadas>=new EventEmitter<coordenadas>();

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(-34.671617436363604, -58.42529296875001)
  };
  constructor() { }

  ngOnInit(): void {
    this.capas=this.coordenadas.map(valor=> marker([valor.latitud,valor.longitud]));
    
    //esto es necesario para reenderizar la imagen del mapa al cargar porque sino me tira error 404
    this.capas = this.coordenadas.map((valor) =>
      marker([valor.latitud, valor.longitud], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      })
    );
  }
  //esto es para poner una bandera en la ubicación del mapa
  capas:Marker<any>[]=[];
  posicion(posicion : LeafletMouseEvent)
  {
    const latitud=posicion.latlng.lat;
    const longitud=posicion.latlng.lng;
    //aca reseteo para que no me marque mas de 1 bandera 
    this.capas=[];
    this.capas.push(
      marker([latitud, longitud], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      })
    );
    //envio las coordenadas al elemento padre
    this.coordenadaSeleccionada.emit({latitud:latitud,longitud:longitud});
  }
}
