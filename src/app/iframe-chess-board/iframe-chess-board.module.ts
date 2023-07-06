import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { IframeChessBoardComponent } from './iframe-chess-board.component';



@NgModule({
  declarations: [IframeChessBoardComponent],
  imports: [
    CommonModule,
    NgxChessBoardModule.forRoot(),

  ]
})
export class IframeChessBoardModule { }
