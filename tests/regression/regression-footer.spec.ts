import { test, expect } from "@playwright/test";
import { Footer } from "../../page-objects/Footer";

test.describe("Footer Links Visibility Tests", () => {
  let footer: Footer;

  test.beforeEach(async ({ page }) => {
    footer = new Footer(page);
    await page.goto("https://naveenautomationlabs.com/opencart/"); // Replace with your homepage URL
  });

  test("Verify all footer links are visible", async () => {
    await footer.checkFooterIsLoaded();
  });
  test("Verify navigation to Terms & Conditions", async () => {
    await footer.assertTermsAndConditions();
  });

  test("Verify navigation to Delivery Information", async () => {
    await footer.assertDeliveryInformation();
  });

  test("Verify navigation to About Us", async () => {
    await footer.assertAboutUs();
  });

  test("Verify navigation to Privacy Policy", async () => {
    await footer.assertPrivacyPolicy();
  });

  test("Verify navigation to Contact Us", async () => {
    await footer.assertContactUs();
  });
});
