import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationComponent } from './examination.component';

describe('ExaminationComponent', () => {
  let component: ExaminationComponent;
  let fixture: ComponentFixture<ExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExaminationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
