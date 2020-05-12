import { Component, OnInit } from '@angular/core';
import { Tienda, TiendaInter } from 'src/app/interfaces/tiendas';
import { TiendaGob } from 'src/app/interfaces/tiendagob';
import { TiendaService } from 'src/app/services/tienda.service';
import { TiendagobService } from 'src/app/services/tiendagob.service';

@Component({
  selector: 'app-kaox',
  templateUrl: './kaox.page.html',
  styleUrls: ['./kaox.page.scss'],
})
export class KaoxPage implements OnInit {

  tiendas: Tienda[] = [];
  tiendasgob: TiendaGob[] = [];
  tiendaInter: TiendaInter = {
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

  constructor(private tiendaService: TiendaService,
    private tiendaGobService: TiendagobService) { }

  ngOnInit() {
    this.tiendaService.getTiendas() 
      .subscribe( resp => {
        this.tiendas.push( ...resp['tiendas']);
      }
    );
  }

  callGob(){
    console.log('init');
    for (var _i = 1; _i <= 43; _i++) {
      if(_i<10){
        this.tiendaGobService.getTiendas("0"+_i) 
          .subscribe( resp => {
            //console.log(...resp['data']);
            // this.tiendasgob.push( ...resp['data']);
            //console.log(this.tiendasgob.length);
            for (let gob of resp['data']) {
              this.tiendaGobService.registro(gob);
            }
          }
        );
      }else{
        this.tiendaGobService.getTiendas(_i) 
        .subscribe( resp => {
          //console.log(...resp['data']);
          // this.tiendasgob.push( ...resp['data']);
          //console.log(this.tiendasgob.length);
          for (let gob of resp['data']) {
            this.tiendaGobService.registro(gob);
          }
        }
      );
      }
      
    }
    
  }

  transform(){
    this.tiendaGobService.getTiendasLocal() 
      .subscribe( resp => {
        for (let gob of resp['tiendas']) {
          this.tiendaInter.latitud = gob.latitud;
          this.tiendaInter.longitud = gob.longitud;
          this.tiendaInter.name = gob.nombre_comercial.trim();
          this.tiendaInter.direccion = gob.direccion.trim();
          this.tiendaInter.celular = gob.celular.trim();
          this.tiendaInter.telefono = gob.telefono.trim();
          this.tiendaInter.entregas = ["2"];
          if(gob.pago_tarjeta == "SI" && gob.pago_apps == "SI"){
            this.tiendaInter.pagos = ["1","2","3"];
          }else if(gob.pago_tarjeta == "SI"){
            this.tiendaInter.pagos = ["1","2"];
          }else if(gob.pago_apps == "SI"){
            this.tiendaInter.pagos = ["1","3"];
          }else{
            this.tiendaInter.pagos = ["1"];
          }
          this.tiendaInter.provincia = gob.codigo_provincia;
          this.tiendaInter.distritos = [gob.codigo_distrito];
          if(gob.vende_higiene == "SI" || gob.vende_aseo == "SI"){
            this.tiendaInter.categorias = ["1","8"]
          }
          this.tiendaInter.estado = true;
          this.tiendaGobService.registroInter(this.tiendaInter);
        }
      }
    );
  }

}
