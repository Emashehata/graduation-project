import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAppointmentsComponent } from './clinic-appointments.component';

describe('ClinicAppointmentsComponent', () => {
  let component: ClinicAppointmentsComponent;
  let fixture: ComponentFixture<ClinicAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
