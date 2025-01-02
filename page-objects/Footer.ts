import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class Footer extends AbstractPage {
  readonly termsAndConditionsLink: Locator;
  readonly deliveryInformationLink: Locator;
  readonly aboutUsLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly contactUsLink: Locator;
  readonly returnsLink: Locator;
  readonly siteMapLink: Locator;
  readonly brandsLink: Locator;
  readonly giftCertificatesLink: Locator;
  readonly affiliateLink: Locator;
  readonly specialsLink: Locator;
  readonly myAccountLink: Locator;
  readonly orderHistoryLink: Locator;
  readonly wishListLink: Locator;
  readonly newsletterLink: Locator;

  constructor(page: Page) {
    super(page);

    const footer = page.locator("footer");

    this.termsAndConditionsLink = footer.locator(
      'a:has-text("Terms & Conditions")'
    );
    this.deliveryInformationLink = footer.locator(
      'a:has-text("Delivery Information")'
    );
    this.aboutUsLink = footer.locator('a:has-text("About Us")');
    this.privacyPolicyLink = footer.locator('a:has-text("Privacy Policy")');
    this.contactUsLink = footer.locator('a:has-text("Contact Us")');
    this.returnsLink = footer.locator('a:has-text("Returns")');
    this.siteMapLink = footer.locator('a:has-text("Site Map")');
    this.brandsLink = footer.locator('a:has-text("Brands")');
    this.giftCertificatesLink = footer.locator(
      'a:has-text("Gift Certificates")'
    );
    this.affiliateLink = footer.locator('a:has-text("Affiliate")');
    this.specialsLink = footer.locator('a:has-text("Specials")');
    this.myAccountLink = footer.locator('a:has-text("My Account")');
    this.orderHistoryLink = footer.locator('a:has-text("Order History")');
    this.wishListLink = footer.locator('a:has-text("Wish List")');
    this.newsletterLink = footer.locator('a:has-text("Newsletter")');
  }

  async checkFooterIsLoaded() {
    const elementsToCheck = [
      this.termsAndConditionsLink,
      this.deliveryInformationLink,
      this.aboutUsLink,
      this.privacyPolicyLink,
      this.contactUsLink,
      this.returnsLink,
      this.siteMapLink,
      this.brandsLink,
      this.giftCertificatesLink,
      this.affiliateLink,
      this.specialsLink,
      this.myAccountLink,
      this.orderHistoryLink,
      this.wishListLink,
      this.newsletterLink,
    ];

    for (const element of elementsToCheck) {
      await expect(element).toBeVisible();
    }
  }

  async assertTermsAndConditions() {
    await this.termsAndConditionsLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=5"
    );
  }

  async assertDeliveryInformation() {
    await this.deliveryInformationLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=6"
    );
  }

  async assertAboutUs() {
    await this.aboutUsLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=4"
    );
  }

  async assertPrivacyPolicy() {
    await this.privacyPolicyLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=3"
    );
  }

  async assertContactUs() {
    await this.contactUsLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/contact"
    );
  }
}
