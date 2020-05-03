import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Recojo en tienda | Directorio de deliverys y recojo en tienda';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'keywords', content: 'Delivery, Recojo en tienda, Covid, Coronavirus, Lima'},
      {name: 'description', content: 'Directorio de tiendas que tienen deliverys y recojo en tienda'},
      {name: 'author', content: 'Andres Garcia Burgos https://www.linkedin.com/in/andresgarciab/' },
      {name: 'robots', content: 'index, follow'}
    ]);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
