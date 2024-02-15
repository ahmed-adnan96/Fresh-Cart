import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ForgetComponent } from './forget/forget.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [
    ForgetComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
