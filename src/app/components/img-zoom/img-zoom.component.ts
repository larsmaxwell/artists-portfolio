import { Component, OnInit, Inject, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';
import { RouterModule, ActivatedRoute} from '@angular/router';

import { Album } from '../../types/art-work-album';
import { ArtWorkAlbumService } from '../../services/art-work-album.service';
import { SanityService } from '../../services/sanity.service';
import { WindowRefService } from '../../services/window-ref.service';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight, faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-img-zoom',
  templateUrl: './img-zoom.component.html',
  styleUrls: ['./img-zoom.component.css']
})
export class ImgZoomComponent implements OnInit {

  album: Album;
  images: any;
  currentImg: any;
  imgControls: {};
  desHeight: string;
  desWidth: string;
  sanityInstance: any;
  sanityImgBuilder: any;
  slideshow: boolean;
  currPermalink: string;
  albumid: string;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;


  constructor(
    private ArtWorkAlbumService: ArtWorkAlbumService,
    private sanityService: SanityService,
    private route: ActivatedRoute,
    private router: RouterModule,
    private library: FaIconLibrary,
    private meta: Meta,
    private title: Title,
    @Inject(WindowRefService) private window: Window,
  ) {
    library.addIcons(this.faArrowLeft, this.faArrowRight, this.faChevronCircleLeft);
  }

  ngOnInit() {
    this.getSanity();
    this.getSanityUrlBuilder();
    this.albumid = this.route.snapshot.paramMap.get('albumId');
    const imgId = this.route.snapshot.paramMap.get('imgId');
    this.currPermalink = this.route.snapshot.paramMap.get('permalink');

    if (imgId) {
      this.slideshow = true;
    }

    this.getAlbum(this.albumid);

    this.getAlbumImages(this.albumid, imgId);
    
    this.desHeight = window.innerHeight + 'px';
    this.desWidth = window.innerWidth + 'px';

    this.route.params.subscribe(routeParams => {
      let imgId = routeParams.imgId;
      this.getAlbumImages(this.albumid, imgId);
    });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes);
  //   const imgId = this.route.snapshot.paramMap.get('imgId');
  //   this.getAlbumImages(this.albumid, imgId);
  // }

  getAlbumImages(id, imgId) {
    this.ArtWorkAlbumService.getAlbumImages(this.sanityInstance, id).subscribe(data => {
      this.images = data;
      let albumLength = this.images.length;

        this.currentImg = data[imgId].asset;
        let currentIndex = imgId;

        let desLength = albumLength - 1;
        let next = parseInt(currentIndex) === desLength ? 0 : parseInt(currentIndex) + 1;
        let prev = parseInt(currentIndex) === 0 ? desLength : parseInt(currentIndex) - 1;

        this.imgControls = {
            currentImg: data[imgId],
            currentIndex: imgId,
            nextId: next,
            prevId: prev,
            permalink: this.currPermalink
        };

        this.meta.updateTag({name: 'image', content: data[imgId].asset.url});
        this.meta.updateTag({property: 'og:image', content: data[imgId].asset.url});
        this.meta.updateTag({name: 'twitter:image', content: data[imgId].asset.url});


        if (data[imgId].caption) {
          this.meta.updateTag({name: 'description', content: data[imgId].caption});
          this.meta.updateTag({property: 'og:description', content: data[imgId].caption});
          this.meta.updateTag({name: 'twitter:description', content: data[imgId].caption});
        }
        else {
          let descString = `Gallery Image Page ${imgId} View`
          this.meta.updateTag({name: 'description', content: descString});
          this.meta.updateTag({property: 'og:description', content: descString});
          this.meta.updateTag({name: 'twitter:description', content: descString});

        }

    });
  }

  getAlbum(id: string) {
    const currPermalink = this.route.snapshot.paramMap.get('permalink');

    this.ArtWorkAlbumService.getAlbumById(id)
      .subscribe(album => {
        this.album = album;
        this.title.setTitle( album.name );
        this.meta.updateTag({property: 'og:title', content: album.name});

        this.meta.updateTag({property: 'og:title', content: album.name});
        this.meta.updateTag({name: 'keywords', content: album.name + ' artwork view, view images, gallery view'});
      });
  }

  getSanity() {
    this.sanityInstance = this.sanityService.init();
  }

  getSanityUrlBuilder() {
    this.sanityImgBuilder = this.sanityService.getImageUrlBuilder(this.sanityInstance);
  }

  urlFor(source: string) {
    return this.sanityImgBuilder.image(source)
  }

  getNextIndex(index: number) {
    if (index === this.album.images.length - 1) {
      return 0;
    }
    else {
      return index+1;
    }
  }

  isMobileSize() {
    return window.innerWidth <= 575;
  }

}
