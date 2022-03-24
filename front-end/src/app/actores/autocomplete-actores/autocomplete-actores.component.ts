import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {
  @ViewChild(MatTable) table?: MatTable <any>;
  columnasAMostrar =["imagen","nombre","personaje","acciones"];
  //esto es para usar un solo control y no todo como el FormGroup
  control:FormControl=new FormControl();
  //array de actores para la busqueda de autocomplete
  actores=[
    {nombre:"Tom Holland",personaje:"",foto:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/1200px-Tom_Holland_by_Gage_Skidmore.jpg"},
    {nombre:"Mark Zukerberg",personaje:"",foto:"https://cdnnmundo1.img.sputniknews.com/img/07e5/07/05/1113792503_0:0:2049:2048_1920x0_80_0_0_ea988112211f33b853380ae9d7d316fa.jpg"},
    {nombre:"Putin",personaje:"",foto:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2810-01-2022%29_%28cropped%29.jpg/800px-%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80_%D0%9F%D1%83%D1%82%D0%B8%D0%BD_%2810-01-2022%29_%28cropped%29.jpg"},
  ]
  constructor() { }
  actoresOriginales=this.actores;
  actoresSeleccionados:any=[];
  ngOnInit(): void {
    this.control.valueChanges.subscribe(value=>{
      //aca vez que se vuelve a escribir una letra, empieza con todos los actores por eso esta inicializacion
      this.actores=this.actoresOriginales;
      //filtra todos los actores dentro del array actores
      this.actores=this.actores.filter(actor=>actor.nombre.toLocaleLowerCase().indexOf(value)!==-1);
    })
  }
  //cada vez que selecciono un actor le agrego al array 
  optionSelected(event:MatAutocompleteSelectedEvent)
  {
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue("");
    //esto es para que se muestre los actores cada vez que agrego s
    if(this.table!==undefined)
    {
      this.table.renderRows();
    }
  }
  eliminar(actor:any)
  { 
    const indice=this.actoresSeleccionados.findIndex((a:any) => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice,1);
    this.table?.renderRows();
  }
  //este metodo es para arrastrar los actores de posición
  arrastrarActor(event:CdkDragDrop<any[]>)
  {
    const indice =this.actoresSeleccionados.findIndex((actor:any) => actor ===  event.item.data )

    moveItemInArray(this.actoresSeleccionados,indice,event.currentIndex);
    //renderizo la tabla para poder mostrar los actores una vez que muevo de lugar 
    this.table?.renderRows();
  }
}
