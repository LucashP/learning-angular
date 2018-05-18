import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HeroesComponent} from './heroes.component';

import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {HEROES} from '../mock-heroes';
import {HeroDetailComponent} from '../hero-detail/hero-detail.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroDetailComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('heroes should be defined', () => {
    expect(component.heroes).toBeTruthy();
  });

  it('heroes should be have 10 elements', () => {
    expect(component.heroes.length).toEqual(HEROES.length);
  });

  it('should select hero', () => {
    const heroes = component.heroes;
    const selectedIndex = 0;
    const hero = heroes[selectedIndex];

    const el = fixture.debugElement.query(By.css('li')).nativeElement;
    expect(el.classList.contains('selected')).toBe(false);
    expect(component.selectedHero).toEqual(null);

    component.onSelect(hero);
    fixture.detectChanges();
    expect(el.classList.contains('selected')).toBe(true);
    expect(component.selectedHero).toEqual(hero);
  });

  it('should select hero by clicking element', () => {
    const heroes = component.heroes;
    const selectedIndex = 0;
    const selectedHero = heroes[selectedIndex];

    const heroesElement = fixture.nativeElement.querySelectorAll('li')[selectedIndex];
    heroesElement.click();
    fixture.detectChanges();
    expect(heroesElement.classList.contains('selected')).toBe(true);
    expect(component.selectedHero).toEqual(selectedHero);

    const heroDetailElement = fixture.nativeElement.querySelector('app-hero-detail');
    expect(heroDetailElement.querySelector('h2').textContent).toContain(selectedHero.name.toUpperCase() + ' Details');
  });
});
