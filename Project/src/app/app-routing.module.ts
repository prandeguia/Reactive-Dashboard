import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostComponent } from './modules/post/post.component';
import { UploadImageComponent } from './modules/upload-image/upload-image.component';
import { PushNotificationComponent } from './modules/push-notification/push-notification.component';
import { AutocompleteComponent } from './modules/autocomplete/autocomplete.component';


const routes: Routes = [{
  path:'',component:DefaultComponent,
  children:[
    {path:'',component:DashboardComponent},
    {path:'post',component:PostComponent },
    {path:'upload',component:UploadImageComponent},
    {path:'push',component:PushNotificationComponent},
    {path:'autocomplete',component:AutocompleteComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
