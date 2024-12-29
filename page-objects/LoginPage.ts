import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage {
  readonly myAccountButton: Locator;
  readonly loginAccountLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage1: Locator;
  readonly errorMessage2: Locator;

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
    this.errorMessage1 = page.getByText(
      "Warning: No match for E-Mail Address and/or Password"
    );
    this.errorMessage2 = page.getByText(
      "Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."
    );
  }

  async logIn(email: string, password: string) {
    await this.myAccountButton.click();
    await this.loginAccountLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForTimeout(3000); // Timeout in milliseconds (3000ms = 3 seconds)
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toContainText(
      "Edit your account information"
    );
  }

  async assertErrorMessage() {
    const errorMessage1Visible = await this.errorMessage1.isVisible();
    const errorMessage2Visible = await this.errorMessage2.isVisible();

    expect(
      errorMessage1Visible || errorMessage2Visible,
      "Expected either error message 1 or error message 2 to be visible."
    ).toBeTruthy();
  }
}
