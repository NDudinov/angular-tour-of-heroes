import HeroDetailPage from '../page/heroDetailPage'
import {browser, by, element, protractor} from 'protractor';

const title = element(by.css('my-root h1'));
const topHeroesTitle = element(by.css('my-dashboard h3'));
const dashboardTabs = element.all(by.css('nav a'));
const heroesTab = element(by.linkText('Heroes'));
const dashboardTab = element(by.linkText('Dashboard'));
const heroSearchTitle = element(by.css('#search-component h4'));
const heroSearchInput = element(by.id('search-box'));
const topHeroes = element.all(by.css('div.module.hero h4'));
const searchSuggestions = element.all(by.css('div.search-result'));

const EC = protractor.ExpectedConditions;

export default class DashboardPage {

  open() {
    return browser.get('/');
  }

  getDashboardPageTitleText() {
    return title.getText();
  }

  getTopHeroesTitleText() {
    return topHeroesTitle.getText();
  }

  getTabsNames() {
    return dashboardTabs.getText();
  }

  getTopHeroesListLength() {
    return topHeroes.count();
  }

  getHeroSearchTitleText() {
    return heroSearchTitle.getText();
  }

  checkHeroSearchInputIsDisplayed() {
    return heroSearchInput.isDisplayed();
  }

  async getRandomTopHeroName() {
    let length = await this.getTopHeroesListLength()
    let randomHeroIndex = getRandomNumberOf(length);
    return topHeroes.get(randomHeroIndex).getText();
  }

  async selectTopHero(name: string) {
    name = name || await this.getRandomTopHeroName();
    return topHeroes
      .filter((elem) => elem.getText()
        .then(text => text === name))
      .first().click();
  }

  async getHeroObjectFromTopHero(name: string) {
    let heroDetailPage = new HeroDetailPage();
    await this.selectTopHero(name);
    let HeroObject = await heroDetailPage.getHeroObject();
    await heroDetailPage.navigateBackFromDetailPage();
    return HeroObject;
  }

  async searchHero(name: string) {
    await this.fillSearchInput(name);
    await searchSuggestions.first().click();
  }

  async clickHeroesTab() {
    await heroesTab.click();
  }

  async clickDashboardTab() {
    await dashboardTab.click();
  }

  async fillSearchInput(inputText) {
    await heroSearchInput.sendKeys(inputText);
  }

  async searchSuggestionsForNameAreDisplayed(name: string) {
    const suggestions = await searchSuggestions.count();
    expect(suggestions).toBeGreaterThan(0);
    const suggestionsIncludeName = await searchSuggestions.filter((elem) =>
      elem.getText()
        .then(text => text.toLowerCase().indexOf(name.toLowerCase() != -1)))
      .count();
    return suggestions === suggestionsIncludeName;
  }

  async getListOfTopHeroesNames() {
    browser.wait(EC.visibilityOf(topHeroes.first()), 5000);
    const topHeroesNames = await topHeroes.getText();
    return topHeroesNames;
  }
}

function getRandomNumberOf(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
