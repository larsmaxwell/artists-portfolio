import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMenuBlockComponent } from './navigation-menu-block.component';
const siteDatas = require('../../../test-data/siteInfo.json');
const SITEDATA: any = siteDatas[0];
const menuItems = SITEDATA.mainNav.items;


describe('NavigationMenuBlockComponent', () => {
  let component: NavigationMenuBlockComponent;
  let fixture: ComponentFixture<NavigationMenuBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationMenuBlockComponent ]
    })
    // .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuBlockComponent);
    component = fixture.componentInstance;
    component.items = menuItems;
    component.classNames = [
      {
        ul: ['list-unstyled'],
        li: ['list-element']
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct ul classnames', () => {

    const ulClassNames = component.ulClassNames;

    expect(
      ulClassNames
      ).toContain('list-unstyled');
  });

  it('should display correct li classnames', () => {

    const ulClassNames = component.liClassNames;

    expect(
      ulClassNames
      ).toContain('list-element');
  });
});
