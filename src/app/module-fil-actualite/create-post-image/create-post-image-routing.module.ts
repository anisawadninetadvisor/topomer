import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePostImagePage } from './create-post-image.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePostImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePostImagePageRoutingModule {}
