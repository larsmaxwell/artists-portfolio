import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAlbumComponent } from './work-album.component';

describe('WorkAlbumComponent', () => {
  let component: WorkAlbumComponent;
  let fixture: ComponentFixture<WorkAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
