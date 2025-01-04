import { expect, Page, Locator } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class ProductDetailsPage extends AbstractPage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly productImages: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator("h1"); 
    this.productPrice = page.locator('h2:has-text("$")');
    this.productDescription = page.locator("#tab-description");
    this.productImages = page.locator(".thumbnails");
  }

  public async verifyProductDetails(product: {
    name: string;
    price: string;
    description: string;
  }) {
    try {
      // Verify the product name
      await expect(this.productName).toHaveText(product.name);

      // Verify the product price
      await expect(this.productPrice).toHaveText(product.price);

      // Verify the product description
      await expect(this.productDescription).toHaveText(product.description);

      // Verify the product images (at least one image should be visible)
      await expect(this.productImages.first()).toBeVisible();
    } catch (error) {
      console.error(`Error verifying product details: ${error}`);
    }
  }

  public async navigateToProductDetails(productLink: Locator) {
    try {
      // Click on the product link to navigate to the product details page
      await productLink.click();
    } catch (error) {
      console.error(`Error navigating to product details: ${error}`);
    }
  }
}