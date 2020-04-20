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
    //return this.http.get<TiendaEstado[]>('http://www.tuempresa.gob.pe/ubicatubodega/public/ajax/selecciona-bodega/15/01')
    return this.http.get<Tienda[]>('/assets/data/tiendas.json')
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
