import { Component, OnInit } from '@angular/core';
import { ArtWorkService } from '../../services/art-work-service.service'
import { ArtWork } from '../../types/art-work';
import { SanityCategoryService } from '../../services/sanity-category.service';
import { Category } from '../../types/category'


@Component({
  selector: 'app-works-list',
  templateUrl: './works-list.component.html',
  styleUrls: ['./works-list.component.css']
})
export class WorksListComponent implements OnInit {
  works: ArtWork;
  sanityClient: any;
  categories: Category[];

  constructor(
    private artWorkService: ArtWorkService,
    private sanityCategoryService: SanityCategoryService
  ) { }

  ngOnInit() {
    this.getWorks();
    this.getCategories();
  }

  getWorks(): void {
    this.artWorkService.getWorks()
      .subscribe((work:any) =>  { this.works = work.result} );
  }

  getWorksByCategory(): void {
    this.artWorkService.getWorks()
      .subscribe((work:any) =>  { this.works = work.result} );
  }

  getCategories(): void {
    const sanityClient = this.sanityCategoryService.init();

    this.sanityCategoryService.getCategories(sanityClient).then(data => {
      this.categories = data;
    });
  }


}
