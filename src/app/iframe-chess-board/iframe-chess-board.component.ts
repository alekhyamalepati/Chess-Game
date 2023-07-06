import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { NgxChessBoardComponent } from 'ngx-chess-board';
import { Constants } from '../constants';


@Component({
  selector: 'app-iframe-chess-board',
  templateUrl: './iframe-chess-board.component.html',
  styleUrls: ['./iframe-chess-board.component.scss']
})
export class IframeChessBoardComponent implements AfterViewInit{
  @ViewChild('board')
  boardManager!: NgxChessBoardComponent;

  public lightDisabled = false;
  public darkDisabled = false;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    }, 0);
  }

  /** This method handles the calls received from the main page.
   * It performs the necessary actions on the board.
   */
  @HostListener('window:message', ['$event'])
  getMessage(event: MessageEvent) {
    if(event.source == window.parent && this.boardManager && event.data.data) {
      switch(event.data.type) {
        case Constants.DATA: {
          this.boardManager.move(event.data.data);
          break;
        }
        case Constants.REVERSE: {
          this.boardManager.reverse();
          break;
        }
        case Constants.RESET: {
          this.boardManager.reset();
          break;
        }
        case Constants.DISABLE: {
          if (event.data.data == Constants.DARK_DISABLE) {
            this.darkDisabled = true;
            this.lightDisabled = false;
          }
          if (event.data.data == Constants.LIGHT_DISABLE) {
            this.lightDisabled = true;
            this.darkDisabled = false;
          }
          break;
        }
        case Constants.BOARD_STATE: {
          this.boardManager.setPGN(event.data.data);
          break;
        }
        default: {
          //Do nothing
        }
      }
    }
  }

  /** Triggered everytine there's a move in the chessboard. 
   * The current move is sent to be reflected on the other board.
   * All the positions in the board are sent to be stored in local storage.
   * Condition checking whether checkmate is detected or not is sent.
   * Current turn which indicates whether it is black or white turn
   * is sent to be displayed. */
  public async moveCallback(move: any): Promise<void> {
    console.log(move);
    let message = {
      move: move.move,
      boardState: this.boardManager.getPGN(),
      isCheckMate: move.checkmate,
      currentPlayer: this.boardManager.engineFacade.board.currentWhitePlayer
    }
      await new Promise<void>((resolve) => {
        window.parent.postMessage(message);
        resolve();
      });
  }
}