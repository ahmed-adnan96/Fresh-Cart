import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetComponent } from './forget/forget.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'forget', pathMatch: 'full' },
  { path: 'forget', component: ForgetComponent, title: 'forget Password' },
  { path: 'update', component: UpdateComponent, title: 'update Password' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
