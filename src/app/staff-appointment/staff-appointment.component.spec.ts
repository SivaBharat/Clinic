import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAppointmentComponent } from './staff-appointment.component';

describe('StaffAppointmentComponent', () => {
  let component: StaffAppointmentComponent;
  let fixture: ComponentFixture<StaffAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffAppointmentComponent]
    });
    fixture = TestBed.createComponent(StaffAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
