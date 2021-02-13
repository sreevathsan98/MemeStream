import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {ServiceService} from './service.service';
import { MemesComponent } from './memes/memes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgxSpinnerModule } from "ngx-spinner";
import { DialogComponent } from './memes/dialog/dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    MemesComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    NgxSpinnerModule,
    MatDialogModule,
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent],
  entryComponents:[DialogComponent]
})
export class AppModule { }
