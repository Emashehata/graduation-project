import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdeicalRecordsComponent } from './mdeical-records.component';

describe('MdeicalRecordsComponent', () => {
  let component: MdeicalRecordsComponent;
  let fixture: ComponentFixture<MdeicalRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdeicalRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdeicalRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
