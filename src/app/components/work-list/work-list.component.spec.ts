import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WorkListComponent } from './work-list.component';

describe('WorkListComponent', () => {
  let component: WorkListComponent;
  let fixture: ComponentFixture<WorkListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
