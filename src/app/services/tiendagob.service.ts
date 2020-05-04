import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiendaGob } from '../interfaces/tiendagob';

@Injectable({
  providedIn: 'root'
})
export class TiendagobService {

  constructor(private http: HttpClient) { }

  getTiendas(distrito){
    //tiendas: TiendaGob[] = this.http.get<TiendaGob[]>('http://www.tuempresa.gob.pe/ubicatubodega/public/ajax/selecciona-bodega/15/01/11');
    return this.http.get<TiendaGob[]>('http://www.tuempresa.gob.pe/ubicatubodega/public/ajax/selecciona-bodega/15/01/'+distrito);

  }

  registro( tienda: TiendaGob){
    return new Promise( resolve => {
      this.http.post('https://recojoentienda-ws.herokuapp.com/tienda', tienda).subscribe( resp => {
        if(resp ['ok']){
          resolve(true);
        }else{
          resolve(false);
        }
      })
    })
  }

}
