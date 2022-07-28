import {
  hamburgerBottom,
  hamburgerBtn,
  hamburgerCenter,
  hamburgerTop,
  mobileMenuConfig,
  MobileMenuConfig,
  primaryNav,
  primaryNavItems,
} from "../config";

export function initializeMobileMenu() {
  // ---- ToggleHamburger ---- //
  function toggleHamburger({ hamburgerTranslate, isOpen }: MobileMenuConfig) {
    // Transform and show/hide center
    (hamburgerCenter as HTMLDivElement).style.opacity = isOpen ? "0" : "1";
    // Transform edges
    const rotate = isOpen ? 45 : 0;
    const translate = isOpen ? hamburgerTranslate : 0;
    (hamburgerTop as HTMLDivElement).style.transform = `translateY(${translate}px) rotate(-${rotate}deg)`;
    (hamburgerBottom as HTMLDivElement).style.transform = `translateY(-${translate}px) rotate(${rotate}deg)`;
  }

  // ---- ToggleNavVisibility ---- //
  const toggleNavVisibilityItems = [primaryNav, ...primaryNavItems];
  const primaryNavItemsMaxDelay =
    (toggleNavVisibilityItems.length - 2) * mobileMenuConfig.primaryNavItemsDelay +
    mobileMenuConfig.primaryNavAnimationDuration;

  function toggleNavVisibility({ isOpen, primaryNavAnimationDuration, primaryNavItemsDelay }: MobileMenuConfig) {
    const opacity = isOpen ? "1" : "0";
    const xPosition = isOpen ? toggleNavVisibilityItems[0].clientWidth : 0;
    let delay = isOpen ? 0 : primaryNavItemsMaxDelay;
    for (let index = 0; index < toggleNavVisibilityItems.length; index++) {
      setTimeout(() => {
        index === 0
          ? ((toggleNavVisibilityItems[index] as HTMLElement).style.transform = `translateX(-${xPosition}px)`)
          : ((toggleNavVisibilityItems[index] as HTMLElement).style.opacity = opacity);
      }, delay);
      if (index === toggleNavVisibilityItems.length - 1) return;
      if (isOpen) {
        delay += index === 0 ? primaryNavAnimationDuration : primaryNavItemsDelay;
      } else {
        delay -= index === 0 ? primaryNavAnimationDuration : primaryNavItemsDelay;
      }
    }
  }

  // ---- Toggle document overflowY ---- //
  function toggleDocumentOverflowY(isOpen: MobileMenuConfig["isOpen"]) {
    document.documentElement.style.overflowY = isOpen ? "hidden" : "";
  }

  // ---- ToggleMobileMenu ---- //
  function toggleMobileMenu() {
    // Toggle isOpen
    mobileMenuConfig.isOpen = !mobileMenuConfig.isOpen;
    // Toggle document overflowY
    toggleDocumentOverflowY(mobileMenuConfig.isOpen);
    // Animate hamburger
    toggleHamburger(mobileMenuConfig);
    // Show/hide primary navigation
    toggleNavVisibility(mobileMenuConfig);
  }

  // ---- HamburgerBtn click listener ---- //
  hamburgerBtn.addEventListener("click", toggleMobileMenu);
}
