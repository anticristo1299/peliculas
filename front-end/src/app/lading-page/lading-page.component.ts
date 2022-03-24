import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lading-page',
  templateUrl: './lading-page.component.html',
  styleUrls: ['./lading-page.component.css']
})
export class LadingPageComponent implements OnInit {
  public peliculasEnCines:any=[];
  public peliculasProximamente:any=[];
  constructor() { }

  ngOnInit(): void {
    this.peliculasEnCines=[{
      nombre:'Spider-Man',
      fechaLanzamiento:new Date("01-01-2022"),
      precio:200,
      poster:"https://cdn.pocket-lint.com/r/s/1200x/assets/images/159643-tv-news-spider-man-no-way-home-image1-dryautoefj.jpg"
    },
    {
      nombre:'Creed',
      fechaLanzamiento:new Date("01-03-2022"),
      precio:350,
      poster:"https://i0.wp.com/hipertextual.com/wp-content/uploads/2016/01/creed_ryan_coogler_2.jpg?fit=1200%2C675&ssl=1"
    }]
    //proximamente
    this.peliculasProximamente=[]
  }
  menejadorRated(estrellas:Number){
    alert(estrellas);
  }
}
