import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemitrailersComponent } from './semitrailers.component';

describe('SemitrailersComponent', () => {
  let component: SemitrailersComponent;
  let fixture: ComponentFixture<SemitrailersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemitrailersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemitrailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
