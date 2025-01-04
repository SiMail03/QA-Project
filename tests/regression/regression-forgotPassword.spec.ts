import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { ResetPasswordPage } from '../../page-objects/ResetPasswordPage';

let homePage: HomePage;

test.describe('Forgot Password Regression Test', () => {
  // Run before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test('Should successfully send reset password email for valid email', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const resetPasswordPage = new ResetPasswordPage(page);

    // Navigate to Forgot Password
    await loginPage.myAccountButton.click();
    await loginPage.loginAccountLink.click();
    await resetPasswordPage.forgotPasswordLink.click();

    // Enter valid email and submit
    const validEmail = 'software@requirements.com';
    await resetPasswordPage.emailInput.fill(validEmail);
    await resetPasswordPage.submitButton.click();

    // Assert success message is visible
    await resetPasswordPage.assertSuccessMessageVisible();
  });
  test('Warning: The E-Mail Address was not found in our records, please try again!', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const resetPasswordPage = new ResetPasswordPage(page);

    // Navigate to Forgot Password
    await loginPage.myAccountButton.click();
    await loginPage.loginAccountLink.click();
    await resetPasswordPage.forgotPasswordLink.click();

    // Enter invalid email and submit
    const invalidEmail = 'software@re.com';
    await resetPasswordPage.emailInput.fill(invalidEmail);
    await resetPasswordPage.submitButton.click();

    // Assert error message is visible
    await resetPasswordPage.assertErrorMessageVisible();
  });
});
