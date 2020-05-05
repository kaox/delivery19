import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KaoxPage } from './kaox.page';

const routes: Routes = [
  {
    path: '',
    component: KaoxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaoxPageRoutingModule {}
