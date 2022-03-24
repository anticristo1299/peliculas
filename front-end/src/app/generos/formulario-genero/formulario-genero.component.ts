import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerosService } from 'src/app/service/generos.service';
import { letraMayuscula } from 'src/app/utilidades/listado-generico/validadores/letraMayuscula';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  constructor(private formBuilder:FormBuilder  ) { }
  //este input recibe los datos del componente editar y le pasa a los input del form 
  @Input() datosForm:generoCreacionDTO;
  //generoCreacionDTO es una interfaz que recibe los datos del formulario 
  @Output() onSubmit : EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();
  form!:FormGroup;
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombre:["",{
        validators:[Validators.required,Validators.minLength(5),letraMayuscula()]
      }]
    })
    //si datos tiene algo
    if(this.datosForm!==undefined)
    { 
      //automaticamente me pasa los datos a cada input correspondiente 
      this.form.patchValue(this.datosForm);
    }
  }
  
  errorNombre():any
  {
    var nombre=this.form.get("nombre");
    if(nombre?.hasError("required")){
      return "El campo es requerido";
    }
    if(nombre?.hasError("minlength")){
      return "La longitud minima es 5 caracteres";
    }
    if(nombre?.hasError("letraMayuscula")){
      return nombre.getError("letraMayuscula").mensaje;
    }
  }
  guardarCambios(){
    
    //le paso a la variable onSubmit los datos del form y esa variable se encarga de pasar al componente padre a travez del output
    this.onSubmit.emit(this.form.value);

  }
}
