import { expect, Locator, Page } from "@playwright/test";

export class Footer {
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
    // Locate all links inside the footer by targeting the footer element
    const footer = page.locator("footer"); // Locate the footer section

    // Locate each link within the footer using the "text=" selector for identifying the link text
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

  public async checkFooterIsLoaded() {
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
}
