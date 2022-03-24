import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../toBase64';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {
  //envio el archivo/imagen al formulario de actores para agregar los datos + la imagen
  @Output() archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();
  imagenBase64?:string;
  //este input recibe la imagen de edición que esta cargado en memoria, en el comoponente editar-actores
  @Input() urlImagen?:string;
  constructor() { }

  ngOnInit(): void {
  }
  change(event:any)
  {
    if(event.target.files.length > 0)
    {
      const file:File=event.target.files[0];
      toBase64(file).then((value:string) => this.imagenBase64=value)
      .catch(error => console.log(error)) ;
      //aca envio el archivo a los componentes de crear/editar actor 
      this.archivoSeleccionado.emit(file);
      //cuando hay una imagen cargada, aca saco la imagen que tiene en modo de edición
      this.urlImagen=undefined;
    }
  }
}
