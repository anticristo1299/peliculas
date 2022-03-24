import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { actoresCreacionDTO } from '../actores';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-crear-actores',
  templateUrl: './crear-actores.component.html',
  styleUrls: ['./crear-actores.component.css']
})
export class CrearActoresComponent implements OnInit {

  constructor(private actorService:ActoresService,private router:Router) { }

  ngOnInit(): void {
  
  }
  guardarCambios(actor:actoresCreacionDTO)
  {
      this.actorService.crear(actor).subscribe(()=>{
        this.router.navigate(["/actores"]);
      })
  }
}
