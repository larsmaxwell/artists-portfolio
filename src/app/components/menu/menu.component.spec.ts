import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FontAwesomeIconsService } from '../../services/font-awesome-icons.service';
import { MenuComponent } from './menu.component';

const siteDatas = require('../../../test-data/siteInfo.json');
const SITEDATA: any = siteDatas[0];
const mainNav = SITEDATA.mainNav;
const socialNav = SITEDATA.socialNav;

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const mockRouter = {
    events: {subscribe: () => of(false)},
  };
  const mockFaService = {
    getIcon: () => {
      return {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MenuComponent
      ],
      providers: [
        {provide: Router, useValue: mockRouter },
        {provide: FontAwesomeIconsService, useValue: mockFaService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.displayTitle = "Lurn Maxwell";
    component.mainMenuData = mainNav;
    component.socialMenuData = socialNav;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display site title', async () => {
    const siteTitle = fixture.debugElement.query(By.css('H1'));

    expect(siteTitle.nativeNode.innerText).toEqual("Lurn Maxwell");
  });
});
