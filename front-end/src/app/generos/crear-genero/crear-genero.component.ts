import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenerosService } from 'src/app/service/generos.service';
import { letraMayuscula } from 'src/app/utilidades/listado-generico/validadores/letraMayuscula';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent  {

  constructor(private route:Router,private generoService:GenerosService ) { }
  guardarCambios(genero:generoCreacionDTO ){
    this.generoService.crear( genero).subscribe(()=>{
      this.route.navigate(["/generos"]);
      //console.log(genero.nombre);
    },error => console.error(error)) 
  }
}
