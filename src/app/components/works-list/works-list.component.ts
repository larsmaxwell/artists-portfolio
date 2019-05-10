import { Component, OnInit } from '@angular/core';
import { ArtWorkService } from '../../services/art-work-service.service'
import { ArtWork } from '../../types/art-work';


@Component({
  selector: 'app-works-list',
  templateUrl: './works-list.component.html',
  styleUrls: ['./works-list.component.css']
})
export class WorksListComponent implements OnInit {
  works: ArtWork;

  constructor(
    private artWorkService: ArtWorkService
  ) { }

  ngOnInit() {
    this.getWorks();
    console.log(this);
  }

  getWorks(): void {
    this.artWorkService.getWorks()
      .subscribe((work:any) =>  { this.works = work.result} );
  }

  getWorksByCategory(): void {
    this.artWorkService.getWorks()
      .subscribe((work:any) =>  { this.works = work.result} );
  }

}
