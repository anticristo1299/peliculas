import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerosService } from 'src/app/service/generos.service';
import { generoCreacionDTO, generoDTO } from '../genero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private route:Router,private generoService:GenerosService
    ,private activatedRoute:ActivatedRoute
    ) { }
  modelo:generoDTO;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      //aca leo el id de la url 
      this.generoService.obtenerPorId(params["id"]).subscribe( genero =>{
        //paso el registro seleccionado a el array modelo para mostrarlo en el componente
        this.modelo=genero;
      }, () => this.route.navigate(["/generos"]));
    })
  }
  guardarCambios(genero:generoCreacionDTO){ 
    this.generoService.editar(this.modelo.id,genero ).subscribe(()=>{
      //una vez que edito el registro, redirigo la pantalla a donde estan las tablas con los registros 
      this.route.navigate(["/generos"]);
    },
    error => {
      console.error(error);
    });
    
  }
}
