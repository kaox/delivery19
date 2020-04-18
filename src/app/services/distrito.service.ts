import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Distritos } from '../interfaces/distritos';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  constructor( private http: HttpClient) { }

  getDistritos(){
    return this.http.get<Distritos[]>('/assets/data/distritos.json');
  }

}
