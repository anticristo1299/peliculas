import { Component, Input, OnInit } from '@angular/core';
import { coordenadas } from 'src/app/utilidades/mapas/coordenadas';
import { cinesCreacionDTO, cinesDTO } from '../cines';

@Component({
  selector: 'app-editar-cines',
  templateUrl: './editar-cines.component.html',
  styleUrls: ['./editar-cines.component.css']
})
export class EditarCinesComponent implements OnInit {
  
  modelo:cinesDTO={nombre:"spiderman",latitud:-28.691792332587482,longitud:-55.15136718750001}
  constructor() { }

  ngOnInit(): void {
  }
//aca recibo los datos del formulario-cine que me envia los datos del form
guardarCambios(datos:cinesCreacionDTO){
  console.log(datos);
}
}
