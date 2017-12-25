import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallImagesComponent } from './wall-images.component';

describe('WallImagesComponent', () => {
  let component: WallImagesComponent;
  let fixture: ComponentFixture<WallImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
