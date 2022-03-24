import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {
  //aca recibo el contenido del formulario
  @Input() contenidoMarkDown?:string;
  @Input() placeHoldertextarea:string="";
  constructor() { }
  @Output() changeMarkdown: EventEmitter<string>= new EventEmitter<string>();
  ngOnInit(): void {
  }/*
  inputTextArea(evento:any): void {
    const texto = evento.target.value;
    //con esto le paso el texto al markdown de Preview
    this.contenidoMarkDown = texto
    //aca le mando el texto o la biografía al form de formulario-actor
    
  }*/
  changeMarkDown(evento:any)
  {
    this.changeMarkdown.emit(evento.target.value);
  }
}
