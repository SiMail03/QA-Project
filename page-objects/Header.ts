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

    this.wishListButton = page.locator("#wishlist-total");
    this.cartButton = page.getByRole("link", { name: "Shopping Cart" });
    this.checkOutButton = page.getByRole("link", { name: "Checkout" });
    this.searchInput = page.locator(".form-control.input-lg");
    this.searchButton = page.locator(".input-group-btn");
    this.cartInfo = page.locator(
      ".btn.btn-lg.btn-inverse.btn-block.dropdown-toggle"
    );
    this.navBar = page.locator(".collapse.navbar-collapse.navbar-ex1-collapse");
  }

  public async checkHeaderIsLoaded() {
    const elementsToCheck = [
      this.header,
      this.searchInput,
      this.searchButton,
      this.cartInfo,
      this.navBar,
    ];

    for (const element of elementsToCheck) {
      await expect(element).toBeVisible();
    }
  }

  public async clickMyAccountButton() {
    await this.myAccountButton.click();
  }
  async searchItem(search: string) {
    await this.searchInput.fill(search);
    await this.searchButton.click();
  }
}
