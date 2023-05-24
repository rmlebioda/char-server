import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUpscalingComponent } from './modules/components/image-upscaling/image-upscaling.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {ColorSchemeService} from "./modules/services/color-scheme.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatBadgeModule} from "@angular/material/badge";
import {InboxService} from "./modules/services/inbox.service";
import {MatMenuModule} from "@angular/material/menu";
import { InboxComponent } from './modules/components/inbox/inbox.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatHeaderCellDef, MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    ImageUpscalingComponent,
    InboxComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatListModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatCardModule,
        HttpClientModule,
        MatBadgeModule,
        MatMenuModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatInputModule,
        MatGridListModule,
        MatTooltipModule,
        MatTableModule
    ],
  providers: [
    ColorSchemeService,
    InboxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
