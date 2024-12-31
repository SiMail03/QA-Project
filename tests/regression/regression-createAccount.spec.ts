import { test, expect } from "@playwright/test";
import { CreateAccountPage } from "../../page-objects/CreateAccountPage";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Create Account Regression Tests", () => {
  let createAccountPage: CreateAccountPage;
  let homePage: HomePage;

  // Run before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    createAccountPage = new CreateAccountPage(page);
    await homePage.navigateToHomePage();
  });

  test("Show error when email already exists", async () => {
    const existingEmail = "test@gmail.com"; // Replace with an actual registered email
    await createAccountPage.createAccount(
      "John",
      "Doe",
      existingEmail,
      "1234567890",
      "Password123"
    );
    await createAccountPage.assertAlreadyExistsError();
  });

  test("Show error for invalid first name", async () => {
    await createAccountPage.createAccount(
      "",
      "Doe",
      `user${Date.now()}@example.com`,
      "1234567890",
      "Password123"
    );
    await createAccountPage.assertInvalidFields();
  });

  test("Show error for invalid last name", async () => {
    await createAccountPage.createAccount(
      "John",
      "",
      `user${Date.now()}@example.com`,
      "1234567890",
      "Password123"
    );
    await createAccountPage.assertInvalidFields();
  });

  test("Show error for invalid email format", async () => {
    await createAccountPage.createAccount(
      "John",
      "Doe",
      "",
      "1234567890",
      "Password123"
    );
    await createAccountPage.assertInvalidFields();
  });

  test("Show error for missing privacy policy agreement", async () => {
    await createAccountPage.createAccountWithoutPrivacyPolicy(
      "John",
      "Doe",
      `user${Date.now()}@example.com`,
      "1234567890",
      "Password123"
    );
    await createAccountPage.assertPrivacyPolicyError();
  });

  test("Show error for password mismatch", async () => {
    await createAccountPage.createAccount(
      "John",
      "Doe",
      "",
      "1234567890",
      "Password123"
    );
    await createAccountPage.assertInvalidFields();
  });
});
