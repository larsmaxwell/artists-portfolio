import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBed, faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIconsService } from '../../services/font-awesome-icons.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  date = new Date();
  mainNav: {};
  footerNav: {items:[]};
  socialNav: {};
  displayTitle: string;
  faBed = faBed;
  siteTitle = "Lauren Maxwell";

  constructor(
    private meta: Meta,
    private title: Title,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    
    // Get menu items from the route data
    this.route.data.subscribe((data: Data) => {
      // this.siteTitle = data.siteInfo.
      this.displayTitle = data.siteInfo.displayTitle;
      this.footerNav = data.siteInfo.footerNav;
      this.mainNav = data.siteInfo.mainNav;
      this.socialNav = data.siteInfo.socialNav;

      this.setMeta({
        ...data.siteInfo.metaInfo,
        title: data.siteInfo.title,
        metaImage: data.siteInfo.metaInfo?.metaImage?.asset?.url
      });

    });
  }

  setMeta(metaInfo: {metaDescription: string, metaImage: string, metaKeywords: string, title: string}) {
    const {metaDescription, metaImage, metaKeywords, title} = metaInfo;
    this.title.setTitle(title);
    this.meta.updateTag({property: 'og:title', content: title });
    this.meta.updateTag({name: 'keywords', content: metaKeywords? metaKeywords : ""  });
    this.meta.updateTag({property: 'og:description', content: metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'twitter:description', content:  metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'description', content:  metaDescription?metaDescription:''});
    this.meta.updateTag({name: 'twitter:image', content: metaImage? metaImage: ''});
    this.meta.updateTag({property: 'og:image', content: metaImage? metaImage: ''});
  }
}
