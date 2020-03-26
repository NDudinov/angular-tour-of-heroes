import DashboardPage from '../page/dashboardPage'
import HeroDetailPage from '../page/heroDetailPage'
import HeroesPage from '../page/heroesPage'
import {browser} from 'protractor';

describe('Heroes detail page tests', () => {

  let dashboardPage;
  let heroDetailPage;

  beforeAll(() => {
    dashboardPage = new DashboardPage();
    heroDetailPage = new HeroDetailPage();
  });

  beforeEach(() => {
    dashboardPage.open();
  });

  it('Checks navigation to detail page from Top Heroes', async () => {
    await dashboardPage.selectTopHero();
    expect(browser.getCurrentUrl()).toMatch('detail');
    await heroDetailPage.navigateBackFromDetailPage();
  });

  it('Checks detail page for navigation from top hero, search and heroes pages', async () => {

    const heroesPage = new HeroesPage();
    const name = await dashboardPage.getRandomTopHeroName();

    const heroObjectFromTopHero = await dashboardPage.getHeroObjectFromTopHero(name);

    await dashboardPage.searchHero(name);
    const heroObjectFromSearch = await heroDetailPage.getHeroObject();
    await heroDetailPage.navigateBackFromDetailPage();

    await dashboardPage.clickHeroesTab();
    const heroObjectFromHeroesList = await heroesPage.getViewDetailsObject(name);

    expect(await objectsAreEqual([heroObjectFromTopHero, heroObjectFromSearch, heroObjectFromHeroesList])).toBe(true);
  });

  it('Checks detail page title', async () => {
    const name = await dashboardPage.getRandomTopHeroName();
    const heroObjectFromTopHero = await dashboardPage.getHeroObjectFromTopHero(name);
    expect(heroObjectFromTopHero.title).toEqual(`${name} details!`);
  });
});

  function objectsAreEqual(arrayOfObjects) {
  let areEqual = true;
  for (let i = 1; i < arrayOfObjects.length; i++) {
    if (JSON.stringify(arrayOfObjects[i]) !== JSON.stringify(arrayOfObjects[0])) {
      areEqual = false;
      break;
    }
  }
  return areEqual;
}
