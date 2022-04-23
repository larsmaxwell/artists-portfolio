import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMenuItem } from './navigation-menu-item.component';

describe('NavigationMenuItem', () => {
  let component: NavigationMenuItem;
  let fixture: ComponentFixture<NavigationMenuItem>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationMenuItem ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
