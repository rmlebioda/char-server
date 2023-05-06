import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UpscalingImageComponent} from "./upscaling-image/upscaling-image.component";

const routes: Routes = [
  { path: 'upscaling', component: UpscalingImageComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
