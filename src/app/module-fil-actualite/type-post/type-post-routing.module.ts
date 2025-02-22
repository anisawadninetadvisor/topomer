import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypePostPage } from './type-post.page';

const routes: Routes = [
  {
    path: '',
    component: TypePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypePostPageRoutingModule {}
