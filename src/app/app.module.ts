import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxChessBoardModule } from 'ngx-chess-board';
import { IframeChessBoardModule } from './iframe-chess-board/iframe-chess-board.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot(),
    IframeChessBoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
