import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockDeNotasPage } from './block-de-notas.page';

describe('BlockDeNotasPage', () => {
  let component: BlockDeNotasPage;
  let fixture: ComponentFixture<BlockDeNotasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BlockDeNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
