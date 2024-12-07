import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneralInfoPage } from './general-info.page';

describe('GeneralInfoPage', () => {
  let component: GeneralInfoPage;
  let fixture: ComponentFixture<GeneralInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
