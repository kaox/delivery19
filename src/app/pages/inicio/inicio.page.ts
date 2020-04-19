import { Component, OnInit } from '@angular/core';
import { Componente } from 'src/app/interfaces/interfaces';
import { Tienda } from 'src/app/interfaces/tiendas';
import { Categorias } from 'src/app/interfaces/categorias';
import { Distritos } from 'src/app/interfaces/distritos';
import { TiendaService } from 'src/app/services/tienda.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DistritoService } from 'src/app/services/distrito.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente[] = [];
  tiendas: Tienda[] = [];
  categorias: Categorias[] = [];
  distritos: Distritos[] = [];
  selec_distrito = null;
  selected_distrito = '';
  selected_categoria = '';

  constructor(private tiendaService: TiendaService, private categoriaService: CategoriaService, private distritoService: DistritoService) { }

  ngOnInit() {
    this.tiendaService.getTiendas() 
      .subscribe( resp => {
        console.log('tiendas', resp);
        this.tiendas.push( ...resp);
      }
    );
    this.categoriaService.getCategorias().subscribe( resp => {
      console.log('categorias', resp);
      this.categorias.push( ...resp);
    });
    this.distritoService.getDistritos().subscribe( resp => {
      console.log('distritos', resp);
      this.distritos.push( ...resp);
    });
  }

  distritoChange(event){
    console.log(event);
    this.selected_distrito = event.value.id_ubigeo;
  }

  categoriaChange(event){
    this.selected_categoria = event.detail.value;
  }

}
