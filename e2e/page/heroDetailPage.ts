import {by, element} from 'protractor';

const heroDetailTitle = element(by.css('my-hero-detail h2'));
const heroDetailId = element(by.xpath('//label[text()="id: "]/..'));
const heroDetailNameSection = element(by.xpath('//label[text()="name: "]/..'));
const heroDetailNameInput = element(by.css('my-hero-detail input'));
const backButton = element(by.xpath('//button[text()="Back"]'));
const saveButton = element(by.xpath('//button[text()="Save"]'));

export default class HeroDetailPage {

  async getHeroObject() {
    const name = await heroDetailNameInput.getAttribute('value');
    let id = await heroDetailId.getText();
    id = +id.substr(id.indexOf(' ') + 1);
    const title = await heroDetailTitle.getText();
    return {title, id, name}
  }

  async navigateBackFromDetailPage() {
    await backButton.click();
  }

  async checkHeroDetailsSectionIsDisplayed() {
    const idSectionIsDisplayed = await heroDetailId.isDisplayed();
    const nameSectionIsDisplayed = await heroDetailNameSection.isDisplayed();
    const backButtonIsDisplayed = await backButton.isDisplayed();
    const saveButtonIsDisplayed = await saveButton.isDisplayed()
    expect(idSectionIsDisplayed && nameSectionIsDisplayed && backButtonIsDisplayed && saveButtonIsDisplayed).toBe(true);
  }

  async fillNameInputField(name: string) {
    await heroDetailNameInput.clear();
    await heroDetailNameInput.sendKeys(name);
  }

  async fillNameAndSave(name: string) {
    await this.fillNameInputField(name);
    await saveButton.click();
  }

  async fillNameAndCancel(name: string) {
    await this.fillNameInputField(name);
    backButton.click();
  }
}
