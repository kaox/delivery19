import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { MapsAPILoader, MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { Categorias } from 'src/app/interfaces/categorias';
import { Distritos } from 'src/app/interfaces/distritos';
import { Tienda } from 'src/app/interfaces/tiendas';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { TiendaService } from 'src/app/services/tienda.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  categorias: Categorias[] = [];
  distritos: Distritos[] = [];
  tiendas: Tienda[] = [];
  selec_distrito = null;
  selected_distrito = '';
  selected_categoria = '';
  latitude: number = -12.0558302;
  longitude: number = -77.0414725;
  zoom: number = 13;
  private geoCoder;
  map: any;

  constructor(private categoriaService: CategoriaService, 
    private tiendaService: TiendaService,
    private distritoService: DistritoService,
    // private mapsAPILoader: MapsAPILoader,
    // private gMaps: GoogleMapsAPIWrapper,
    private gmapsmodule: GoogleMapsModule) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias.push( ...resp);
    });
    this.distritoService.getDistritos().subscribe( resp => {
      this.distritos.push( ...resp);
    });
    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;
    // });
  }

  distritoChange(event){
    this.selected_distrito = event.value.codigo_ubigeo;
    // this.gMaps.setCenter({ lat: event.value.latitud, lng: event.value.longitud });
    this.tiendaService.getTiendas() 
      .subscribe( resp => {
        console.log(resp['tiendas']);
        this.tiendas.push( ...resp['tiendas']);
      }
    );
  }

  categoriaChange(event){
    this.selected_categoria = event.detail.value;
  }

  public markerClicked = (tienda) => {
    const position = new google.maps.LatLng(tienda.latitud, tienda.longitud);
    //this.map.panTo(position);

    // const marker = new google.maps.Marker({
    //   position: position, //marker position
    //   map: map, //map already created
    //   title: 'Hello World!',
    //   icon: icon //custom image
    // });
  }

  private setCurrentLocation() {
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        //this.getAddress(this.latitude, this.longitude);
      });
    }
  }

}
