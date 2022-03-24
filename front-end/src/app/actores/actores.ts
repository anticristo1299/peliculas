//esto es para guardar la url de la imagen en la base de datos por eso foto es de tipo string
export interface actorDTO{
    id:number;
    nombre: string;
    fechaNacimiento: Date;
    foto: string;
    biografia:string;
}
//esto es para crear un actor por eso el campo foto de tipo FILE
export interface actoresCreacionDTO{
    nombre: string;
    fechaNacimiento: Date;
    foto: File;
    biografia: string;
}