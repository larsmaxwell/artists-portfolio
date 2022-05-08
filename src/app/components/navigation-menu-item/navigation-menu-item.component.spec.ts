import { Component, Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { FontAwesomeIconsService } from '../../services/font-awesome-icons.service';

import { NavigationMenuItem } from './navigation-menu-item.component';
const siteDatas = require('../../../test-data/siteInfo.json');
const SITEDATA: any = siteDatas[0];
const menuItem = {
  internal: SITEDATA.mainNav.items[0],
  external: SITEDATA.mainNav.items[3]
}


@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') routerLink: any;
}

@Component({
  selector: `host-component`,
  template: `<app-navigation-menu-item [item]="menuItem.internal">
  </app-navigation-menu-item>`
})
class TestHostComponent {
}

describe('NavigationMenuItem', () => {

  let component: NavigationMenuItem;
  let fixture: ComponentFixture<NavigationMenuItem>;
  const mockFaService = {
    getIcon: () => {
      return {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NavigationMenuItem,
        TestHostComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        {provide: FontAwesomeIconsService, useValue: mockFaService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuItem);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.item = menuItem.internal;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('internal url should have href attribute', () => {
    component.item = menuItem.internal;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('a')).nativeNode.getAttribute('ng-reflect-router-link')
    ).toContain('illustration');
  });

  it('external url should have href attribute', () => {
    component.item = menuItem.external;
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('a').getAttribute('href')
      ).toContain('mlaurenstore');
  });

});
