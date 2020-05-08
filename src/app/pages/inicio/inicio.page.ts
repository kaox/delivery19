import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Componente } from 'src/app/interfaces/interfaces';
import { Tienda } from 'src/app/interfaces/tiendas';
import { Categorias } from 'src/app/interfaces/categorias';
import { Distritos } from 'src/app/interfaces/distritos';
import { TiendaService } from 'src/app/services/tienda.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DistritoService } from 'src/app/services/distrito.service';

import { AngularFirestore, AngularFirestoreCollection,  } from "@angular/fire/firestore";
import { Observable } from 'rxjs';

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

  items: Observable<any[]>;
  itemsRef: AngularFirestoreCollection;

  loading: HTMLIonLoadingElement;

  constructor(private tiendaService: TiendaService, 
              private categoriaService: CategoriaService, 
              private distritoService: DistritoService,
              private loadingController: LoadingController,
              private db: AngularFirestore,
              private alertController: AlertController) { }

  ngOnInit() {
    this.presentAlert();
    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias.push( ...resp);
    });
    this.distritoService.getDistritos().subscribe( resp => {
      this.distritos.push( ...resp);
    });
  }

  async distritoChange(event){
    this.selected_distrito = event.value.codigo_ubigeo;
    this.tiendas = [];
    await this.presentLoading();
    this.tiendaService.getTiendasDistritoCategoria(this.selected_distrito,this.selected_categoria) 
      .subscribe( async resp => {
        this.tiendas.push( ...resp['tiendas']);
        this.loading.dismiss();
        // this.itemsRef = this.db.collection(''+this.uuid)
        // this.items = this.itemsRef.valueChanges();
      }
    );
  }

  async categoriaChange(event){
    this.selected_categoria = event.detail.value;
    this.tiendas = [];
    await this.presentLoading();
    this.tiendaService.getTiendasDistritoCategoria(this.selected_distrito,this.selected_categoria) 
      .subscribe( resp => {
        this.tiendas.push( ...resp['tiendas']);
        this.loading.dismiss();
      }
    );
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Buscando...'
    });
    return this.loading.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Quedate en casa',
      message: '1. Ubica tu tienda mas cercana <br/>2. Coordina la entrega de tus productos por WhastApp o teléfono.<br/> 3. Recoger tus productos en tienda o delivery.',
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  openMenu(){

  }
  

}
