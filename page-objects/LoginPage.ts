import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage {
  readonly myAccountButton: Locator;
  readonly loginAccountLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly successMessage: Locator;
  readonly invalidCredentialsErrorMessage: Locator;
  readonly exceededLoginAttemptErrorMessage: Locator;
  readonly logoutLink: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.myAccountButton = page.locator(
      'a[href="https://naveenautomationlabs.com/opencart/index.php?route=account/account"][title="My Account"].dropdown-toggle'
    );
    this.loginAccountLink = page.locator(
      '.dropdown-menu.dropdown-menu-right a:has-text("Login")'
    );

    this.emailInput = page.locator("#input-email");
    this.passwordInput = page.locator("#input-password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.successMessage = page.getByText("Edit your account information");
    this.invalidCredentialsErrorMessage = page.getByText(
      "Warning: No match for E-Mail Address and/or Password"
    );
    this.exceededLoginAttemptErrorMessage = page.getByText(
      "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
    );
    this.logoutLink = page.locator(
      '.dropdown-menu.dropdown-menu-right a:has-text("Logout")'
    );
    this.logoutButton = page.locator(".btn.btn-primary");
  }

  async login(email: string, password: string) {
    await this.myAccountButton.click();
    await this.loginAccountLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    await this.page.waitForTimeout(3000); // Timeout in milliseconds (3000ms = 3 seconds)
  }

  async logout() {
    await this.myAccountButton.click();
    await this.logoutLink.click();
    await this.logoutButton.click();
  }

  async assertLogout() {
    const currentUrl = this.page.url();
    await expect(currentUrl).toBe(
      "https://naveenautomationlabs.com/opencart/index.php?route=common/home"
    );
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toContainText(
      "Edit your account information"
    );
  }

  async assertErrorMessage() {
    const errorMessage1Visible =
      await this.invalidCredentialsErrorMessage.isVisible();
    const errorMessage2Visible =
      await this.exceededLoginAttemptErrorMessage.isVisible();

    expect(
      errorMessage1Visible || errorMessage2Visible,
      "Expected either error message 1 or error message 2 to be visible."
    ).toBeTruthy();
  }

  async assertExceededLoginAttemptsError() {
    await expect(this.exceededLoginAttemptErrorMessage).toHaveText(
      "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
    );
  }

  async exceededLoginAttempts(email: string, password: string) {
    await this.myAccountButton.click();
    await this.loginAccountLink.click();
    const invalidUsername = "invalidUser";
    const invalidPassword = "invalidPassword";
    const maxAttempts = 5;
    for (let i = 0; i < maxAttempts; i++) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
    await this.page.waitForTimeout(2000); // Timeout in milliseconds (3000ms = 3 seconds)
  }
}
