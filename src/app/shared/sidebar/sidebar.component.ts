import { Component } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interface';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService:GifsService){}

  get historial(): string[]{
    return this.gifsService.historial;
  }

  buscarGifs(historiaBusqueda: string){
    this.gifsService.buscarGifs(historiaBusqueda);
  }

}
