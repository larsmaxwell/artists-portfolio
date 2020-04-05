import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeResourceUrl, Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private meta: Meta,
    private title: Title,) { }

  ngOnInit() {
    this.setMeta();

  }

  setMeta() {
    this.title.setTitle("Lurn Maxwell: About");
    this.meta.updateTag({name: 'description', content: "Lauren (Lurn) Maxwell is a comix maker and illustrator in Seattle"});
    this.meta.updateTag({name: 'keywords', content: "comics, horror comics, non binary, comix, zines, risograph comics, riso comics, horror comics, sci fi comics"});
    this.meta.updateTag({property: 'og:title', content: "Lurn Maxwell: About" });
    this.meta.updateTag({property: 'og:description', content: "Lauren (Lurn) Maxwell is a comix maker and illustrator in Seattle" });


    this.meta.updateTag({name: 'twitter:description', content: "Lauren (Lurn) Maxwell is a comix maker and illustrator in Seattle" });
    this.meta.updateTag({name: 'twitter:image', content:"http://www.mlauren.info/assets/images/home/tunnel.png" });
    this.meta.updateTag({property: 'og:image', content:"http://www.mlauren.info/assets/images/home/tunnel.png" });
  }

}
