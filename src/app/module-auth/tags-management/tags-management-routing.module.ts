import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TagsManagementPage } from './tags-management.page';

const routes: Routes = [
  {
    path: '',
    component: TagsManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsManagementPageRoutingModule {}
