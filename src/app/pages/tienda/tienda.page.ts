import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TiendaService } from 'src/app/services/tienda.service';
import { Tienda } from 'src/app/interfaces/tiendas';

import { AngularFirestore, AngularFirestoreCollection,  } from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

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

  items: Observable<any[]>;
  itemsRef: AngularFirestoreCollection;

  constructor(
    private tiendaService: TiendaService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private db: AngularFirestore
    ) { }

  ngOnInit() {
    console.log('hello')
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.tiendaService.getTiendaId(this.id).subscribe(
      res => {
        this.tienda = res['tienda']
        if(this.tienda.uuid !== undefined){
          this.itemsRef = this.db.collection(''+this.tienda.uuid);
          if(this.itemsRef!== undefined){
            this.items = this.itemsRef.valueChanges();
          }
        }
      },
      err => console.log('error', err)
    )
  }

}
