import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSitesComponent } from './view-sites.component';

describe('ViewSitesComponent', () => {
  let component: ViewSitesComponent;
  let fixture: ComponentFixture<ViewSitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSitesComponent]
    });
    fixture = TestBed.createComponent(ViewSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
