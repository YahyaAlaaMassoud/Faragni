import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectBoxComponent } from './custom-select-box.component';

describe('CustomSelectBoxComponent', () => {
  let component: CustomSelectBoxComponent;
  let fixture: ComponentFixture<CustomSelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSelectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
