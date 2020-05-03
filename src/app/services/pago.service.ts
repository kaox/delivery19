import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pago } from '../interfaces/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor( private http: HttpClient) { }

  getPagos(){
    return this.http.get<Pago[]>('/assets/data/pagos.json');
  }

}
