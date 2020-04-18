import { Component, OnInit } from '@angular/core';
import { Componente, Tienda } from 'src/app/interfaces/interfaces';
import { Categorias } from 'src/app/interfaces/categorias';
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
  distritos: DistritoService[] = [];

  constructor(private tiendaService: TiendaService, private categoriaService: CategoriaService) { }

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
  }

  buscar(event){
    console.log(event);
  }

}
