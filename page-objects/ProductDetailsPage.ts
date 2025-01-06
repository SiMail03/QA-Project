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

  /**
   * Verifies the product details on the page.
   * @param product - An object containing the product's name, price, and description.
   */
  public async verifyProductDetails(product: {
    name: string;
    price: string;
    description: string;
  }) {
    // Verify the product name
    await expect(this.productName).toHaveText(product.name);

    // Verify the product price
    await expect(this.productPrice).toHaveText(product.price);

    // Verify the product description
    await expect(this.productDescription).toHaveText(product.description);

    // Verify the product images (at least one image should be visible)
    await expect(this.productImages.first()).toBeVisible();
  }

  /**
   * Navigates to the product details page by clicking on the product link.
   * @param productLink - The locator for the product link.
   */
  public async navigateToProductDetails(productLink: Locator) {
    // Click on the product link to navigate to the product details page
    await productLink.click();
  }
}
