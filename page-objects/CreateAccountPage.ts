import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class CreateAccountPage extends AbstractPage {
  readonly myAccountButton: Locator;
  readonly url: string;
  readonly registerAccountLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly privacyPolicyButton: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly alreadyExistsMessage: Locator;
  readonly requiredFieldMissing: Locator;
  readonly invalidEmailError: Locator;
  readonly invalidTelephoneError: Locator; // New error locator for invalid telephone

  constructor(page: Page) {
    super(page);
    this.myAccountButton = page.locator(
      'a[href="https://naveenautomationlabs.com/opencart/index.php?route=account/account"][title="My Account"].dropdown-toggle'
    );
    this.registerAccountLink = page.locator("text=Register");
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.emailInput = page.getByPlaceholder("E-Mail");
    this.telephoneInput = page.getByPlaceholder("Telephone"); // Locator for telephone
    this.passwordInput = page.getByPlaceholder("Password", { exact: true });
    this.confirmPasswordInput = page.getByPlaceholder("Password Confirm");
    this.privacyPolicyButton = page.getByRole("checkbox");
    this.submitButton = page.locator(".btn.btn-primary");
    this.successMessage = page.locator("#content");
    this.alreadyExistsMessage = page.getByText("Warning: E-Mail Address is");

    this.requiredFieldMissing = page.locator(
      ".alert.alert-danger.alert-dismissible"
    );
    this.invalidEmailError = page.locator(
      "text=Please include an '@' in the email address."
    );
    this.invalidTelephoneError = page.locator("text=Telephone is required!");
  }

  async createAccount(
    firstname: string,
    lastname: string,
    email: string,
    telephone: string,
    password: string
  ) {
    await this.myAccountButton.click();
    await this.registerAccountLink.click();
    await this.firstNameInput.fill(firstname);
    await this.lastNameInput.fill(lastname);
    await this.emailInput.fill(email);
    await this.telephoneInput.fill(telephone); // Fill telephone input
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password); // Added password confirmation
    await this.privacyPolicyButton.click();
    this.submitButton.click(); // Click the submit button
    await this.page.waitForTimeout(3000); // Timeout in milliseconds (3000ms = 3 seconds)
  }

  async assertSuccessMessage() {
    await expect(this.successMessage).toContainText(
      "Your Account Has Been Created!"
    );
  }

  async assertAlreadyExistsError() {
    await expect(this.alreadyExistsMessage).toContainText(
      "Warning: E-Mail Address is already registered!"
    );
  }

  async assertInvalidEmailError() {
    await expect(this.invalidEmailError).toContainText(
      "Please include an '@' in the email address."
    );
  }

  async assertInvalidTelephoneError() {
    await expect(this.invalidTelephoneError).toContainText(
      "Telephone is required!" // Adjust the message for telephone validation
    );
  }

  async assertRequiredFieldMissing() {
    await expect(this.requiredFieldMissing).toContainText(
      "Warning: First Name is required!" // Adjust message based on the actual required field message
    );
  }
}
