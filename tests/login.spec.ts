import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/HomePage";
import { LoginPage } from "../page-objects/LoginPage";

test.describe("Login/Logout Flow", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  // Before each test, navigate to the home page and initialize LoginPage
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
  });

  // Test for successful login
  test("should log in successfully with correct credentials", async ({
    page,
  }) => {
    const validEmail = "testautomation123@demo.com";
    const validPassword = "automation123";

    // Act: Perform login
    await loginPage.logIn(validEmail, validPassword);

    // Assert: Verify success message
    await loginPage.assertSuccessMessage();
  });

  // Test for invalid login (incorrect email/password)
  test("should show error message when email/password are incorrect", async ({
    page,
  }) => {
    const invalidEmail = "invalid@example.com";
    const invalidPassword = "WrongPassword123";

    // Act: Perform login with incorrect credentials
    await loginPage.logIn(invalidEmail, invalidPassword);

    // Assert: Verify error message for incorrect login
    await loginPage.assertErrorMessage();
  });

  // Test for exceeding login attempts
  test("should show error message when all fields are empty", async ({
    page,
  }) => {
    const invalidEmail = ""; // Use any invalid credentials
    const invalidPassword = "";

    // Act: Try to login with invalid credentials multiple times to exceed login attempts
    await loginPage.logIn(invalidEmail, invalidPassword);
    await loginPage.logIn(invalidEmail, invalidPassword);
    await loginPage.logIn(invalidEmail, invalidPassword);

    // Assert: Verify message about exceeding login attempts
    await loginPage.assertErrorMessage();
  });
});
