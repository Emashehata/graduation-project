import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeddbacksComponent } from './feddbacks.component';

describe('FeddbacksComponent', () => {
  let component: FeddbacksComponent;
  let fixture: ComponentFixture<FeddbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeddbacksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeddbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
