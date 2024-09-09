import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientQuantityComponent } from './client-quantity.component';

describe('ClientQuantityComponent', () => {
  let component: ClientQuantityComponent;
  let fixture: ComponentFixture<ClientQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
