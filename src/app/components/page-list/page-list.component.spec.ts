import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageListComponent } from './page-list.component';
import {Page} from "../../models/page.model";
import { SanityService } from '../../services/sanity.service';
import { of } from 'rxjs';
import { By } from "@angular/platform-browser";

const pageData = require('../../../test-data/pages.json');

describe('PageListComponent', () => {
  let component: PageListComponent;
  let fixture: ComponentFixture<PageListComponent>;
  let mockSanityService;
  let PAGES: Page[];

  beforeEach(() => {
    mockSanityService = jasmine.createSpyObj(
      ['getPages']
    )
    PAGES = pageData;

    TestBed.configureTestingModule({
      declarations: [ 
        PageListComponent 
      ],
      providers: [
        {provide: SanityService, useValue: mockSanityService}
      ]
    });

    fixture = TestBed.createComponent(PageListComponent)
  });

  it('should fetch pages correctly', () => {
    mockSanityService.getPages.and.returnValue(of(PAGES)) 
    fixture.detectChanges();

    expect(fixture.componentInstance.pages.length).toBe(1);
  });

  it('should create one li for each page', () => {
    mockSanityService.getPages.and.returnValue(of(PAGES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(1);
  })
});
