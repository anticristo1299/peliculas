import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorDTO, actoresCreacionDTO } from '../actores';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {
  @Input("modelo") modelo?:actorDTO;
   imagenCambiada=false;
  //con este Output le envio la informacion del formulario al componente Editar-actor y crear-actor 
  @Output()
  submit: EventEmitter<actoresCreacionDTO> = new EventEmitter<actoresCreacionDTO>();
  constructor(private formBuilder:FormBuilder) { }
form!:FormGroup;

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombre:["",{validators:[Validators.required]}],
      fechaNacimiento:"",
      foto:"",
      biografia:""
    })
    if(this.modelo!=undefined)
    {
      this.form.patchValue(this.modelo);
    }
  }
  //aca obtengo los datos del form 
  onSubmit()
  {
    //si el usuario no cambio la foto entonces que null la propiedad del form, para no gasta ancho de banda
    if(!this.imagenCambiada)
    {
      this.form.patchValue({"foto":null});
    }
    if(this.form.valid)
    {
      console.log(this.form.value);
      this.submit.emit(this.form.value);

    }
  }
  //cada vez que agrego una imagen en el input-img, obtengo el archivo y le agrego al formulario
  archivoSeleccionado(archivo:any)
  {
    this.imagenCambiada=true;
    this.form.get("foto")?.setValue(archivo);
  }
  changeMarkdown(biografia:any)
  {

    this.form.get("biografia")?.setValue(biografia);
  }
}
