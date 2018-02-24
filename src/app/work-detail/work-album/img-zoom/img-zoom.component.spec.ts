import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgZoomComponent } from './img-zoom.component';

describe('ImgZoomComponent', () => {
  let component: ImgZoomComponent;
  let fixture: ComponentFixture<ImgZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
