import { Component, OnInit } from '@angular/core';
import { ArtWorkService } from '../../services/art-work-service.service'
import { ArtWork } from '../../types/art-work';
import { SanityCategoryService } from '../../services/category.service';
import { Category } from '../../types/category'


@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {
  works: ArtWork;
  sanityClient: any;
  categories: Category[];

  constructor(
    private artWorkService: ArtWorkService,
    private categoryService: SanityCategoryService
  ) { }

  ngOnInit() {
    this.getWorks();
    this.getCategories();
  }

  getWorks(): void {
    const client = this.artWorkService.init();
    this.artWorkService.getWorks(client)
      .then((result) =>  { this.works = result;} );
  }

  getWorksByCategory(): void {
    this.getWorks();
  }

  getCategories(): void {
    const sanityClient = this.categoryService.init();

    this.categoryService.getCategories(sanityClient).then(data => {
      this.categories = data;
    });
  }
}
