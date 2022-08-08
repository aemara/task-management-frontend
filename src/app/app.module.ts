import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    ColumnsComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
