import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';

import { BoardsModalComponent } from './components/boards-modal/boards-modal.component';
import { AddEditBoardComponent } from './components/add-edit-board/add-edit-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { UiService } from './services/ui.service';
import { AddColumnComponent } from './components/add-column/add-column.component';

const appRoutes: Routes = [
  {path: '', component: BoardComponent},
  {path: 'board/:id', component: BoardComponent},
  {path: 'addboard', component: AddEditBoardComponent},
  {path: 'addcolumn/:id', component: AddColumnComponent}
];




@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    BoardComponent,
    ColumnComponent,
    TaskComponent,
    BoardsModalComponent,
    AddEditBoardComponent,
    AddColumnComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [HttpService, UiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
