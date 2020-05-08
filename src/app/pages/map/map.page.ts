import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from "@angular/google-maps";
import { LoadingController } from '@ionic/angular';

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

  @ViewChild(MapInfoWindow) info: MapInfoWindow;

  categorias: Categorias[] = [];
  distritos: Distritos[] = [];
  tiendas: Tienda[] = [];
  selec_distrito = null;
  selected_distrito = '';
  selected_categoria = '0';
  latitude: number = -12.0558302;
  longitude: number = -77.0414725;
  zoom: number = 13;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    disableDoubleClickZoom: false
  }
  markers = [];
  infoContent = ''
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow

  loading: HTMLIonLoadingElement;

  constructor(private categoriaService: CategoriaService, 
    private tiendaService: TiendaService,
    private distritoService: DistritoService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe( resp => {
      this.categorias.push( ...resp);
    });
    this.distritoService.getDistritos().subscribe( resp => {
      this.distritos.push( ...resp);
    });
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })
  }

  async distritoChange(event){
    this.selected_distrito = event.value.codigo_ubigeo;

    // this.gMaps.setCenter({ lat: event.value.latitud, lng: event.value.longitud });
    this.tiendas = [];
    await this.presentLoading();
    this.tiendaService.getTiendasDistritoCategoria(this.selected_distrito,this.selected_categoria) 
      .subscribe( resp => {
        this.tiendas.push( ...resp['tiendas']);
        this.markers = [];
        for (let tienda of this.tiendas) {
          this.addMarker(tienda)
        }
        this.loading.dismiss();
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
        this.markers = [];
        for (let tienda of this.tiendas) {
          this.addMarker(tienda)
        }
        this.loading.dismiss();
      }
    );
  }

  addMarker(tienda) {
    this.markers.push({
      position: {
        lat: parseFloat(tienda.latitud),
        lng: parseFloat(tienda.longitud),
      },
      // title: ''+tienda.nombre,
      info: tienda.name+'|'+tienda.descripcion+'|'+tienda.celular+'|'+tienda.direccion,
      options: {
        animation: google.maps.Animation.DROP,
      },
    })
  }

  openInfo(marker: MapMarker, markerObj) {
    this.zoom = 16;
    this.center = markerObj.position;
    this.infoContent = markerObj.info;
    this.infoWindow.open(marker);
  }

  getContent(content, position){
    var text = content.split('|');
    return text[position];
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Buscando...'
    });
    return this.loading.present();
  }

}
