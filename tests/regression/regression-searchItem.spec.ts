import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test.describe("Search Regression Tests", () => {
  let homePage: HomePage;

  // Run before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test("Regression Test: Valid search results are displayed", async () => {
    await homePage.searchItem("Mac");
    await homePage.assertSearchResultsAreDisplayed();
    await homePage.assertNumberOfSearchResults("Showing 1 to 4 of 4");
  });

  test("Regression Test: Invalid search displays no results message", async () => {
    await homePage.searchItem("NonExistentItem123");
    await homePage.assertNoItemFoundMessage();
  });

  test("Regression Test: Partial matches return correct results", async () => {
    await homePage.searchItem("Ma");
    await homePage.assertProductInSearchResults("Ma")
  });

  test("Regression Test: Special characters in search", async () => {
    await homePage.searchItem("@#$%^&*");
    await homePage.assertNoItemFoundMessage();
  });

  test("Regression Test: Search bar retains input after search", async () => {
    const searchTerm = "Mac";
    await homePage.searchItem(searchTerm);
    await homePage.assertSearchBarContains(searchTerm);
  });
});