import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import { Categorias } from 'src/app/interfaces/categorias';
import { Distritos } from 'src/app/interfaces/distritos';
import { TiendaAdmin } from 'src/app/interfaces/tiendas';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { PagoService } from 'src/app/services/pago.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { Entrega } from 'src/app/interfaces/entrega';
import { Pago } from 'src/app/interfaces/pago';


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
  tienda: TiendaAdmin = {
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
    correo: ''
  };

  address: string;
  latitude: number = -12.0558302;
  longitude: number = -77.0414725;
  zoom: number = 13;
  private geoCoder;

  // @ViewChild('search', any)
  // public searchElementRef: ElementRef;

  constructor(private categoriaService: CategoriaService, 
    private distritoService: DistritoService,
    private tiendaService: TiendaService,
    private pagoService: PagoService,
    private entregaService: EntregaService,
    private http: HttpClient,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) {
  }

  ngOnInit() {

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
    let tienda: TiendaAdmin = formTienda.value;
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
        this.zoom = 11;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 13;
          this.address = results[0].formatted_address;
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
 
    });
  }

}
