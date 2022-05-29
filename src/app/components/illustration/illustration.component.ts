import { Component, OnInit, Inject, ViewChild, OnChanges, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';

// App Specific
import { Illustration } from '../../models/illustration.model';
import { SanityService } from '../../services/sanity.service';
import { Subscription } from 'rxjs';
import { faAudioDescription } from '@fortawesome/free-solid-svg-icons';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-illustration',
  templateUrl: './illustration.component.html',
  styleUrls: ['./illustration.component.css']
})
export class IllustrationComponent implements OnInit {

  images:any = [];
  imageID: string;
  imgControls: any = {};
  currentIndex: number;
  currentIll: any;
  routeSubscription: Subscription;
  isHome:boolean;
  routerLinkBase: string = "/illustration";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId
  ) { 
  }

  ngOnInit() { 
    this.imageID = this.route.snapshot.paramMap.get('imgId');

    // Get illustrations
    this.route.data.subscribe((data: Data) => {
      this.isHome = data.home;

      this.images = data.illustrations.map(illustration => { 
          return {
            ...illustration.featuredImage,
            metaInfo: illustration.metaInfo,
            illustrationData: {
              name: illustration.name,
              description: illustration.description
            },
          }
      });

      if (!this.imageID) {
        this.imageID = this.images[0].asset.assetId;
      }
    });

    this.route.params.subscribe(routeParams => {

      if (routeParams.imgId) {
        const checkIfMapped = this.checkRouteImgId(routeParams.imgId);

        if (checkIfMapped) this.setImgControls(routeParams.imgId);
        else this.router.navigate([this.routerLinkBase + '/']);
      
        if (this.currentIll) {
          const meta = { 
            ...this.currentIll.metaInfo,
            metaImage: this.currentIll.asset.url,
            title: this.currentIll.name
          };
          this.setMeta(meta);
        }
        
      }

      this.setImgControls(this.imageID);

    });
  }

  checkRouteImgId(id: string) {
    const isMapped = this.images.find((image) => id === image.asset.assetId) || null;
    return isMapped;
  }

  isActiveSlide(id:string) {
    return this.imageID === id;
  }

  setImgControls(imgId:string) {
    if (!this.images) return;

    this.imageID = imgId;
    this.currentIndex = imgId ? this.images.findIndex((item) => {
      return item.asset.assetId === imgId;
    }) : 0;

    this.currentIll = this.images[this.currentIndex];

  }

  setMeta(metaInfo: {metaDescription: string, metaImage: string, metaKeywords: string, title: string}) {
    const {metaDescription, metaImage, metaKeywords, title} = metaInfo;
    this.title.setTitle( `Lauren (Lurn) Maxwell- ${title ? 'Current Illustration:' + title : ''}` );
    this.meta.updateTag({property: 'og:title', content:  `Lauren (Lurn) Maxwell- ${title ? 'Current Illustration:' + title : ''}` });
    this.meta.updateTag({name: 'keywords', content: metaKeywords? metaKeywords : ""  });
    this.meta.updateTag({property: 'og:description', content: metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'twitter:description', content:  metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'description', content:  metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'twitter:image', content: metaImage? metaImage: ''});
    this.meta.updateTag({property: 'og:image', content: metaImage? metaImage: ''});
  }
}
