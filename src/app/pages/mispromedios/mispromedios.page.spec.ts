import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MispromediosPage } from './mispromedios.page';

describe('MispromediosPage', () => {
  let component: MispromediosPage;
  let fixture: ComponentFixture<MispromediosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MispromediosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
