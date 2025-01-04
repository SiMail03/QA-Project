import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class OrderHistoryPage extends AbstractPage {
  readonly orderHistoryTable: Locator;
  readonly orderHistoryTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.orderHistoryTitle = page.locator("h1");
  }

  async navigateToOrderHistory() {
    await this.page.goto(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/order"
    );
  }

  async assertOrderHistoryDisplayed() {
    await expect(this.orderHistoryTitle).toHaveText("Order History");
  }
}
