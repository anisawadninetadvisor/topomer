import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePostVideoPage } from './create-post-video.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePostVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePostVideoPageRoutingModule {}
