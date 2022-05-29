import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IndexComponent } from './index.component';

const siteDatas = require('../../../test-data/siteInfo.json');


describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let mockActivatedRoute,
    mockTitle,
    mockMeta;
  const SITEDATA: any = siteDatas[0];

  beforeEach(() => {
    mockActivatedRoute = {
      data: {
        siteInfo: SITEDATA,
        home: false,
        subscribe: () => {
          return of({
            siteInfo: SITEDATA,
            home: false,
          })
        }
      },
    };
    mockMeta = jasmine.createSpyObj(['updateTag']);
    mockTitle = jasmine.createSpyObj(['setTitle']);

    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Meta, useValue: mockMeta},
        {provide: Title, useValue: mockTitle}
      ]
    });
    // .compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;

    component.footerNav = SITEDATA.footerNav;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should update meta tags', () => {
    fixture.detectChanges();
    expect(mockMeta.updateTag).toHaveBeenCalled();
  });

  it('should update meta tags', () => {
    fixture.detectChanges();
    expect(mockTitle.setTitle).toHaveBeenCalled();
  });
});
