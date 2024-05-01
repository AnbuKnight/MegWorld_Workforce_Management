import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubcontractorsComponent } from './view-subcontractors.component';

describe('ViewSubcontractorsComponent', () => {
  let component: ViewSubcontractorsComponent;
  let fixture: ComponentFixture<ViewSubcontractorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubcontractorsComponent]
    });
    fixture = TestBed.createComponent(ViewSubcontractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
