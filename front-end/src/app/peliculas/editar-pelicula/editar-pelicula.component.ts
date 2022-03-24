import { Component, OnInit } from '@angular/core';
import { peliculasCreacionDTO, peliculasDTO } from '../peliculas';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {
  modelo:peliculasDTO={titulo:"Nose",resumen:"hola",fechaLanzamiento:new Date(),enCines:true,trailer:"ES",poster:"https://es.web.img2.acsta.net/pictures/21/12/01/12/07/0243323.jpg"}
  constructor() { }

  ngOnInit(): void {
   
  }
  guardarCambios(pelicula:peliculasCreacionDTO)
  {
    console.log(pelicula);
  }
}
