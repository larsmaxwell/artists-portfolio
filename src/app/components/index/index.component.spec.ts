import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { IndexComponent } from './index.component';

const siteDatas = require('../../../test-data/siteInfo.json');

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let mockActivatedRoute,
    mockTitle,
    mockMeta;
  const SITEDATA: any = siteDatas[0];
  mockMeta = {
    updateTag: () => of(false)
  }
  mockTitle = {
    setTitle: () => of(false)
  }
  beforeEach(() => {
    mockActivatedRoute = {
      data: new BehaviorSubject({
        siteInfo: SITEDATA,
        home: false,
        })
    };

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
    })
    .compileComponents();

    spyOn(mockMeta, 'updateTag').and.callThrough();
    spyOn(mockTitle, 'setTitle').and.callThrough();

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

  it('should update meta title tag', () => {
    fixture.detectChanges();
    expect(mockTitle.setTitle).toHaveBeenCalled();
  });
});
