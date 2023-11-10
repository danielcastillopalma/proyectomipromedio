import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasatiemposPage } from './pasatiempos.page';

describe('PasatiemposPage', () => {
  let component: PasatiemposPage;
  let fixture: ComponentFixture<PasatiemposPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasatiemposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
