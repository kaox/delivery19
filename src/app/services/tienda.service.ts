import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tienda, TiendaAdmin } from '../interfaces/tiendas';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http: HttpClient) { }

  getTiendas(){
    //return this.http.get('http://localhost:3002/tienda');
    return this.http.get('https://recojoentienda-ws.herokuapp.com/tienda');
    //return this.http.get<Tienda[]>('/assets/data/tiendas.json')
  }

  registro( tienda: TiendaAdmin){
    return new Promise( resolve => {
      //this.http.post('http://localhost:3002/tienda_admin', tienda).subscribe( resp => {
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
