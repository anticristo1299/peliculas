import { Component, OnInit } from '@angular/core';
import { cinesCreacionDTO } from '../cines';

@Component({
  selector: 'app-crear-cines',
  templateUrl: './crear-cines.component.html',
  styleUrls: ['./crear-cines.component.css']
})
export class CrearCinesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  //aca recibo los datos del formulario-cine que me envia los datos del form
  guardarCambios(datos:cinesCreacionDTO){
    console.log(datos);
  }
}
