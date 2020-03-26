import DashboardPage from '../page/dashboardPage'
import HeroDetailPage from '../page/heroDetailPage'
import HeroesPage from '../page/heroesPage';
import {browser} from 'protractor';

describe('Dashboard page tests', () => {

  const tabsNames = ['Dashboard', 'Heroes'];
  let dashboardPage;

  beforeEach(() => {
    dashboardPage = new DashboardPage();
    dashboardPage.open();
  });

  it('Checks Dashboard title is correct', () => {
    expect(dashboardPage.getDashboardPageTitleText()).toEqual('Tour of Heroes');
  });

  it('Checks Dashboard tabs are present', () => {
    expect(dashboardPage.getTabsNames()).toEqual(tabsNames);
  });

  it('Checks Top Heroes title is correct', () => {
    expect(dashboardPage.getTopHeroesTitleText()).toEqual('Top Heroes');
  });

  it('Checks Top Heroes list is not empty', () => {
    expect(dashboardPage.getTopHeroesListLength()).toBeGreaterThan(0);
  });

  it('Checks Hero Search title is correct', () => {
    expect(dashboardPage.getHeroSearchTitleText()).toEqual('Hero Search');
  });

  it('Checks Hero Search input is displayed', () => {
    expect(dashboardPage.checkHeroSearchInputIsDisplayed()).toBe(true);
  });

  it('Checks search suggestions are correct', async () => {
    const heroName = await dashboardPage.getRandomTopHeroName();
    await dashboardPage.fillSearchInput(heroName);
    expect(await dashboardPage.searchSuggestionsForNameAreDisplayed(heroName)).toBe(true);
  });

  it('Checks search navigates to correct hero detail page', async () => {
    const heroDetailPage = new HeroDetailPage();
    const name = await dashboardPage.getRandomTopHeroName();
    await dashboardPage.searchHero(name);
    const heroObjectFromSearch = await heroDetailPage.getHeroObject();
    expect(browser.getCurrentUrl()).toMatch(`detail/${heroObjectFromSearch.id}`);
  });

  it('Checks navigation to heroes tab', async () => {
    await dashboardPage.clickHeroesTab();
    expect(browser.getCurrentUrl()).toMatch('/heroes');
  });

  it('Checks deleted top hero is removed from Dashboard page', async () => {
    const heroesPage = new HeroesPage();
    const name = await dashboardPage.getRandomTopHeroName();
    heroesPage.open();
    await heroesPage.deleteHeroByName(name);
    heroesPage.clickDashboardTab();
    const listOfHeroes = await dashboardPage.getListOfTopHeroesNames();
    expect(listOfHeroes).not.toContain(name);
  });
});



