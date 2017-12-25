import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallDetailComponent } from './wall-detail.component';

describe('WallDetailComponent', () => {
  let component: WallDetailComponent;
  let fixture: ComponentFixture<WallDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
