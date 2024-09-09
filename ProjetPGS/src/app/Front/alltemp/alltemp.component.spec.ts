import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltempComponent } from './alltemp.component';

describe('AlltempComponent', () => {
  let component: AlltempComponent;
  let fixture: ComponentFixture<AlltempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlltempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlltempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
