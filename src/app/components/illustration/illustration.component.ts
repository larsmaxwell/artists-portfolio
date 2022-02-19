import { Component, OnInit, Inject, ViewChild, OnChanges, SimpleChanges, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, Meta,Title } from '@angular/platform-browser';

// App Specific
import { Illustration } from '../../models/illustration.model';
import { SanityService } from '../../services/sanity.service';
import { Subscription } from 'rxjs';
import { faAudioDescription } from '@fortawesome/free-solid-svg-icons';

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
            illustrationData: {
              name: illustration.name,
              description: illustration.description
            }
          }
      });

      if (!this.imageID) {
        this.imageID = this.images[0].asset.assetId;
      }
      this.setImgControls(this.imageID);
    });

    this.route.params.subscribe(routeParams => {

      if (routeParams.imgId) {
        const checkIfMapped = this.checkRouteImgId(routeParams.imgId);

        if (checkIfMapped) this.setImgControls(routeParams.imgId);
        else this.router.navigate([this.routerLinkBase + '/']);
      }
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

    if (!this.isHome) {
      const meta = { 
        description: this.currentIll.illustrationData.description,
        name: this.currentIll.illustrationData.name,
        image: this.currentIll.asset.url
      };
      this.setMeta(meta);
    }
  }

  setMeta(data) {
    this.title.setTitle("Lauren (Lurn) Maxwell- Current Illustration: " + data.name);
    this.meta.updateTag({name: 'description', content: data.name + " (" + data.description + ")"});
    this.meta.updateTag({name: 'keywords', content: "comics, horror comics, illustration, non binary, comix, zines, risograph comics, riso comics, horror comics, sci fi comics"});
    this.meta.updateTag({property: 'og:title', content: "Lauren (Lurn) Maxwell- Current Illustration: " + data.name });
    this.meta.updateTag({property: 'og:description', content:  data.name + " (" + data.description + ")" });
    this.meta.updateTag({name: 'twitter:description', content: data.name + " (" + data.description + ")" });
    this.meta.updateTag({name: 'twitter:image', content: data.image });
    this.meta.updateTag({property: 'og:image', content: data.image });
  }
}
