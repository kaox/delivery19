import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaPageRoutingModule } from './tienda-routing.module';

import { TiendaPage } from './tienda.page';
import { ComponentsModule } from 'src/app/components/components.module';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaPageRoutingModule,
    ComponentsModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  declarations: [TiendaPage]
})
export class TiendaPageModule {}
