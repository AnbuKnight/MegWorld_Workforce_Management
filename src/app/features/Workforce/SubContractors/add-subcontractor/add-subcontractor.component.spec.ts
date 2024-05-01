import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubcontractorComponent } from './add-subcontractor.component';

describe('AddSubcontractorComponent', () => {
  let component: AddSubcontractorComponent;
  let fixture: ComponentFixture<AddSubcontractorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubcontractorComponent]
    });
    fixture = TestBed.createComponent(AddSubcontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
