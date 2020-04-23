import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Categorias } from 'src/app/interfaces/categorias';
import { Distritos } from 'src/app/interfaces/distritos';
import { Tienda } from 'src/app/interfaces/tiendas';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  categorias: Categorias[] = [];
  distritos: Distritos[] = [];
  registerTienda: Tienda;
  // registerTienda: Tienda = {
  //   name: 'test',
  //   categorias: ['1','3'],
  //   descripcion: 'adada',
  //   celular: '342342',
  //   distritos: ['0'],
  //   facebook: '',
  //   website: ''
  // }

  constructor(private categoriaService: CategoriaService, 
    private distritoService: DistritoService,
    private tiendaService: TiendaService,
    private http: HttpClient) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias.push( ...resp);
    });
    this.distritoService.getDistritos().subscribe( resp => {
      this.distritos.push( ...resp);
    });
  }

  async register(form: NgForm ){
    if(form.invalid){
      return;
    }
    //const valido = this.tiendaService.registro(this.registerTienda);
    //if(valido){
      //Mostrar msg ok
      //this.navC
    //}else{
      //this.u
    //}
  }

}
