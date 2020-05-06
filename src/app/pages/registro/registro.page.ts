import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import { Categorias } from 'src/app/interfaces/categorias';
import { Distritos } from 'src/app/interfaces/distritos';
import { Tienda } from 'src/app/interfaces/tiendas';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { PagoService } from 'src/app/services/pago.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { Entrega } from 'src/app/interfaces/entrega';
import { Pago } from 'src/app/interfaces/pago';


import { AngularFirestore, AngularFirestoreCollection,  } from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


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
  message: String;
  // registerTienda: Tienda;
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

  address: string;
  latitude: number = -12.0558302;
  longitude: number = -77.0414725;
  zoom: number = 14;
  private geoCoder;

  items: Observable<any[]>;
  newTodo: string = '';
  itemsRef: AngularFirestoreCollection;
  selectedFile: any;
  selectedFiles: any[];
  loading: HTMLIonLoadingElement;
  uuid: string;

  // @ViewChild('search', any)
  // public searchElementRef: ElementRef;

  constructor(private categoriaService: CategoriaService, 
    private distritoService: DistritoService,
    private tiendaService: TiendaService,
    private pagoService: PagoService,
    private entregaService: EntregaService,
    private mapsAPILoader: MapsAPILoader,
    private loadingController: LoadingController,
    private storage: AngularFireStorage,
    private db: AngularFirestore
    ) {
    
  }

  ngOnInit() {
    this.uuid = uuidv4();
    this.itemsRef = this.db.collection(''+this.uuid)
    this.items = this.itemsRef.valueChanges();

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
    
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      // let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      // autocomplete.addListener("place_changed", () => {
      //   this.ngZone.run(() => {
      //     //get the place result
      //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
      //     //verify result
      //     if (place.geometry === undefined || place.geometry === null) {
      //       return;
      //     }
 
      //     //set latitude, longitude and zoom
      //     this.latitude = place.geometry.location.lat();
      //     this.longitude = place.geometry.location.lng();
      //     this.zoom = 12;
      //   });
      // });
    });
  }

  resetForm(){
    //this.tiendaForm.reset();
  }

  register(formTienda: NgForm){
    formTienda.controls["estado"].setValue("false");
    formTienda.controls["uuid"].setValue(this.uuid);
    let tienda: Tienda = formTienda.value;
    //console.log(this.tiendaForm.value)
    if(formTienda.valid) {
      this.tiendaService.registro(formTienda.value);
      formTienda.resetForm();
      this.message = "Gracias por registrarse, en breve un administrador aprobará su registro."
    }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.address = results[0].formatted_address;
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
 
    });
  }

  addTodo(){
    this.itemsRef.add({
      title: this.newTodo
    })
    .then(async resp => {
      console.log(this.selectedFile[0].size)
      if(this.selectedFile[0].size < 500000){
        // this.selectedFiles.push(this.selectedFile[0])

        const imageUrl = await this.uploadFile(resp.id, this.selectedFile)

        this.itemsRef.doc(resp.id).update({
          id: resp.id,
          imageUrl: imageUrl || null
        })
      }else{
        console.log('Archivo excede el tamaño permitido');
      }
      
    }).catch(error => {
      console.log(error);
    })
  }

  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
        await this.presentLoading();
        const task = await this.storage.ref(`images/${this.uuid}/`).child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`images/${this.uuid}/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Subiendo foto...'
    });
    return this.loading.present();
  }

  chooseFile (event) {
    this.selectedFile = event.target.files
  }

  remove(item){
    console.log(item);
    if(item.imageUrl) {
      this.storage.ref(`images/${this.uuid}/${item.id}`).delete();
    }
    this.itemsRef.doc(item.id).delete();
  }

}
