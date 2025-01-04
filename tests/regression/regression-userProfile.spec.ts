import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { UserProfilePage } from "../../page-objects/UserProfilePage";

test.describe("User Profile Regression Tests", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let userProfilePage: UserProfilePage;

  // Run before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    userProfilePage = new UserProfilePage(page);
    await homePage.navigateToHomePage();
    await loginPage.login("testautomation123@demo.com", "automation123");
  });

  test("Regression Test: Update user profile information", async () => {
    await userProfilePage.navigateToUserProfile();
    await userProfilePage.updateProfile(
      "NewFirstName",
      "NewLastName",
      "1234567890"
    );
    await userProfilePage.assertProfileUpdated();
  });
});
