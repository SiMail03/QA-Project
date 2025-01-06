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
    const links = [
      { name: "termsAndConditionsLink", text: "Terms & Conditions" },
      { name: "deliveryInformationLink", text: "Delivery Information" },
      { name: "aboutUsLink", text: "About Us" },
      { name: "privacyPolicyLink", text: "Privacy Policy" },
      { name: "contactUsLink", text: "Contact Us" },
      { name: "returnsLink", text: "Returns" },
      { name: "siteMapLink", text: "Site Map" },
      { name: "brandsLink", text: "Brands" },
      { name: "giftCertificatesLink", text: "Gift Certificates" },
      { name: "affiliateLink", text: "Affiliate" },
      { name: "specialsLink", text: "Specials" },
      { name: "myAccountLink", text: "My Account" },
      { name: "orderHistoryLink", text: "Order History" },
      { name: "wishListLink", text: "Wish List" },
      { name: "newsletterLink", text: "Newsletter" },
    ];

    for (const link of links) {
      this[link.name] = footer.locator(`a:has-text("${link.text}")`);
    }
  }

  /**
   * Check if all footer links are visible.
   */
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

  /**
   * Assert that the Terms and Conditions page is loaded.
   */
  async assertTermsAndConditions() {
    await this.termsAndConditionsLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=5"
    );
  }

  /**
   * Assert that the Delivery Information page is loaded.
   */
  async assertDeliveryInformation() {
    await this.deliveryInformationLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=6"
    );
  }

  /**
   * Assert that the About Us page is loaded.
   */
  async assertAboutUs() {
    await this.aboutUsLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=4"
    );
  }

  /**
   * Assert that the Privacy Policy page is loaded.
   */
  async assertPrivacyPolicy() {
    await this.privacyPolicyLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/information&information_id=3"
    );
  }

  /**
   * Assert that the Contact Us page is loaded.
   */
  async assertContactUs() {
    await this.contactUsLink.click();
    await expect(this.page).toHaveURL(
      "https://naveenautomationlabs.com/opencart/index.php?route=information/contact"
    );
  }
}
