import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreIndexComponent } from './store-index.component';

describe('StoreIndexComponent', () => {
  let component: StoreIndexComponent;
  let fixture: ComponentFixture<StoreIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
