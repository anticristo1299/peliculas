import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorDTO, actoresCreacionDTO } from '../actores';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actores',
  templateUrl: './editar-actores.component.html',
  styleUrls: ['./editar-actores.component.css']
})
export class EditarActoresComponent implements OnInit {
 // modelo:actorDTO={nombre:"jose",fechaNacimiento:new Date(),foto:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/1200px-Tom_Holland_by_Gage_Skidmore.jpg","biografia":""}
 modelo:actorDTO;
 constructor(private route:Router,
  private actoresService:ActoresService
  ,private activatedRoute:ActivatedRoute
  ) { }
 
ngOnInit(): void {
  this.activatedRoute.params.subscribe(params=>{
    //aca leo el id de la url 
    this.actoresService.obtenerPorId(params["id"]).subscribe( genero =>{
      //paso el registro seleccionado a el array modelo para mostrarlo en el componente
      this.modelo=genero;
    }, () => this.route.navigate(["/generos"]));
  })
}/*
guardarCambios(actores:actoresCreacionDTO){ 
  this.actoresService.editar(this.modelo.id,actores ).subscribe(()=>{
    //una vez que edito el registro, redirigo la pantalla a donde estan las tablas con los registros 
    this.route.navigate(["/actores"]);
  },
  error => {
    console.log(error);
  });
  
}*/
guardarCambios(actor: actoresCreacionDTO) {
  this.actoresService.editar(this.modelo.id, actor)
  .subscribe(() => {
    this.route.navigate(['/actores']);
  })
}
}
