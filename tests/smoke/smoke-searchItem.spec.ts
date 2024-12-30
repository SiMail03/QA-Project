import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test("Smoke Test: Basic search functionality", async ({ page }) => {
  const homePage = new HomePage(page);

  // Navigate to Home Page
  await homePage.navigateToHomePage();

  // Perform a search
  await homePage.searchItem("Mac");

  // Product matches Search input
  await homePage.assertProductInSearchResults("Mac");

  // Validate that results are displayed
  await homePage.assertSearchResultsAreDisplayed();
});
