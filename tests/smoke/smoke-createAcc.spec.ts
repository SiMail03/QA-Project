import test from "@playwright/test";
import { CreateAccountPage } from "../../page-objects/CreateAccountPage";
import { HomePage } from "../../page-objects/HomePage";

test("Smoke Test: Create Account - Positive Path", async ({ page }) => {
  const homePage = new HomePage(page);
  const createAccountPage = new CreateAccountPage(page);

  // Navigate to the homepage and create a new account
  await homePage.navigateToHomePage();
  await createAccountPage.createAccount(
    "John",
    "Doe",
    `johndoe${Date.now()}@example.com`, // Unique email to avoid conflicts
    "1234567890",
    "SecurePass123"
  );

  // Assert success message
  await createAccountPage.assertSuccessMessage();
});
