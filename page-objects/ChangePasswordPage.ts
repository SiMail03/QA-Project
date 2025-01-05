import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class ChangePasswordPage extends AbstractPage {
  readonly navigateToChangePassword: Locator;
  readonly inputNewPassword: Locator;
  readonly inputConfirmNewPassword: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly failureMessage: Locator;
  readonly passwordMismatchError: Locator;
  readonly emptyFieldsError: Locator;

  constructor(page: Page) {
    super(page);
    this.navigateToChangePassword = page.locator(
      'a[href="https://naveenautomationlabs.com/opencart/index.php?route=account/password"]'
    );
    this.inputNewPassword = page.locator('input[name="password"]');
    this.inputConfirmNewPassword = page.locator('input[name="confirm"]');
    this.submitButton = page.locator(".btn.btn-primary");
    this.successMessage = page.locator(
      "text=Success: Your password has been successfully updated."
    );
    this.passwordMismatchError = page.locator(
      "text=Password confirmation does not match password!"
    );
    this.emptyFieldsError = page.locator(
      "text=Password must be between 4 and 20 characters!"
    );
  }

  async navigateToChangePasswordPage() {
    await this.navigateToChangePassword.click();
  }

  async changePassword(newPassword: string, confirmNewPassword: string) {
    await this.inputNewPassword.fill(newPassword);
    await this.inputConfirmNewPassword.fill(confirmNewPassword);
    await this.submitButton.click();
  }

  async assertPasswordChangeSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async assertPasswordMismatchError() {
    await expect(this.passwordMismatchError).toBeVisible();
  }

  async assertEmptyFieldsError() {
    await expect(this.emptyFieldsError).toBeVisible();
  }
}
