import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { actorDTO, actoresCreacionDTO } from './actores';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {
  private apiUrl=environment.apiUrl+"actores";
  constructor(private http:HttpClient) { }

  public crear(actores:actoresCreacionDTO)
  {
    const formData=this.construirFormData(actores);
   return this.http.post(this.apiUrl,formData);
  }
  public eliminar(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  public obtenerActores(pagina: number, cantidadRegistrosAMostrar: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<actorDTO[]>(this.apiUrl, {observe: 'response', params});
  }
  public editar(id:number, actor: actoresCreacionDTO) {
    const formData = this.construirFormData(actor);
    return this.http.put<actorDTO[]>(`${this.apiUrl}/${id}`, formData);
  }
  //obtiene actores por id 
  public obtenerPorId(id:number):Observable<actorDTO>
  {
    return this.http.get<actorDTO>(`${this.apiUrl}/${id}`);
  }
  private construirFormData(actor: actoresCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia){
      formData.append('biografia', actor.biografia);
    }
    if (actor.fechaNacimiento){
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));
    }
    if (actor.foto){
      formData.append('foto', actor.foto);
    } 

    return formData;
  }
}
