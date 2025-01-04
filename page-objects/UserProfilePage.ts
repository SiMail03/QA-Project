import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class UserProfilePage extends AbstractPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly telephoneInput: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.telephoneInput = page.getByPlaceholder("Telephone");
    this.saveButton = page.locator(".btn.btn-primary");
    this.successMessage = page.locator(".alert.alert-success");
  }

  async navigateToUserProfile() {
    await this.page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/edit");
  }

  async updateProfile(firstName: string, lastName: string, telephone: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.telephoneInput.fill(telephone);
    await this.saveButton.click();
  }

  async assertProfileUpdated() {
    await expect(this.successMessage).toBeVisible();
  }
}
