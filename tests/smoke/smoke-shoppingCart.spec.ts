import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { ShoppingCartPage } from "../../page-objects/ShoppingCartPage";

let homePage: HomePage;
let shoppingCartPage: ShoppingCartPage;

test.describe("Add/Remove Item Cart Smoke Test", () => {
  // Run before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    await homePage.navigateToHomePage();
  });

  test("Should add a product to the cart and verify its presence", async ({
    page,
  }) => {
    const productName = "MacBook";

    // Add the product to the cart
    await shoppingCartPage.addProductToCartByName(productName);

    // Verify the success message appears
    await shoppingCartPage.assertSuccessMessageVisible();

    // Navigate to the cart page
    await shoppingCartPage.navigateToCartPage();

    // Assert the product is listed in the cart
    await shoppingCartPage.assertItemInCart(productName);
  });
  test("Should remove a product from the cart", async ({ page }) => {
    const productName = "MacBook";
    // Add the product to the cart
    await shoppingCartPage.addProductToCartByName(productName);
    shoppingCartPage.navigateToCartPage();

    // Remove the product from the cart
    await shoppingCartPage.removeItemFromCart(productName);

    // Verify the cart is empty or the product is no longer listed
    const cartItem = shoppingCartPage.cartItemsList.locator(
      `tr:has-text("${productName}")`
    );
    await expect(cartItem).toHaveCount(0);
  });
});
