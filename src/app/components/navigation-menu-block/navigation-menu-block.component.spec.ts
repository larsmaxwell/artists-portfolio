import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMenuBlockComponent } from './navigation-menu-block.component';

describe('NavigationMenuBlockComponent', () => {
  let component: NavigationMenuBlockComponent;
  let fixture: ComponentFixture<NavigationMenuBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationMenuBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
