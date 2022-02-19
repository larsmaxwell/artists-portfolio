import { Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SanityService } from '../../services/sanity.service';

import { ImageGalleryComponent } from './image-gallery.component';
const imagesData = require('../../../test-data/images.json');

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
      this.navigatedTo = this.linkParams;
  }
}

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent;
  let fixture: ComponentFixture<ImageGalleryComponent>;
  let mockSanityService,
      mockActivatedRoute,
      mockSanityImageSpy,
      mockRouter,
      IMAGES;

  beforeEach(() => {
    mockSanityService = jasmine.createSpyObj(
      ['getImageUrlBuilder']
    )
    // image
    mockRouter = {
      navigate: () => {}
    };
    mockActivatedRoute = {
      paramMap: {subscribe: () => {}}
    };

    IMAGES = imagesData;

    TestBed.configureTestingModule({
      declarations: [ 
        ImageGalleryComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        { provide: SanityService, useValue: mockSanityService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    });
    fixture = TestBed.createComponent(ImageGalleryComponent);
    component = fixture.componentInstance;

    component.isMobile = false;
    component.images = IMAGES;
    component.routerLinkBase = '/illustration';
    component.currentImgIndex = 0;
    component.pagination = false;
    
    // Take care of image library subscription
    const imageMock2 = jasmine.createSpyObj(
      {'image': () => of({})}
    );
    const imageMock3 = jasmine.createSpyObj(
      {'width': () => of({})}
    );
    const imageMock4 = jasmine.createSpyObj(
      {'blur': () => of({})}
    );

    mockSanityService.getImageUrlBuilder.and.returnValue(imageMock2);
    imageMock2.image.and.returnValue(imageMock3);
    imageMock3.width.and.returnValue(imageMock4);
  });


  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call route subscribe', () => {
    spyOn(mockActivatedRoute.paramMap, 'subscribe').and.returnValue(of(true));

    fixture.detectChanges();

    expect(mockActivatedRoute.paramMap.subscribe).toHaveBeenCalled();
  });

  it('should navigate to the next element', () => {
    fixture.detectChanges();

    const buttonNext = fixture.debugElement.query(By.css(".overlay-controls.right-control"));

    let routerLink = buttonNext
    .query(By.directive(RouterLinkDirectiveStub))
    .injector.get(RouterLinkDirectiveStub);

    buttonNext.query(By.css("button")).triggerEventHandler('click', null);

    expect(JSON.stringify(routerLink.navigatedTo)).toBe(
      JSON.stringify(['/illustration','f6ebaa2616fd37a9efed6cc4a755496e7df4a9f8']));
  });

});
