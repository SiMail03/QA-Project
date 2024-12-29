import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class Header extends AbstractPage {
  readonly header: Locator;
  readonly myAccountButton: Locator;
  readonly wishListButton: Locator;
  readonly cartButton: Locator;
  readonly checkOutButton: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartInfo: Locator;
  readonly navBar: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator("#top");
    this.myAccountButton = page.locator(
      'a[href="https://naveenautomationlabs.com/opencart/index.php?route=account/account"][title="My Account"].dropdown-toggle'
    );

    this.wishListButton = page.getByRole("link", {
      name: "Wish List",
    });
    this.cartButton = page.getByRole("link", { name: "Shopping Cart" });
    this.checkOutButton = page.getByRole("link", { name: "Checkout" });
    this.searchInput = page.getByPlaceholder("Search");
    this.searchButton = page.locator(".btn.btn-light.btn-lg");
    this.cartButton = page.locator(
      ".btn.btn-lg.btn-inverse.btn-block.dropdown-toggle"
    );
  }

  public async clickMyAccountButton() {
    await this.myAccountButton.click();
  }
  async searchItem(search: string) {
    await this.searchInput.fill(search); // Type the search text
    await this.searchButton.click(); // Click the search button
  }
}
