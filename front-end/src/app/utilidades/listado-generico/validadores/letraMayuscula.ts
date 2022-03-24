import { ReturnStatement } from "@angular/compiler";
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export function letraMayuscula(): ValidatorFn  {
    return (control:AbstractControl):any =>{
        const valor = <string>control.value;
        if(!valor) return;
        if(valor.length===0)  return;

        const primerLetra = valor[0];
        if(primerLetra!== primerLetra.toLocaleUpperCase()){
            return { 
                letraMayuscula: {
                    mensaje: 'La primera letra debe de ser mayuscula'
                }
            }
        }
    }
}