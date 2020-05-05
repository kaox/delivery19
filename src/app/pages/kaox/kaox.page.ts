import { Component, OnInit } from '@angular/core';
import { Tienda } from 'src/app/interfaces/tiendas';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-kaox',
  templateUrl: './kaox.page.html',
  styleUrls: ['./kaox.page.scss'],
})
export class KaoxPage implements OnInit {

  tiendas: Tienda[] = [];

  constructor(private tiendaService: TiendaService) { }

  ngOnInit() {
    this.tiendaService.getTiendas() 
      .subscribe( resp => {
        this.tiendas.push( ...resp['tiendas']);
      }
    );
  }

}
