import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { IonicModule } from '@ionic/angular';
// import { GoogleMapsModule } from '@angular/google-maps'


// import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';

import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // MapPageRoutingModule,
    ComponentsModule,
    IonicSelectableModule,
    PipesModule
    // GoogleMapsModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBkcdJxvi1DsyDjzsZgCIt3OoxVLNGHXME',
    //   libraries: ['places','visualization','geometry']
    // })
  ],
  // providers: [
  //   GoogleMapsAPIWrapper
  // ],
  declarations: [MapPage]
})
export class MapPageModule {}
