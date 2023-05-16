import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTabsComponent } from './option-tabs.component';

describe('OptionTabsComponent', () => {
  let component: OptionTabsComponent;
  let fixture: ComponentFixture<OptionTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
