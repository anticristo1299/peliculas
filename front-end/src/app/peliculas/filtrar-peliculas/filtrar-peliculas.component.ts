import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtrar-peliculas',
  templateUrl: './filtrar-peliculas.component.html',
  styleUrls: ['./filtrar-peliculas.component.css']
})
export class FiltrarPeliculasComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private location:Location,private activatedRoute:ActivatedRoute) { }
  form!:FormGroup;
  peliculas=[
    {titulo:"Spider-man",enCines:true,proximosEstrenos:false,generos:[2,3],poster:"https://cdn.pocket-lint.com/r/s/1200x/assets/images/159643-tv-news-spider-man-no-way-home-image1-dryautoefj.jpg"},
    {titulo:"Creed",enCines:false,proximosEstrenos:true,generos:[1],poster:"https://i0.wp.com/hipertextual.com/wp-content/uploads/2016/01/creed_ryan_coogler_2.jpg?fit=1200%2C675&ssl=1"},
    {titulo:"Pain and Gain",enCines:true,proximosEstrenos:false,generos:[2,3],poster:"https://s3.cine3.com/2020/06/887be006ded9da46925f9d162110b672_xl.jpg"},
  ]
  formCopia={
    titulo:"",
    generoId:0,
    proximosEstrenos:false,
    enCines:false
  };
  //copio las peliculas para volver a resetear cuando el input esta limpio
  copiaPeliculas=this.peliculas;
  generos=[
    {id:1,nombre:"Drama"},
    {id:2,nombre:"Accíon"},
    {id:3,nombre:"Comedia"}
  ]
  ngOnInit(): void {
    this.form=this.formBuilder.group(this.formCopia)
    this.leerValoresUrl();
    this.buscarPeliculas(this.form.value);
    //se ejecuta cuando hay algun cambio en el form 
    this.form.valueChanges.subscribe(valores => {
      //reseteo las peliculas 
      this.peliculas=this.copiaPeliculas;
      //busco las peliculas 
      this.buscarPeliculas(valores);
      //cargo el form con los parametros de la url 
      this.parametrosUrl();
    })
  }
  private leerValoresUrl()
  {
    this.activatedRoute.queryParams.subscribe((params)=>{
      let objeto : any={};
      if(params["titulo"])
      {
        objeto.titulo=params["titulo"];
      }
      if(params["generoId"])
      {
        objeto.generoId=Number(params["generoId"]);
      }
      if(params["proximosEstrenos"]){
        objeto.proximosEstrenos=params["proximosEstrenos"];
      }
      if(params["enCines"]){
        objeto.enCines=params["enCines"];
      }
      //cuando carga la pagina con los valores en la Url, cargo el form con esos datos
      this.form.patchValue(objeto);
    })
  }
  limpiar()
  {
    this.form.patchValue(this.formCopia);
  }
  buscarPeliculas(datos : any)
  {
    if(datos.titulo)
    {
      this.peliculas=this.peliculas.filter(pelicula => pelicula.titulo.indexOf(datos.titulo)!== -1);
    }
    if(datos.generoId!==0)
    {
      this.peliculas=this.peliculas.filter(pelicula => pelicula.generos.indexOf(datos.generoId)!== -1);
    }
    if(datos.proximosEstrenos)
    {
      this.peliculas=this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }
    if(datos.enCines)
    {
      this.peliculas=this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }
  parametrosUrl()
  {
    let queryStrings=[];
    let valorForm=this.form.value;
    if(valorForm.titulo)
    {
      queryStrings.push(`titulo=${valorForm.titulo}`);
    }
    if(valorForm.generoId!="0")
    {
      queryStrings.push(`generoId=${valorForm.generoId}`);
    }
    if(valorForm.proximosEstrenos)
    {
      queryStrings.push(`proximosEstrenos=${valorForm.proximosEstrenos}`);
    }
    if(valorForm.enCines)
    {
      queryStrings.push(`enCines=${valorForm.enCines}`);
    }
    this.location.replaceState("peliculas/buscar",queryStrings.join('&'));
  }
}
