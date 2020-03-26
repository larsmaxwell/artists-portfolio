import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtWorkViewComponent } from './art-work-view.component';

describe('ArtWorkViewComponent', () => {
  let component: ArtWorkViewComponent;
  let fixture: ComponentFixture<ArtWorkViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtWorkViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtWorkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
