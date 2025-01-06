import { expect, Locator, Page } from "@playwright/test";

export class ResetPasswordPage {
  readonly page: Page;
  readonly myAccountButton: Locator;
  readonly loginAccountLink: Locator;
  readonly forgotPasswordLink: Locator;

  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccountButton = page.locator(
      'a[href="https://naveenautomationlabs.com/opencart/index.php?route=account/account"][title="My Account"].dropdown-toggle'
    );
    this.loginAccountLink = page.locator(
      '.dropdown-menu.dropdown-menu-right a:has-text("Login")'
    );
    this.forgotPasswordLink = page.locator(
      'div.form-group a[href="https://naveenautomationlabs.com/opencart/index.php?route=account/forgotten"]'
    );
    this.emailInput = page.locator("#input-email");
    this.submitButton = page.locator(".btn.btn-primary");
    this.successMessage = page.locator(
      "text=An email with a confirmation link has been sent your email address."
    );
    this.errorMessage = page.locator(
      "text=Warning: The E-Mail Address was not found in our records, please try again!"
    );
  }

  async resetForgottenPassword(email: string) {
    try {
      await this.myAccountButton.click();
      await this.loginAccountLink.click();
      await this.forgotPasswordLink.click();
      await this.emailInput.fill(email);
      await this.submitButton.click();
    } catch (error) {
      console.error("Error during resetting forgotten password:", error);
      throw error;
    }
  }

  async assertSuccessMessageVisible() {
    try {
      await expect(this.successMessage).toBeVisible();
    } catch (error) {
      console.error("Success message not visible:", error);
      throw error;
    }
  }

  async assertErrorMessageVisible() {
    try {
      await expect(this.errorMessage).toBeVisible();
    } catch (error) {
      console.error("Error message not visible:", error);
      throw error;
    }
  }
}
