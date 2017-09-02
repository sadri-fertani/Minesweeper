import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap';

import { AppComponent } from './app.component';
import { MineButtonComponent } from './mineButton.component'

import { Utils } from './utils';

// run the plugin to work with version 4 of bootstrap
bootstrap4Mode();

@NgModule({
  declarations: [
    AppComponent,
    MineButtonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [Utils],
  bootstrap: [AppComponent]
})
export class AppModule { }
