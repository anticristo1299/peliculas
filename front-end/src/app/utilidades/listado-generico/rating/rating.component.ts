import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
@Input() maximoRating=5;//estrellas
@Input() ratingSeleccionado=0;
maximoRatingArray:any=[];
ratingAnterior=0;//voto anterior
desvotar=0;
votado=false;
@Output() rated: EventEmitter<Number> = new EventEmitter<Number>();//emite el evento al componente padre "component"
  constructor() { }

  ngOnInit(): void {
    this.maximoRatingArray=Array(this.maximoRating).fill(0);
  }
  manejarMouseEnter(index:number)//cuando pasa el mouse por las estrellas me sombrea el icono
  {
    this.ratingSeleccionado=index+1;
  }
  manejarMouseLeave()//cuando sale el mouse de las estrellas 
  {
    if(this.desvotar===this.ratingAnterior)//aca pregunta si volvio a apretar la misma estrella se deselecciona
    {
      this.ratingSeleccionado=0;
      this.desvotar=0;
    }
    else if(this.ratingAnterior!==0 )//2 = si cuando sale el curso de las estrellas y ratingAnterior tiene el voto ya seleccionado
    {  this.ratingSeleccionado=this.ratingAnterior;
      this.desvotar=this.ratingAnterior;//paso el puntaje anterior a la variable desvotar para evaluar en la primera condición
      

    }
    //cuando sale el curso la estrella vuelve a 0
  }
  //calificar cuando doy click en las estrellas 
  rate(index:number){ 
    this.ratingSeleccionado=index+1;
    this.votado=true;
    this.ratingAnterior=this.ratingSeleccionado;// 1 = ratingAnterior tiene el voto ya seleccionado
    this.rated.emit(this.ratingSeleccionado);//aca emito el evento con la votación
  }
  
}
