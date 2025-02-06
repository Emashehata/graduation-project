import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsComponent } from './add-news.component';

describe('AddNewsComponent', () => {
  let component: AddNewsComponent;
  let fixture: ComponentFixture<AddNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
