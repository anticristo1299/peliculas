import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { multipleSelector } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { peliculasCreacionDTO, peliculasDTO } from '../peliculas';
@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {
  @Output() OnSumbit:EventEmitter<peliculasCreacionDTO> = new EventEmitter<peliculasCreacionDTO>();
  constructor(private formBuilder:FormBuilder) { }
  form!:FormGroup;
  @Input() modelo?:peliculasDTO;
  //este generosSeleccionados recibe los datos de selector-multiple
  generoSeleccionados:multipleSelector[]=[];
  generoNoSeleccionados:multipleSelector[]=[{llave:1,valor:"Drama"},{llave:2,valor:"Acción"},{llave:3,valor:"Comedia"}]

  cinesSeleccionados:multipleSelector[]=[];
  cinesNoSeleccionados:multipleSelector[]=[{llave:1,valor:"Acropolis"},{llave:2,valor:"Sambil"},{llave:3,valor:"Agora"}]
  ngOnInit(): void {this.form=this.formBuilder.group({
    titulo:["",{validator:[Validators.required]}],
    resumen:"",
    enCines:false,
    trailer:"",
    fechaLanzamiento:"",
    poster:"",
    generosId:"",
    cinesId:""

  })
  if(this.modelo!==undefined)
  {
    this.form.patchValue(this.modelo);
  }
  }
  guardarCambios(){
    const generoIds=this.generoSeleccionados.map(val=> val.llave)
    //enlazo los generos selecionados con el form 
    this.form.get("generosId")?.setValue(generoIds);

    const cinesIds=this.cinesSeleccionados.map(val=> val.llave)
    //enlazo los generos selecionados con el form 
    this.form.get("cinesId")?.setValue(cinesIds);
    this.OnSumbit.emit(this.form.value);

    console.log(this.form.value);
  }
  //cada vez que agrego una imagen en el input-img, obtengo el archivo y le agrego al formulario
  archivoSeleccionado(archivo:any)
  {
    this.form.get("poster")?.setValue(archivo);
  }
  //aca recibo el resumen del componente markdown y le enlazo al form
  changeMarkdown(biografia:any)
  {
    this.form.get("resumen")?.setValue(biografia);
  }
}
