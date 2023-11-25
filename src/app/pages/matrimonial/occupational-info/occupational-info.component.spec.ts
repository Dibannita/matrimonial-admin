import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationalInfoComponent } from './occupational-info.component';

describe('OccupationalInfoComponent', () => {
  let component: OccupationalInfoComponent;
  let fixture: ComponentFixture<OccupationalInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OccupationalInfoComponent]
    });
    fixture = TestBed.createComponent(OccupationalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
