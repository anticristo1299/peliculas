import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GenerosService } from 'src/app/service/generos.service';
import { generoDTO } from '../genero';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {
  generos:generoDTO[];
  columnasAMostrar: string[]  =["id","nombre","acciones"];
  cantidadTotalRegistros:any=null;
  paginaActual=1;
  cantidadRegistrosAMostrar=10;
  constructor(private generosService:GenerosService) { 

    this.generos=[];
  }

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina:number,cantidadElementosAMostrar:any)
  {
    this.generosService.obtenerGeneros(pagina,cantidadElementosAMostrar).subscribe((respuesta:HttpResponse<generoDTO[]>) =>{
      this.generos=respuesta.body;
      console.log(this.generos);
      
      console.log(respuesta.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros=respuesta.headers.get("cantidadTotalRegistros");
    })
  }
  actualizarPaginacion(datos:PageEvent)
  {
    this.paginaActual=datos.pageIndex+1;
    this.cantidadRegistrosAMostrar=datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  eliminar(id: number)
  {
    this.generosService.eliminar(id).subscribe(()=>{
      this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
    },error => {console.error(error);})
  }
}
