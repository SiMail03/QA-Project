import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class WishlistPage extends AbstractPage {
  readonly navigateToWishlist: Locator;
  readonly wishlistTable: Locator;
  readonly addToWishlistButton: Locator;
  readonly removeFromWishlistButton: Locator;

  constructor(page: Page) {
    super(page);
    this.navigateToWishlist = page.locator("#wishlist-total");
    this.wishlistTable = page.locator(".table.table-bordered.table-hover");
    this.addToWishlistButton = page.locator(".btn.btn-default").nth(1);
    this.removeFromWishlistButton = page.locator(".btn.btn-danger");
  }

  // Method to add an item to the wishlist
  async addItemToWishlist(itemName: string) {
    const itemLink = this.page
      .locator(
        `.product-thumb:has(.caption a:has-text("${itemName}")) .caption a`
      )
      .filter({ hasText: itemName });
    await itemLink.first().click();
    await this.addToWishlistButton.click();
    await this.navigateToWishlist.click();
  }

  // Method to remove an item from the wishlist
  async removeItemFromWishlist(itemName: string) {
    await this.navigateToWishlist.click();
    const itemRow = this.wishlistTable.locator(`tr:has-text("${itemName}")`);
    const removeButton = itemRow.locator(".btn-danger");
    await removeButton.click();
  }

  // Method to assert that an item is in the wishlist
  async assertItemInWishlist(itemName: string) {
    const itemRow = this.wishlistTable.locator(`tr:has-text("${itemName}")`);
    await expect(itemRow).toHaveCount(1);
  }

  // Method to assert that an item is not in the wishlist
  async assertItemNotInWishlist(itemName: string) {
    const itemRow = this.wishlistTable.locator(`tr:has-text("${itemName}")`);
    await expect(itemRow).toHaveCount(0);
  }
}
