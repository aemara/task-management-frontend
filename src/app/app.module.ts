import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardsModalComponent } from './components/boards-modal/boards-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    ColumnsComponent,
    ColumnComponent,
    TaskComponent,
    BoardsModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
