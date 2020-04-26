import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationTileComponent } from './illustration-tile.component';

describe('IllustrationTileComponent', () => {
  let component: IllustrationTileComponent;
  let fixture: ComponentFixture<IllustrationTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllustrationTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
