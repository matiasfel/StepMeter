import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermsPage } from './perms.page';

describe('PermsPage', () => {
  let component: PermsPage;
  let fixture: ComponentFixture<PermsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PermsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
