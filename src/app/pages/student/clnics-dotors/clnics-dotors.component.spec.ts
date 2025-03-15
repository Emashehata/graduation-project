import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClnicsDotorsComponent } from './clnics-dotors.component';

describe('ClnicsDotorsComponent', () => {
  let component: ClnicsDotorsComponent;
  let fixture: ComponentFixture<ClnicsDotorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClnicsDotorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClnicsDotorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
