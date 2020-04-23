import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tienda, TiendaEstado } from '../interfaces/tiendas';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http: HttpClient) { }

  getTiendas(){
    // var resp = this.http.get('https://recojoentienda-ws.herokuapp.com/tienda');
    // console.log(resp['ok']);
    // return resp['tiendas'];
    return this.http.get('https://recojoentienda-ws.herokuapp.com/tienda');
    //return this.http.get<Tienda[]>('/assets/data/tiendas.json')
  }

  registro( tienda: Tienda){
    return new Promise( resolve => {
      this.http.post('${URL}/tienda/create', tienda).subscribe( resp => {
        if(resp ['ok']){
          resolve(true);
        }else{
          resolve(false);
        }
      })
    })
  }

}
