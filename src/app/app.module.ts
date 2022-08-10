import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardsModalComponent } from './components/boards-modal/boards-modal.component';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';

const appRoutes: Routes = [
  {path: '', component: BoardComponent},
  {path: 'board/:id', component: BoardComponent}
];




@NgModule({
  declarations: [
    AppComponent,
    TitlebarComponent,
    BoardComponent,
    ColumnComponent,
    TaskComponent,
    BoardsModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
