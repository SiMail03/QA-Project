import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { WishlistPage } from "../../page-objects/WishlistPage";

test.describe("Wishlist Regression Tests", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let wishlistPage: WishlistPage;

  // Run before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    wishlistPage = new WishlistPage(page);
    await homePage.navigateToHomePage();
    await loginPage.login("testautomation123@demo.com", "automation123");
  });

  test("Regression Test: Add item to wishlist", async () => {
    await homePage.searchItem("MacBook");
    await wishlistPage.addItemToWishlist("MacBook");
    await wishlistPage.assertItemInWishlist("MacBook");
  });

  test("Regression Test: Remove item from wishlist", async () => {
    await wishlistPage.removeItemFromWishlist("MacBook");
    await wishlistPage.assertItemNotInWishlist("MacBook");
  });
});
