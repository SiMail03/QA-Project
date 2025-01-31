import { Header } from "./Header";
import { Footer } from "./Footer";
import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class HomePage extends AbstractPage {
  readonly url: string;
  readonly header: Header;
  readonly footer: Footer;

  // Locators
  readonly logo: Locator;
  readonly mainContent: Locator;
  readonly featuredProducts: Locator;
  readonly product: Locator;
  readonly productLinks: Locator;
  readonly banners: Locator;
  readonly noItemFoundMessage: Locator;
  readonly searchResults: Locator;
  readonly numOfItems: Locator;

  constructor(page: Page) {
    super(page);
    this.url = "https://naveenautomationlabs.com/opencart";
    this.header = new Header(page);
    this.footer = new Footer(page);

    // Initialize locators
    this.logo = page.locator("#logo");
    this.mainContent = page.locator("#common-home");
    this.featuredProducts = page.locator(".slideshow.swiper-viewport");
    this.product = page.locator(".product-thumb").first();
    this.productLinks = page.locator(".caption");
    this.banners = page.locator(".carousel.swiper-viewport");
    this.noItemFoundMessage = page.getByText(
      "There is no product that matches the search criteria."
    );
    this.numOfItems = page.locator(".col-sm-6.text-right");
  }

  // Navigation
  public async navigateToHomePage() {
    await this.page.goto(this.url);
  }

  // Assertions
  public async checkHomePage() {
    await this.header.checkHeaderIsLoaded();
    await expect(this.logo).toBeVisible();
    await expect(this.mainContent).toBeVisible();
    await expect(this.featuredProducts).toBeVisible();
    await expect(this.product).toBeVisible();
    await expect(this.banners).toBeVisible();
    await this.footer.checkFooterIsLoaded();
  }

  public async searchItem(search: string) {
    await this.header.searchItem(search);
  }

  public async getProductLinkByName(name: string): Promise<Locator> {
    const productLink = this.productLinks.locator(`a:has-text("${name}")`);
    return productLink;
  }

  public async assertSearchResultsAreDisplayed() {
    await this.product.isVisible();
  }

  public async assertNoItemFoundMessage() {
    await expect(this.noItemFoundMessage).toContainText(
      "There is no product that matches the search criteria."
    );
  }

  public async assertNumberOfSearchResults(expectedCount: string) {
    await expect(this.numOfItems).toContainText(expectedCount);
  }

  public async assertProductInSearchResults(productName: string) {
    const product = this.product.locator(`.caption:has-text("${productName}")`);
    await expect(product).toBeVisible();
  }

  public async assertSearchBarContains(searchTerm: string) {
    const searchBarValue = await this.page.inputValue('input[name="search"]');
    expect(searchBarValue).toBe(searchTerm);
  }
}
