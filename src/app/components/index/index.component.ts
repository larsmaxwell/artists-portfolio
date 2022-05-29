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
    this.setMeta();
    
    // Get menu items from the route data
    this.route.data.subscribe((data: Data) => {
      // this.siteTitle = data.siteInfo.
      this.displayTitle = data.siteInfo.displayTitle;
      this.footerNav = data.siteInfo.footerNav;
      this.mainNav = data.siteInfo.mainNav;
      this.socialNav = data.siteInfo.socialNav;
    });
  }

  setMeta() {
    this.title.setTitle("Lauren (Lurn) Maxwell" );
    this.meta.updateTag({name: 'description', content: "Lauren (Lurn) Maxwell is an artist, comics maker and illustrator living in Seattle"});
    this.meta.updateTag({name: 'keywords', content: "comics, illustration horror comics, non binary, comix, zines, risograph comics, riso comics, horror comics, sci fi comics"});
    this.meta.updateTag({property: 'og:title', content: "Lauren (Lurn) Maxwell"  });
    this.meta.updateTag({property: 'og:description', content: "Lauren (Lurn) Maxwell is a comics maker and illustrator in Seattle, Wa (Originally from Dallas, Tx)" });
    this.meta.updateTag({name: 'twitter:description', content: "Lauren (Lurn) Maxwell is a comics maker and illustrator in Seattle, Wa (Originally from Dallas, Tx)" });
    this.meta.updateTag({name: 'twitter:image', content:"http://www.mlauren.info/assets/images/home/tunnel.png" });
    this.meta.updateTag({property: 'og:image', content:"http://www.mlauren.info/assets/images/home/tunnel.png" });
  }
}
