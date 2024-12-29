import { Header } from "./Header";
import { Footer } from "./Footer"; // Import Footer class
import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage {
  readonly url: string;

  readonly header: Header; // Add header instance
  readonly footer: Footer; // Add footer instance

  readonly mainContent: Locator;
  readonly featuredProducts: Locator;
  readonly product: Locator;
  readonly banners: Locator;

  constructor(page: Page) {
    super(page);
    this.url = "https://naveenautomationlabs.com/opencart";

    this.header = new Header(page); // Initialize Header
    this.footer = new Footer(page); // Initialize Footer

    this.mainContent = page.locator("#common-home");
    this.featuredProducts = page.locator("#carousel-banner-0");
    this.product = page.locator(".product-thumb").first();
    this.banners = page.locator("#carousel-banner-1");
  }

  public async navigateToHomePage() {
    await this.page.goto(this.url);
  }

  public async searchItem(search: string) {
    await this.header.searchItem(search); // Use header to search
  }

  public async checkHomePage() {
    await expect(this.mainContent).toBeVisible();
    await expect(this.featuredProducts).toBeVisible();
    await expect(this.product).toBeVisible();
    await expect(this.banners).toBeVisible();
  }
}
