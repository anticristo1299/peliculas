import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { coordenadas } from 'src/app/utilidades/mapas/coordenadas';
import { cinesCreacionDTO } from '../cines';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css']
})
export class FormularioCineComponent implements OnInit {
  @Input() modelo!:cinesCreacionDTO;
  //aca recibo las coordenadas del componente editar-cine
  coordenadasInicial:coordenadas[]=[];
  @Output() guardarCambios:EventEmitter<cinesCreacionDTO>=new EventEmitter<cinesCreacionDTO>();
  constructor(private formBuilder:FormBuilder) { }
  form!:FormGroup;
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nombre:["",{validators:[Validators.required]}],
      longitud:["",{validators:[Validators.required]}],
      latitud:["",{validators:[Validators.required]}]

    })
    if(this.modelo!=undefined){
      this.form.patchValue(this.modelo);
      //aca le enlazo las coordenadas al formulario
      this.coordenadasInicial.push({latitud:this.modelo.latitud,longitud:this.modelo.longitud})
    }
  }
  onSubmit()
  {
    this.guardarCambios.emit(this.form.value);
  }
  coordenadaSeleccionada(coordenadas:coordenadas)
  {
    this.form.patchValue(coordenadas);
  }
}
