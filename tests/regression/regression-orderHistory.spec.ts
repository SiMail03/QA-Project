import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { OrderHistoryPage } from "../../page-objects/OrderHistoryPage";

test.describe("Order History Regression Tests", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let orderHistoryPage: OrderHistoryPage;

  // Run before each test
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    orderHistoryPage = new OrderHistoryPage(page);
    await homePage.navigateToHomePage();
    await loginPage.login("testautomation123@demo.com", "automation123");
  });

  test("Regression Test: View order history", async () => {
    await orderHistoryPage.navigateToOrderHistory();
    await orderHistoryPage.assertOrderHistoryDisplayed();
  });
});
