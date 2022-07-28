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

  interface ToggleElementClass {
    element: Element;
    isOpen: MobileMenuConfig["isOpen"];
  }

  // ---- ToggleNavItemsOpacityClass ---- //
  function toggleNavTranslateXClass({ element, isOpen }: ToggleElementClass) {
    isOpen
      ? element.classList.replace("translate-x-0", "-translate-x-full")
      : element.classList.replace("-translate-x-full", "translate-x-0");
  }

  // ---- ToggleNavItemsOpacityClass ---- //

  function toggleNavItemsOpacityClass({ element, isOpen }: ToggleElementClass) {
    isOpen
      ? element.classList.replace("opacity-0", "opacity-100")
      : element.classList.replace("opacity-100", "opacity-0");
  }

  // ---- ToggleNavVisibility ---- //
  const { primaryNavAnimationDuration, primaryNavItemsDelay } = mobileMenuConfig;
  const visibilityItems = [primaryNav, ...primaryNavItems];
  const maxDelay = (visibilityItems.length - 2) * primaryNavItemsDelay + primaryNavAnimationDuration;

  function toggleNavVisibility(isOpen: MobileMenuConfig["isOpen"]) {
    let delay = isOpen ? 0 : maxDelay;
    for (let index = 0; index < visibilityItems.length; index++) {
      // Apply delay
      setTimeout(() => {
        index === 0
          ? toggleNavTranslateXClass({ element: visibilityItems[index], isOpen })
          : toggleNavItemsOpacityClass({ element: visibilityItems[index], isOpen });
      }, delay);
      if (index === visibilityItems.length - 1) return;
      // Update delay
      if (isOpen) {
        delay += index === 0 ? primaryNavAnimationDuration : primaryNavItemsDelay;
      } else {
        delay -= index === 0 ? primaryNavAnimationDuration : primaryNavItemsDelay;
      }
    }
  }

  // ---- Toggle document overflowY ---- //
  function toggleDocumentOverflowY(isOpen: MobileMenuConfig["isOpen"]) {
    isOpen
      ? document.documentElement.classList.replace("overflow-y-auto", "overflow-y-hidden")
      : document.documentElement.classList.replace("overflow-y-hidden", "overflow-y-auto");
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
    toggleNavVisibility(mobileMenuConfig.isOpen);
  }

  // ---- HamburgerBtn click listener ---- //
  hamburgerBtn.addEventListener("click", toggleMobileMenu);
}
