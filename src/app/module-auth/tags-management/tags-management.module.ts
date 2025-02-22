import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TagsManagementPageRoutingModule } from './tags-management-routing.module';

import { TagsManagementPage } from './tags-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TagsManagementPageRoutingModule
  ],
  declarations: [TagsManagementPage]
})
export class TagsManagementPageModule {}
