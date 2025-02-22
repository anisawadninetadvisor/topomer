import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageInitialesPartenairesPage } from './page-initiales-partenaires.page';

const routes: Routes = [
  {
    path: '',
    component: PageInitialesPartenairesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageInitialesPartenairesPageRoutingModule {}
