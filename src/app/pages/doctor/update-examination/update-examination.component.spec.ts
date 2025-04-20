import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExaminationComponent } from './update-examination.component';

describe('UpdateExaminationComponent', () => {
  let component: UpdateExaminationComponent;
  let fixture: ComponentFixture<UpdateExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateExaminationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
