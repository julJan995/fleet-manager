import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSemitrailerComponent } from './add-edit-semitrailer.component';

describe('AddEditSemitrailerComponent', () => {
  let component: AddEditSemitrailerComponent;
  let fixture: ComponentFixture<AddEditSemitrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSemitrailerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSemitrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
