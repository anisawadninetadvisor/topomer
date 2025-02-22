import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageInitialeProfilePage } from './page-initiale-profile.page';

const routes: Routes = [
  {
    path: '',
    component: PageInitialeProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageInitialeProfilePageRoutingModule {}
