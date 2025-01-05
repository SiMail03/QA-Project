import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { UserProfilePage } from "../../page-objects/UserProfilePage";
import { ChangePasswordPage } from "../../page-objects/ChangePasswordPage";

test.describe("Change Password Regression Tests", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let userProfilePage: UserProfilePage;
  let changePasswordPage: ChangePasswordPage;

  // Run before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    userProfilePage = new UserProfilePage(page);
    changePasswordPage = new ChangePasswordPage(page);
    await homePage.navigateToHomePage();
    await loginPage.login("testautomation123@demo.com", "automation123");
  });

  test("Regression Test: Change password with valid data", async () => {
    await userProfilePage.navigateToUserProfile();
    await changePasswordPage.navigateToChangePasswordPage();
    await changePasswordPage.changePassword("automation123", "automation123");
    await changePasswordPage.assertPasswordChangeSuccess();
  });

  test("Regression Test: Change password with mismatched new passwords", async () => {
    await userProfilePage.navigateToUserProfile();
    await changePasswordPage.navigateToChangePasswordPage();
    await changePasswordPage.changePassword(
      "newpassword123",
      "differentpassword123"
    );
    await changePasswordPage.assertPasswordMismatchError();
  });

  test("Regression Test: Change password with empty fields", async () => {
    await userProfilePage.navigateToUserProfile();
    await changePasswordPage.navigateToChangePasswordPage();
    await changePasswordPage.changePassword("", "");
    await changePasswordPage.assertEmptyFieldsError();
  });
});
