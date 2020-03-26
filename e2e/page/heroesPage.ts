import HeroDetailPage from '../page/heroDetailPage'
import {browser, by, element, protractor} from 'protractor';

const viewDetailsButton = element(by.xpath('//button[text()="View Details"]'));
const addNewHeroButton = element(by.xpath('//button[text()="Add New Hero"]'));
const deleteHeroButton = element(by.xpath('//button[@class="delete-button"]'));
const title = element(by.css('my-heroes h2'));
const heroes = element.all(by.css('ul.heroes li'));
const heroesIdNames = element.all(by.css('.hero-element'));
const dashboardTab = element(by.linkText('Dashboard'));

const EC = protractor.ExpectedConditions;

export default class HeroesPage {

  open() {
    return browser.get('/heroes');
  }

  async selectHeroByName(name: string) {
    const heroElement = element(by.xpath(`//ul[@class="heroes"]//span[contains(text(), "${name}")]`));
    await heroElement.click();
  }

  async getViewDetailsObject(name: string) {
    const heroDetailPage = new HeroDetailPage();
    await this.selectHeroByName(name);
    await viewDetailsButton.click();
    const HeroObject = await heroDetailPage.getHeroObject();
    await heroDetailPage.navigateBackFromDetailPage();
    return HeroObject;
  }

  getHeroesPageTitleText() {
    return title.getText();
  }

  async getRandomHeroName() {
    const names = await this.getListOfHeroesNames();
    const length = names.length;
    const randomHeroIndex = getRandomNumberOf(length);
    return names[randomHeroIndex];
  }

  async getListOfHeroesLength() {
    return await heroes.count();
  }

  checkAddNewHeroButtonIsDisplayed() {
    return addNewHeroButton.isDisplayed();
  }

  async addNewHero(name: string) {
    const heroDetailPage = new HeroDetailPage();
    await addNewHeroButton.click();
    await heroDetailPage.checkHeroDetailsSectionIsDisplayed();
    await heroDetailPage.fillNameAndSave(name);
  }

  async updateHero(nameBefore: string, nameAfter: string) {
    const heroDetailPage = new HeroDetailPage();
    await this.selectHeroByName(nameBefore);
    await viewDetailsButton.click();
    await heroDetailPage.checkHeroDetailsSectionIsDisplayed();
    await heroDetailPage.fillNameAndSave(nameAfter);
  }

  async updateAndCancelNewHero(nameBefore: string, nameAfter: string) {
    const heroDetailPage = new HeroDetailPage();
    await this.selectHeroByName(nameBefore);
    await viewDetailsButton.click();
    await heroDetailPage.checkHeroDetailsSectionIsDisplayed();
    await heroDetailPage.fillNameAndCancel(nameAfter);
  }

  async getListOfHeroesNames() {
    browser.wait(EC.visibilityOf(heroes.first()), 5000);
    const idAndNamesList = await heroesIdNames.getText();
    return idAndNamesList.map(item => item.substr(item.indexOf(' ') + 1))
  }

  async addAndCancelNewHero(name: string) {
    const heroDetailPage = new HeroDetailPage();
    await addNewHeroButton.click();
    await heroDetailPage.checkHeroDetailsSectionIsDisplayed();
    await heroDetailPage.fillNameAndCancel(name);
  }

  async deleteHeroByName(name: string) {
    const deleteHeroButtonByName = element(by.xpath(`//ul[@class="heroes"]//span[contains(text(), "${name}")]/../button[@class="delete-button"]`))
    await deleteHeroButtonByName.click();
  }

  async clickDashboardTab() {
    await dashboardTab.click();
  }

  async deleteFirstHeroInList() {
    await deleteHeroButton.click();
  }
}

function getRandomNumberOf(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
