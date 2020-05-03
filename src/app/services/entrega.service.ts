import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entrega } from '../interfaces/entrega';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  constructor( private http: HttpClient) { }

  getEntregas(){
    return this.http.get<Entrega[]>('/assets/data/entrega.json');
  }

}
