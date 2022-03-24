import { Component, Input, OnInit } from '@angular/core';
import { multipleSelector } from './multipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {
  @Input() Seleccionados:multipleSelector[]=[];
  @Input() noSeleccionados:multipleSelector[]=[];
  constructor() { }

  ngOnInit(): void {
  }

  seleccionar(item:multipleSelector,index:number)
  {
    this.Seleccionados.push(item);
    //si esta seleccionado entonces elimino el elemento de array Noseleccionados
    this.noSeleccionados.splice(index,1);
  }

  deseleccionar(item:multipleSelector,index:number)
  {
    this.noSeleccionados.push(item);
    //aca es lo mismo nada mas que lo contrario 
    this.Seleccionados.splice(index,1);
  }

  seleccionarTodo()
  {
    this.Seleccionados.push(...this.noSeleccionados);
    //this.Noseleccionados=[];
    this.noSeleccionados.length=0;

  }
  deseleccionarTodo()
  {
    this.noSeleccionados.push(...this.Seleccionados);
    //this.Seleccionados=[];
    this.Seleccionados.length=0;
  }
}
