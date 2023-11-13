import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SudokuPage } from './sudoku.page';

describe('SudokuPage', () => {
  let component: SudokuPage;
  let fixture: ComponentFixture<SudokuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SudokuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
