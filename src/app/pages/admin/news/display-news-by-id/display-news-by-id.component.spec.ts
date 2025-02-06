import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNewsByIdComponent } from './display-news-by-id.component';

describe('DisplayNewsByIdComponent', () => {
  let component: DisplayNewsByIdComponent;
  let fixture: ComponentFixture<DisplayNewsByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayNewsByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayNewsByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
