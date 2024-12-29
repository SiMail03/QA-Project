import { Locator, Page } from "@playwright/test";

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
    this.termsAndConditionsLink = page.locator("text=Terms & Conditions"); // Terms & Conditions link
    this.deliveryInformationLink = page.locator("text=Delivery Information"); // Delivery Information link
    this.aboutUsLink = page.locator("text=About Us"); // About Us link
    this.privacyPolicyLink = page.locator("text=Privacy Policy"); // Privacy Policy link
    this.contactUsLink = page.locator("text=Contact Us"); // Contact Us link
    this.returnsLink = page.locator("text=Returns"); // Returns link
    this.siteMapLink = page.locator("text=Site Map"); // Site Map link
    this.brandsLink = page.locator("text=Brands"); // Brands link
    this.giftCertificatesLink = page.locator("text=Gift Certificates"); // Gift Certificates link
    this.affiliateLink = page.locator("text=Affiliate"); // Affiliate link
    this.specialsLink = page.locator("text=Specials"); // Specials link
    this.myAccountLink = page.locator("text=My Account"); // My Account section
    this.orderHistoryLink = page.locator("text=Order History"); // Order History link
    this.wishListLink = page.locator("text=Wish List"); // Wish List link
    this.newsletterLink = page.locator("text=Newsletter"); // Newsletter section
  }
}
