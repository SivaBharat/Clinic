import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDoctorComponent } from './department-doctor.component';

describe('DepartmentDoctorComponent', () => {
  let component: DepartmentDoctorComponent;
  let fixture: ComponentFixture<DepartmentDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentDoctorComponent]
    });
    fixture = TestBed.createComponent(DepartmentDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
