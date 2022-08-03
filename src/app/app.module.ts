import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { SubtaskComponent } from './components/subtask/subtask.component';
import { Form, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    ColumnsComponent,
    ColumnComponent,
    TaskComponent,
    ViewTaskComponent,
    SubtaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
