import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDetailComponent } from './file-detail';

describe('FileDetail', () => {
  let component: FileDetailComponent;
  let fixture: ComponentFixture<FileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
