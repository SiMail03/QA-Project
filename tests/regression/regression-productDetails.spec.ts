// Test: Search for a product and verify its details
import { test, expect } from "@playwright/test";
import { ProductDetailsPage } from "../../page-objects/ProductDetailsPage";
import { HomePage } from "../../page-objects/HomePage";

test("Product Details Page Test", async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailsPage = new ProductDetailsPage(page);

  // Constants
  const searchQuery = "MacBook Air";
  const expectedProduct = {
    name: "MacBook Air",
    price: "$1,202.00",
    description:
      "MacBook Air is ultrathin, ultraportable, and ultra unlike anything else. But you don’t lose inches and pounds overnight. It’s the result of rethinking conventions. Of multiple wireless innovations. And of breakthrough design. With MacBook Air, mobile computing suddenly has a new standard.",
  };

  // Step 1: Navigate to homepage
  await homePage.navigateToHomePage();

  // Step 2: Search for a product
  await homePage.searchItem(searchQuery);

  // Step 3: Click on the first product from the search results
  const productLink = await homePage.getProductLinkByName(searchQuery);
  await productDetailsPage.navigateToProductDetails(productLink);

  // Step 4: Verify product details
  await productDetailsPage.verifyProductDetails(expectedProduct);
});
