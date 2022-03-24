import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorDTO } from '../actores';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  actores:actorDTO[];
  columnasAMostrar: string[]  =["id","nombre","acciones"];
  cantidadTotalRegistros:any=null;
  paginaActual=1;
  cantidadRegistrosAMostrar=10;
  constructor(private actoresService:ActoresService) { 

    this.actores=[];
  }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }
/*
 cargarRegistros(pagina:number,cantidadElementosAMostrar:any)
  {
    this.actoresService.obtenerActores(pagina,cantidadElementosAMostrar).subscribe((respuesta:HttpResponse<actorDTO[]>) =>{
      this.actores=respuesta.body;
      console.log(this.actores);
      
      console.log(respuesta.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros=respuesta.headers.get("cantidadTotalRegistros");
    })
  }*/
  cargarRegistros(pagina: number, cantidadElementosAMostrar:any){
    this.actoresService.obtenerActores(pagina, cantidadElementosAMostrar).subscribe((respuesta: HttpResponse<actorDTO[]>) => {
      this.actores = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }
  actualizarPaginacion(datos:PageEvent)
  {
    this.paginaActual=datos.pageIndex+1;
    this.cantidadRegistrosAMostrar=datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  eliminar(id: number)
  {
    this.actoresService.eliminar(id).subscribe(()=>{
      this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
    },
    error => {console.error(error);})
  }

}
