import { Component, OnInit } from '@angular/core';
import { Componente, Tienda } from 'src/app/interfaces/interfaces';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente[] = [];
  tiendas: Tienda[] = [];

  constructor(private tiendaService: TiendaService) { }

  ngOnInit() {
    this.tiendaService.getTiendas() 
      .subscribe( resp => {
        console.log('tiendas', resp);
        this.tiendas.push( ...resp);
      }
    )
  }

}
