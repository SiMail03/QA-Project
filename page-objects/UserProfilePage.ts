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
    try {
      await this.page.goto(
        "https://naveenautomationlabs.com/opencart/index.php?route=account/edit"
      );
    } catch (error) {
      console.error("Error navigating to user profile:", error);
      throw error;
    }
  }

  async updateProfile(firstName: string, lastName: string, telephone: string) {
    try {
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.fill(lastName);
      await this.telephoneInput.fill(telephone);
      await this.saveButton.click();
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }

  async assertProfileUpdated() {
    try {
      await expect(this.successMessage).toBeVisible();
    } catch (error) {
      console.error("Profile update success message not visible:", error);
      throw error;
    }
  }
}
