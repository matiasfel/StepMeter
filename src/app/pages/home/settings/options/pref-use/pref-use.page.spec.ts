import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrefUsePage } from './pref-use.page';

describe('PrefUsePage', () => {
  let component: PrefUsePage;
  let fixture: ComponentFixture<PrefUsePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefUsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
