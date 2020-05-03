import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorias } from '../interfaces/categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor( private http: HttpClient) { }

  getCategorias(){
    return this.http.get<Categorias[]>('/assets/data/categorias.json');
  }

}
