import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';

import { Categorias } from 'src/app/interfaces/categorias';
import { Distritos } from 'src/app/interfaces/distritos';
import { TiendaAdmin } from 'src/app/interfaces/tiendas';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { PagoService } from 'src/app/services/pago.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { Entrega } from 'src/app/interfaces/entrega';
import { Pago } from 'src/app/interfaces/pago';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  categorias: Categorias[] = [];
  distritos: Distritos[] = [];
  pagos: Pago[] = [];
  entregas: Entrega[] = [];
  // registerTienda: Tienda;
  tienda: TiendaAdmin = {
    name: '',
    descripcion: '',
    telefono: '',
    celular: '',
    categorias: [''],
    provincia: '',
    distritos: [''],
    direccion: '',
    website: '',
    facebook: '',
    pagos: [''],
    entregas: [''],
    latitud: '',
    longitud: '',
    nombre_contacto: '',
    correo: ''
  };


  constructor(private categoriaService: CategoriaService, 
    private distritoService: DistritoService,
    private tiendaService: TiendaService,
    private pagoService: PagoService,
    private entregaService: EntregaService,
    private http: HttpClient
    ) {
  }

  ngOnInit() {

    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias.push( ...resp);
    });
    this.distritoService.getDistritos().subscribe( resp => {
      this.distritos.push( ...resp);
    });
    this.pagoService.getPagos().subscribe( resp => {
      this.pagos.push( ...resp);
    });
    this.entregaService.getEntregas().subscribe( resp => {
      this.entregas.push( ...resp);
    });
  }

  resetForm(){
    //this.tiendaForm.reset();
  }

  register(formTienda: NgForm){
    let tienda: TiendaAdmin = formTienda.value;
    console.log(formTienda.value);
    console.log(formTienda.valid);
    //console.log(this.tiendaForm.value)
    if(formTienda.valid) {
      this.tiendaService.registro(formTienda.value);
      formTienda.resetForm();
    }
  }

}
