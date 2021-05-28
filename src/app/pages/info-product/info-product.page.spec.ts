import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoProductPage } from './info-product.page';

describe('InfoProductPage', () => {
  let component: InfoProductPage;
  let fixture: ComponentFixture<InfoProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
