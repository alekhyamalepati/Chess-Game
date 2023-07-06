import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeChessBoardComponent } from './iframe-chess-board.component';

describe('IframeChessBoardComponent', () => {
  let component: IframeChessBoardComponent;
  let fixture: ComponentFixture<IframeChessBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IframeChessBoardComponent]
    });
    fixture = TestBed.createComponent(IframeChessBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
