import test from "@playwright/test";
import { CreateAccountPage } from "../../page-objects/CreateAccountPage";
import { HomePage } from "../../page-objects/HomePage";

test("Smoke Test: Create Account - Positive Path", async ({ page }) => {
  const homePage = new HomePage(page);
  const createAccountPage = new CreateAccountPage(page);

  // Navigate to the homepage
  await homePage.navigateToHomePage();

  // Create a new account with unique email to avoid conflicts
  await createAccountPage.createAccount(
    "John",
    "Doe",
    `johndoe${Date.now()}@example.com`,
    "1234567890",
    "SecurePass123"
  );

  // Assert that the success message is displayed
  await createAccountPage.assertSuccessMessage();
});
