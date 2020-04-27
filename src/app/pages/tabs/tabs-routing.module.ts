import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tiendas',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../inicio/inicio.module').then(m => m.InicioPageModule)
          }
        ]
      },
      {
        path: 'registrar',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../registro/registro.module').then(m => m.RegistroPageModule)
          }
        ]
      },
      {
        path: 'nosotros',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../nosotros/nosotros.module').then(m => m.NosotrosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tiendas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tiendas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
