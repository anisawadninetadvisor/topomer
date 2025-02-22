import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetaillePostPage } from './detaille-post.page';

const routes: Routes = [
  {
    path: '',
    component: DetaillePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetaillePostPageRoutingModule {}
