import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDetailComponent } from './work-detail.component';

describe('WorkDetailComponent', () => {
  let component: WorkDetailComponent;
  let fixture: ComponentFixture<WorkDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
