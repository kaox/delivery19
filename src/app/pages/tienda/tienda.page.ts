import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TiendaService } from 'src/app/services/tienda.service';
import { Tienda } from 'src/app/interfaces/tiendas';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  id: String;
  tienda: Tienda = {
    _id: null,
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
    address: '',
    nombre_contacto: '',
    correo: '',
    estado: false,
    position: [''],
    uuid: ''
  };

  constructor(
    private tiendaService: TiendaService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.tiendaService.getTiendaId(this.id).subscribe(
      res => this.tienda = res['tienda'],
      err => console.log('error', err)
    )
    
  }

}
