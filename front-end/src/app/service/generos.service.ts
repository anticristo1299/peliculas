import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {generoCreacionDTO, generoDTO} from "../generos/genero";
@Injectable({
  providedIn: 'root'
})
export class GenerosService {
  apiUrl=environment.apiUrl+"generos";
  constructor(private http:HttpClient) { }
  public obtenerGeneros(pagina:number,cantidadRegistrosAMostrar:any):Observable<any>
  {
    let params = new HttpParams();
    //parametros para la cabezera de http
    params = params.append('pagina', pagina.toString());
    //aca trae la cantidad de registro por pagina de la web api 
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<generoDTO[]>(this.apiUrl,{observe:"response",params});
  }
  public crear(genero:generoCreacionDTO)
  {
    return this.http.post(this.apiUrl,genero);
  }
  //obtiene generos por id 
  public obtenerPorId(id:number):Observable<generoDTO>
  {
    return this.http.get<generoDTO>(`${this.apiUrl}/${id}`);
  }
  public editar(id:number,genero:generoCreacionDTO){
    return this.http.put<generoDTO[]>(`${this.apiUrl}/${id}`,genero);
  }
  public eliminar(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
