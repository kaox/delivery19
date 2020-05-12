import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TiendaGob } from '../interfaces/tiendagob';
import { TiendaInter } from '../interfaces/tiendas';

@Injectable({
  providedIn: 'root'
})
export class TiendagobService {

  constructor(private http: HttpClient) { }

  getTiendas(distrito){    
    return this.http.get<TiendaGob[]>('http://www.tuempresa.gob.pe/ubicatubodega/public/ajax/selecciona-bodega/15/01/'+distrito);

  }

  getTiendasLocal(){
    return this.http.get<TiendaGob[]>('https://recojoentienda-ws.herokuapp.com/tiendagob');
  }

  registro( tienda: TiendaGob){
    return new Promise( resolve => {
      this.http.post('https://recojoentienda-ws.herokuapp.com/tiendagob', tienda).subscribe( resp => {
        if(resp ['ok']){
          resolve(true);
        }else{
          resolve(false);
        }
      })
    })
  }

  registroInter( tienda: TiendaInter){
    return new Promise( resolve => {
      this.http.post('https://recojoentienda-ws.herokuapp.com/tienda_admin', tienda).subscribe( resp => {
        if(resp ['ok']){
          resolve(true);
        }else{
          resolve(false);
        }
      })
    })
  }

}
