import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";

test("Smoke Test: Login and Logout - Positive Path", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  // Navigate to Home Page
  await homePage.navigateToHomePage();

  // Perform login
  await loginPage.login("testautomation123@demo.com", "automation123");
  await loginPage.assertSuccessMessage();

  // Perform logout
  await loginPage.logout();
  await loginPage.assertLogout();
});
