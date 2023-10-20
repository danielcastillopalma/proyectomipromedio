import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteblockPage } from './noteblock.page';

describe('NoteblockPage', () => {
  let component: NoteblockPage;
  let fixture: ComponentFixture<NoteblockPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NoteblockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
