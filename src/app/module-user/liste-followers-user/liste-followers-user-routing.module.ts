import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeFollowersUserPage } from './liste-followers-user.page';

const routes: Routes = [
  {
    path: '',
    component: ListeFollowersUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeFollowersUserPageRoutingModule {}
