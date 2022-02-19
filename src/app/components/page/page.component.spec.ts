import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Meta, Title } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Page } from '../../models/page.model';
import { SanityService } from '../../services/sanity.service';
import { PageComponent } from './page.component';

const pageData = require('../../../test-data/pages.json');


describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let mockActivatedRoute, 
      mockSanityService,
      mockTitle,
      mockMeta;
  let PAGE: Page;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {paramMap: { get(): string { return 'about';}}}
    };
    mockSanityService = jasmine.createSpyObj(
      ['getPage', 'getPageBlockContents', 'getImageUrlBuilder']
    );
    mockMeta = jasmine.createSpyObj(['updateTag']);
    mockTitle = jasmine.createSpyObj(['setTitle']);

    PAGE = pageData[0];

    TestBed.configureTestingModule({
      declarations: [ PageComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: SanityService, useValue: mockSanityService},
        {provide: Meta, useValue: mockMeta},
        {provide: Title, useValue: mockTitle}
      ]
    });
    // .compileComponents();
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    mockSanityService.getPage.and.returnValue(of(PAGE));
    mockSanityService.getPageBlockContents.and.returnValue(of([{}]));

    let imgMock = jasmine.createSpyObj({
      'image': () => of({})
    })
    mockSanityService.getImageUrlBuilder.and.returnValue(imgMock);
  });

  it('should render page name in an h3 tag', () => {
    fixture.detectChanges();
    const name = "About/Contact"
    const titleText = fixture.debugElement.query(By.css('h3')).nativeElement.textContent;

    expect(titleText).toContain(name);
  });
});
