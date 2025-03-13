import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAccountComponent } from './doctor-account.component';

describe('DoctorAccountComponent', () => {
  let component: DoctorAccountComponent;
  let fixture: ComponentFixture<DoctorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
