import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tienda } from '../interfaces/tiendas';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http: HttpClient) { }

  getTiendas(){
    return this.http.get<Tienda[]>('/assets/data/tiendas.json')
  }

}
