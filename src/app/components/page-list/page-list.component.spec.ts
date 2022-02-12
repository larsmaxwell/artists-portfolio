import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageListComponent } from './page-list.component';
import {Page} from "../../models/page.model";
import { SanityService } from '../../services/sanity.service';
import { of } from 'rxjs';

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
    // .compileComponents();

    fixture = TestBed.createComponent(PageListComponent)
  });

  it('should fetch pages correctly', () => {
    mockSanityService.getPages.and.returnValue(of(PAGES)) 
    fixture.detectChanges();

    expect(fixture.componentInstance.pages.length).toBe(1);
  });
});
