import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
require("dotenv").config();

test("Smoke Test: Login and Logout - Positive Path", async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const email = process.env.TEST_EMAIL || "";
  const password = process.env.TEST_PASSWORD || "";

  // Navigate to Home Page
  await homePage.navigateToHomePage();

  // Perform login
  await loginPage.login(email, password);
  await loginPage.assertSuccessMessage();

  // Perform logout
  await loginPage.logout();
  await loginPage.assertLogout();
});
