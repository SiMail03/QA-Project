import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe("LogIn Regression Tests", () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
 
  // Run before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.navigateToHomePage();
  });

test("Regression Test: Invalid credentials - Negative Paths", async ({ page }) => {

  // Test 1: Invalid credentials
  await loginPage.login("invalidemail@example.com", "InvalidPassword123");
  await loginPage.assertErrorMessage();
});
  test("Regression Test: Exceeded login attempts - Negative Paths", async ({ page }) => {

  // Test 2: Exceeded login attempts
  await loginPage.exceededLoginAttempts("invalidemail@example.com", "InvalidPassword123");
  await loginPage.assertExceededLoginAttemptsError();
});
});
