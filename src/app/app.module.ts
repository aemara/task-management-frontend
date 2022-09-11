import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardsModalComponent } from './components/boards-modal/boards-modal.component';
import { AddEditBoardComponent } from './components/add-edit-board/add-edit-board.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { SubtaskComponent } from './components/subtask/subtask.component';
import { Form, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { UiService } from './services/ui.service';
import { AddColumnComponent } from './components/add-column/add-column.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddEditTaskComponent } from './components/add-edit-task/add-edit-task.component';

const appRoutes: Routes = [
  { path: '', component: BoardComponent },
  { path: 'board/:id', component: BoardComponent },
  { path: 'addboard', component: AddEditBoardComponent },
  { path: 'editboard/:id', component: AddEditBoardComponent },
  { path: 'addcolumn/:id', component: AddColumnComponent },
  { path: 'addtask/:id', component: AddEditTaskComponent },
  { path: 'task/:id', component: ViewTaskComponent },
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
    AddColumnComponent,
    ViewTaskComponent,
    SubtaskComponent,
    DeleteModalComponent,
    SidebarComponent,
    AddEditTaskComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
  ],
  providers: [HttpService, UiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
