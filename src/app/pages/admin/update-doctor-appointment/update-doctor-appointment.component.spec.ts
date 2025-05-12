import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDoctorAppointmentComponent } from './update-doctor-appointment.component';

describe('UpdateDoctorAppointmentComponent', () => {
  let component: UpdateDoctorAppointmentComponent;
  let fixture: ComponentFixture<UpdateDoctorAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDoctorAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDoctorAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
