import { Component, OnInit } from '@angular/core';
import { ArtWork } from '../../models/art-work.model';
import { Category } from '../../models/category.model'
import { SanityService } from '../../services/sanity.service';


@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {
  works: ArtWork[];
  categories: Category[];

  constructor(
    private sanityService: SanityService,
  ) { }

  ngOnInit() {
    this.getWorks();
    this.getCategories();
  }

  getWorks(): void {
    this.sanityService.getWorks()
      .subscribe((result) => this.works = result);
  }

  getWorksByCategory(): void {
    this.getWorks();
  }

  getCategories(): void {
    this.sanityService.getCategories().then(data => {
      this.categories = data;
    });
  }
}
