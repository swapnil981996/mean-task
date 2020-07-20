import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadImageComponent} from './upload-image/upload-image.component'
import {LoginComponent} from './login/login.component'

const routes: Routes = [
  {path:'',redirectTo: 'login',pathMatch: 'full'},
  {path:'login',component: LoginComponent},
  {path:'upload-image',component: UploadImageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
