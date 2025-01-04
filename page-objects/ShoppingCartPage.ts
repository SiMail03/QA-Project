import { expect, Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartItemsList: Locator;
  readonly checkoutButton: Locator;
  readonly removeItemButton: Locator;
  readonly cartTotal: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly addToCartButton: Locator;
  readonly productLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator(
      'ul.list-inline a[href="https://naveenautomationlabs.com/opencart/index.php?route=checkout/cart"]'
    );

    this.addToCartButton = this.page.locator("#button-cart");
    this.cartItemsList = page.locator(".table.table-bordered tbody");
    this.checkoutButton = page.locator("text=Checkout");
    this.removeItemButton = page.locator(".btn.btn-danger");
    this.cartTotal = page.locator(".text-right .total");
    this.successMessage = page.locator(
      ".alert.alert-success.alert-dismissible"
    );
    this.productLinks = page.locator(".product-thumb a");
  }

  async addProductToCartByName(nameOfProduct: string) {
    const productLink = this.productLinks.locator(`text=${nameOfProduct}`);
    await expect(this.cartLink).toBeVisible();
    await productLink.click();
    await this.addToCartButton.click();
  }

  async navigateToCartPage() {
    await expect(this.cartLink).toBeVisible();
    await this.cartLink.click();
  }

  async assertItemInCart(productName: string) {
    const cartItem = this.cartItemsList.locator(
      `tr:has-text("${productName}")`
    );
    await expect(cartItem).toBeVisible();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async removeItemFromCart(productName: string) {
    const productRow = this.cartItemsList.locator(
      `tr:has-text("${productName}")`
    );
    const removeButton = productRow.locator(".btn-danger");
    await removeButton.click();
  }

  async assertSuccessMessageVisible() {
    await expect(this.successMessage).toBeVisible();
  }
}
