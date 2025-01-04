// Import required libraries and page classes
import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

// Smoke Test: Load Home Page
test("Smoke Test: Verify Home Page Loads Correctly", async ({ page }) => {
  const homePage = new HomePage(page);

  // Navigate to the home page
  await homePage.navigateToHomePage();

  // Check if all critical elements are visible
  await homePage.checkHomePage();
});