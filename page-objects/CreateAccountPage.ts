import { expect, Locator, Page } from "@playwright/test";
import { LoadComponentsReturnType } from "next/dist/server/load-components";
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
  readonly privacyPolicyErrorMessage: Locator;
  readonly invalidFirstName: Locator;
  readonly invalidLastName: Locator;
  readonly invalidEmail1: Locator;
  readonly invalidEmail2: Locator;
  readonly invalidPhoneNumber: Locator;
  readonly invalidPassword: Locator;
  readonly invalidConfirmPassword: Locator;

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
    this.privacyPolicyButton = page.locator(
      'input[type="checkbox"][name="agree"][value="1"]'
    );
    this.submitButton = page.locator(".btn.btn-primary");
    this.successMessage = page.locator("#content");
    this.alreadyExistsMessage = page.getByText("Warning: E-Mail Address is");
    this.privacyPolicyErrorMessage = page.getByText(
      "Warning: You must agree to the Privacy Policy!"
    );

    this.invalidFirstName = page.getByText(
      "First Name must be between 1 and 32 characters!"
    );

    this.invalidLastName = page.locator("div.text-danger", {
      hasText: "Last Name must be between 1 and 32 characters!",
    });
    this.invalidEmail1 = page.locator("div.text-danger", {
      hasText: "E-Mail Address does not appear to be valid!",
    });
    this.invalidEmail2 = page.locator("div.text-danger", {
      hasText: "Please include an '@' in the email address.",
    });
    this.invalidPhoneNumber = page.locator("div.text-danger", {
      hasText: "Telephone must be between 3 and 32 characters!",
    });
    this.invalidPassword = page.locator("div.text-danger", {
      hasText: "Password must be between 4 and 20 characters!",
    });
    this.invalidConfirmPassword = page.locator("div.text-danger", {
      hasText: "Password confirmation does not match password!",
    });
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

  async assertInvalidFirstName() {
    await expect(this.invalidFirstName).toContainText(
      "First Name must be between 1 and 32 characters!"
    );
  }

  async assertInvalidFields() {
    // Wait for any potential error messages to appear
    await this.page.waitForTimeout(1000);

    // Check visibility of all error messages
    const errorMessage1Visible = await this.invalidFirstName.isVisible();
    const errorMessage2Visible = await this.invalidLastName.isVisible();
    const errorMessage3Visible = await this.invalidEmail1.isVisible();
    const errorMessage4Visible = await this.invalidEmail2.isVisible();
    const errorMessage5Visible = await this.invalidPhoneNumber.isVisible();
    const errorMessage6Visible = await this.invalidPassword.isVisible();
    const errorMessage7Visible = await this.invalidConfirmPassword.isVisible();

    // Log visibility for debugging
    console.log({
      errorMessage1Visible,
      errorMessage2Visible,
      errorMessage3Visible,
      errorMessage4Visible,
      errorMessage5Visible,
      errorMessage6Visible,
      errorMessage7Visible,
    });

    // Assert that at least one error message is visible
    expect(
      errorMessage1Visible ||
        errorMessage2Visible ||
        errorMessage3Visible ||
        errorMessage4Visible ||
        errorMessage5Visible ||
        errorMessage6Visible ||
        errorMessage7Visible
    ).toBeTruthy();
  }

  async assertPrivacyPolicyError() {
    await expect(this.privacyPolicyErrorMessage).toContainText(
      "Warning: You must agree to the Privacy Policy!"
    );
  }
}
