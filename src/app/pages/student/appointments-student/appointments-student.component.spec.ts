import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsStudentComponent } from './appointments-student.component';

describe('AppointmentsStudentComponent', () => {
  let component: AppointmentsStudentComponent;
  let fixture: ComponentFixture<AppointmentsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
