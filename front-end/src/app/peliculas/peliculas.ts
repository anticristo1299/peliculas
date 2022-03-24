//esto es cuando creo una pelicula
export interface peliculasCreacionDTO{
    titulo:string;
    poster:File;
    fechaLanzamiento:Date;
    enCines:boolean;
    resumen:string;
    trailer:string;
}
//esto para cuando quiero leer los datos de la DB 
export interface peliculasDTO{
    titulo:string;
    poster:string;
    fechaLanzamiento:Date;
    enCines:boolean;
    resumen:string;
    trailer:string;
}