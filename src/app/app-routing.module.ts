import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IframeChessBoardComponent } from './iframe-chess-board/iframe-chess-board.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'chess-board', component: IframeChessBoardComponent },
  { path: '**', component: MainPageComponent}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
