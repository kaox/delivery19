import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../interfaces/tiendas';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http: HttpClient) { }

  getTiendas(){
    //return this.http.get('http://localhost:3002/tienda');
    return this.http.get<Tienda[]>('https://recojoentienda-ws.herokuapp.com/tienda');
    //return this.http.get<Tienda[]>('/assets/data/tiendas.json')
  }

  getTiendasDistritoCategoria(distrito, categoria){
    //return this.http.get('http://localhost:3002/tienda');
    return this.http.get<Tienda[]>('https://recojoentienda-ws.herokuapp.com/tienda/'+distrito+'/'+categoria);
    //return this.http.get<Tienda[]>('/assets/data/tiendas.json')
  }

  getTiendaId(id){
    //return this.http.get('http://localhost:3002/tienda');
    return this.http.get<Tienda>('https://recojoentienda-ws.herokuapp.com/tienda/'+id);
    //return this.http.get<Tienda[]>('/assets/data/tiendas.json')
  }

  registro( tienda: Tienda){
    return new Promise( resolve => {
      //this.http.post('http://localhost:3002/tienda_admin', tienda).subscribe( resp => {
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
