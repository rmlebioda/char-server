import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImageUpscalingComponent} from "./modules/image-upscaling/image-upscaling.component";

const routes: Routes = [
  { path: 'upscaling', component: ImageUpscalingComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
