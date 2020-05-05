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
  selected_categoria = '0';

  constructor(private tiendaService: TiendaService, 
              private categoriaService: CategoriaService, 
              private distritoService: DistritoService) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias.push( ...resp);
    });
    this.distritoService.getDistritos().subscribe( resp => {
      this.distritos.push( ...resp);
    });
  }

  distritoChange(event){
    this.selected_distrito = event.value.codigo_ubigeo;
    this.tiendas = [];
    this.tiendaService.getTiendasDistritoCategoria(this.selected_distrito,this.selected_categoria) 
      .subscribe( resp => {
        this.tiendas.push( ...resp['tiendas']);
      }
    );
  }

  categoriaChange(event){
    this.selected_categoria = event.detail.value;
    this.tiendas = [];
    this.tiendaService.getTiendasDistritoCategoria(this.selected_distrito,this.selected_categoria) 
      .subscribe( resp => {
        this.tiendas.push( ...resp['tiendas']);
      }
    );
  }

  openMenu(){

  }

}
