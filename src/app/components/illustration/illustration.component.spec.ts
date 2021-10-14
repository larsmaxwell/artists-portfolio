import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IllustrationComponent } from './illustration.component';

describe('IllustrationComponent', () => {
  let component: IllustrationComponent;
  let fixture: ComponentFixture<IllustrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IllustrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
