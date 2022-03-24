import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {
  @Input('listado')   
  //declaro el objeto json 
  public peliculas:any=[]
  constructor() {
     
    }

  ngOnInit(): void {
    //console.log(this.peliculas);
      }
 removerPelicula(index:number)
 {
   this.peliculas.splice(index,1);
   
 }
}
