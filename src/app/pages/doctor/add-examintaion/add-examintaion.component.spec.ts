import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamintaionComponent } from './add-examintaion.component';

describe('AddExamintaionComponent', () => {
  let component: AddExamintaionComponent;
  let fixture: ComponentFixture<AddExamintaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamintaionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExamintaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
