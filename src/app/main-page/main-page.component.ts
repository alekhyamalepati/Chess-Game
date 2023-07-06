import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Constants } from '../constants';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements AfterViewInit{

  @ViewChild('iframe1Ref', { static: false }) iframe1Ref!: ElementRef<HTMLIFrameElement>;
  @ViewChild('iframe2Ref', { static: false }) iframe2Ref!: ElementRef<HTMLIFrameElement>;


  urlSafe!: SafeResourceUrl;

  currentPlayer: String = 'WHITE';

  /** In this code the ifrrame1 always refers to the iframe on the left hand side
   * whereas the iframe2 refers to the iframe on the right hand side. The left is
   * the white player whereas the right is the black player.
   */
  constructor(public sanitizer: DomSanitizer) {  }

  ngOnInit() {
    // Loads the iframe URL
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("/chess-board");
  }

  ngAfterViewInit() {
    //Extracting the data in local storage to update the boards accordingly
    const iframe2State = localStorage.getItem('boardState1');
    const iframe1State = localStorage.getItem('boardState0');

    this.iframe1Ref.nativeElement.onload = () => {
      const iframe = this.iframe1Ref.nativeElement;
      /** Sending message to iframe to restore the board positions
           extracted from the local storage. */
      if (iframe && iframe.contentWindow) {
        if(iframe1State) {
          let restore_board_message = {
            type: Constants.BOARD_STATE,
            data: iframe1State
          }
          iframe.contentWindow.postMessage(restore_board_message, '*');
        }
    }
    };

    this.iframe2Ref.nativeElement.onload = () => {
      const iframe = this.iframe2Ref.nativeElement;

      if (iframe && iframe.contentWindow) {
        /** Sending message to iframe to restore the board positions
           extracted from the local storage. */
        if(iframe2State) {
          let restore_board_message = {
            type: Constants.BOARD_STATE,
            data: iframe2State
          }
          iframe.contentWindow.postMessage(restore_board_message, '*');
        }
        let reverse_message = {
          type: Constants.REVERSE,
          data: Constants.REVERSE
        }
        let disable_board2_message = {
          type: Constants.DISABLE,
          data: Constants.LIGHT_DISABLE
        }
        /** Sending message to reverse the board as this is the black player
           and it should be facing the player. Also sending messsage to disable
           the appropriate board when it's not this player's turn. */
        iframe.contentWindow.postMessage(reverse_message, '*');
        iframe.contentWindow.postMessage(disable_board2_message, '*');
      }
    };

    window.addEventListener("message", this.getMessage, false);

  }

  /** This is the method that receives communication from the iframes.
   * In this method, the enabling and disabling of appropriate board takes place.
   * The moves are communicated to appropriate boards.
   * The board positions are stored in the local storage by calling
   * saveGameState method.
   * In case a checkmate is detected, an alert is popped up.
   */
  getMessage = async(event: MessageEvent) => {

    this.currentPlayer = event.data.currentPlayer ? Constants.WHITE_PLAYER : Constants.BLACK_PLAYER;

    let iframe1: any = document.getElementById("iframe1");
    let iframe2: any = document.getElementById("iframe2");

    
    if (event.source == iframe1?.contentWindow) {
      let data_message = {
        type: Constants.DATA,
        data: event.data.move
      }
      let disable_message = {
        type: Constants.DISABLE,
        data: Constants.DARK_DISABLE
      }
      await iframe1?.contentWindow.postMessage(disable_message, '*');
      await iframe2?.contentWindow.postMessage(data_message, '*');
      this.saveGameState(event.data.boardState, 0);
    }

    if (event.source == iframe2?.contentWindow) {
      let data_message = {
        type: Constants.DATA,
        data: event.data.move
      }
      let disable_message = {
        type: Constants.DISABLE,
        data: Constants.LIGHT_DISABLE
      }
      await iframe2?.contentWindow.postMessage(disable_message, '*');
      await iframe1?.contentWindow.postMessage(data_message, '*');
      setTimeout(() => {
        if (event.data.isCheckMate) {
          alert("Checkmate!");
        }
      }, 0);
      this.saveGameState(event.data.boardState, 1);
    }
  }

  /** This method is triggered upon clicking the create new game button.
   * It clears the local storage and refreshes the URL to start a new game.
   */
  createNewGame() {
    localStorage.clear();
    location.reload();
  }

  /** This method is to save the appropriate board positions in local storage.
   * The variable boardState0 stores iframe1 board and the variable 
   * boardState0 stores iframe1 board.
  */
  saveGameState(boardState: string, iframeIndex: number) {
    localStorage.setItem(`boardState${iframeIndex}`, boardState);
  }
}
