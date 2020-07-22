import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadImageComponent} from './upload-image/upload-image.component'
import {LoginComponent} from './login/login.component'
import {AuthGuard} from './auth/auth.guard'
import {DisplayChartComponent} from './display-chart/display-chart.component'

const routes: Routes = [
  {path:'',redirectTo: 'login',pathMatch: 'full'},
  {path:'login',component: LoginComponent},
  {path:'upload-image',component: UploadImageComponent, canActivate:[AuthGuard]},
  {path:'display-chart',component: DisplayChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
