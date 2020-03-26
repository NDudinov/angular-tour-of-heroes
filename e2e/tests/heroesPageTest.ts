import DashboardPage from '../page/dashboardPage'
import HeroesPage from '../page/heroesPage'
import {browser} from 'protractor';

let dashboardPage;
let heroesPage;

describe('Heroes page tests', () => {

  beforeEach(() => {
    dashboardPage = new DashboardPage();
    heroesPage = new HeroesPage();
    heroesPage.open();
  });

  it('Checks navigation to dashboard page', async () => {
    await dashboardPage.clickDashboardTab();
    expect(browser.getCurrentUrl()).toMatch('/dashboard');
  });

  it('Checks heroes page title', () => {
    expect(heroesPage.getHeroesPageTitleText()).toEqual('My Heroes');
  });

  it('Checks list of heroes is not empty', () => {
    expect(heroesPage.getListOfHeroesLength()).toBeGreaterThan(0);
  });

  it('Checks "Add New Hero" button is displayed', () => {
    expect(heroesPage.checkAddNewHeroButtonIsDisplayed()).toBe(true);
  });

  it('Checks adding new hero', async () => {
    const newHeroName = 'New Hero';
    await heroesPage.addNewHero(newHeroName);
    expect(heroesPage.getListOfHeroesNames()).toContain(newHeroName);
  });

  it('Checks Cancel button for adding', async () => {
    const newHeroName = 'Check cancel adding hero';
    await heroesPage.addAndCancelNewHero(newHeroName);
    expect(heroesPage.getListOfHeroesNames()).not.toContain(newHeroName);
  });

  it('Checks updating new hero', async () => {
    const nameBefore = await heroesPage.getRandomHeroName();
    const nameAfter = 'Updated Hero';
    await heroesPage.updateHero(nameBefore, nameAfter);
    const listOfHeroes = await heroesPage.getListOfHeroesNames();
    expect(listOfHeroes).not.toContain(nameBefore);
    expect(listOfHeroes).toContain(nameAfter);
  });

  it('Checks Cancel button for update', async () => {
    const nameBefore = await heroesPage.getRandomHeroName();
    const nameAfter = 'Check cancel update hero';
    await heroesPage.updateAndCancelNewHero(nameBefore, nameAfter);
    const listOfHeroes = await heroesPage.getListOfHeroesNames();
    expect(listOfHeroes).not.toContain(nameAfter);
    expect(listOfHeroes).toContain(nameBefore);
  });

  it('Checks Delete hero', async () => {
    const name = await heroesPage.getRandomHeroName();
    await heroesPage.deleteHeroByName(name);
    const listOfHeroes = await heroesPage.getListOfHeroesNames();
    expect(listOfHeroes).not.toContain(name);
  });
});
