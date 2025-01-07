import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
require("dotenv").config();

test("Smoke Test: Login and Logout - Positive Path", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const email = "testautomation123@demo.com";
  const password = "automation123";

  // Navigate to Home Page
  await homePage.navigateToHomePage();

  // Perform login
  await loginPage.login(email, password);
  await loginPage.assertSuccessMessage();

  // Perform logout
  await loginPage.logout();
  await loginPage.assertLogout();
});
