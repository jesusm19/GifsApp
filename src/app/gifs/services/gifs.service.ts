import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'DFV2MBmEqKBLBwkk6vGcSQ2i95lDpMCm';
  private url: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(private http: HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    this.resultados = JSON.parse(localStorage.getItem('ultimoHistorial')!) || [];

  }

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs( busquedaGif: string): void {
    busquedaGif = busquedaGif.trim().toUpperCase();

    if(!this._historial.includes(busquedaGif)){
      this._historial.unshift(busquedaGif);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', busquedaGif)
      .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.url}/search`, {params: params})
        .subscribe( response => {
          this.resultados = response.data;
          localStorage.setItem('ultimoHistorial', JSON.stringify(this.resultados));
        } )

  }

}
