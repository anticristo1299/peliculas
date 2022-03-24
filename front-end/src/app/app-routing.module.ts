import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearActoresComponent } from './actores/crear-actores/crear-actores.component';
import { EditarActoresComponent } from './actores/editar-actores/editar-actores.component';
import { IndiceActoresComponent } from './actores/indice-actores/indice-actores.component';
import { CrearCinesComponent } from './cines/crear-cines/crear-cines.component';
import { EditarCinesComponent } from './cines/editar-cines/editar-cines.component';
import { IndiceCinesComponent } from './cines/indice-cines/indice-cines.component';
import { CrearGeneroComponent } from './generos/crear-genero/crear-genero.component';
import { EditarGeneroComponent } from './generos/editar-genero/editar-genero.component';
import { IndiceGenerosComponent } from './generos/indice-generos/indice-generos.component';
import { LadingPageComponent } from './lading-page/lading-page.component';
import { CrearPeliculaComponent } from './peliculas/crear-pelicula/crear-pelicula.component';
import { EditarPeliculaComponent } from './peliculas/editar-pelicula/editar-pelicula.component';
import { FiltrarPeliculasComponent } from './peliculas/filtrar-peliculas/filtrar-peliculas.component';

const routes: Routes = [
  {path:'',component:LadingPageComponent},
  {path:'generos',component:IndiceGenerosComponent },
  {path:'cines/crear',component: CrearCinesComponent},
  {path:'generos/crear',component:CrearGeneroComponent },
  {path:'generos/editar/:id',component:EditarGeneroComponent},
  {path:'actores',component: IndiceActoresComponent},
  {path:'actores/crear',component:CrearActoresComponent },
  {path:'actores/editar/:id',component:EditarActoresComponent },
  {path:'cines',component:IndiceCinesComponent },
  {path:'cines/crear',component: CrearCinesComponent},
  {path:'cines/editar/:id',component: EditarCinesComponent},  
  {path:'peliculas/crear',component:CrearPeliculaComponent },
  {path:'peliculas/editar/:id',component: EditarPeliculaComponent},
  {path:'peliculas/buscar',component: FiltrarPeliculasComponent},
  {path:'**',redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
