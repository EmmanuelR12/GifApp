import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey :string = '2F31UMqKeKzzs1bNSS2MFowkcNk3fjPl';
  private _historial: string[] =[];
  public resultados: Gif[] = [];
  private servicioUrl:string ='https://api.giphy.com/v1/gifs' 

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    localStorage.getItem('historial');
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
    if(localStorage.getItem('images')){
      this.resultados = JSON.parse(localStorage.getItem('images')!);
    }
  }

  buscarGifs(query:string){
    query= query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial= this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key',this.apiKey,)
      .set('limit','10')
      .set('q',query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((response) =>{
        this.resultados = response.data;
        localStorage.setItem('images',JSON.stringify(this.resultados));
      })


  }

}
