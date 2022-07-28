import {
  hamburgerBottom,
  hamburgerBtn,
  hamburgerCenter,
  hamburgerTop,
  mobileMenuConfig,
  MobileMenuConfig,
  primaryNav,
} from "../config";

export function initializeMobileMenu() {
  function toggleHamburger({ hamburgerTranslate, isOpen }: MobileMenuConfig) {
    // Transform and show/hide center
    (hamburgerCenter as HTMLDivElement).style.opacity = isOpen ? "0" : "1";
    // Transform edges
    const rotate = isOpen ? 45 : 0;
    const translate = isOpen ? hamburgerTranslate : 0;
    (hamburgerTop as HTMLDivElement).style.transform = `translateY(${translate}px) rotate(-${rotate}deg)`;
    (hamburgerBottom as HTMLDivElement).style.transform = `translateY(-${translate}px) rotate(${rotate}deg)`;
  }

  interface ToggleNavVisibility {
    element: Element;
    isOpen: MobileMenuConfig["isOpen"];
  }

  function toggleNavVisibility({ element, isOpen }: ToggleNavVisibility) {
    (element as HTMLDivElement).style.transform = `translateX(-${isOpen ? element.clientWidth : 0}px)`;
  }

  function toggleMobileMenu() {
    // Toggle isOpen
    mobileMenuConfig.isOpen = !mobileMenuConfig.isOpen;
    // Animate hamburger
    toggleHamburger(mobileMenuConfig);
    // Show/hide primary navigation
    toggleNavVisibility({ element: primaryNav, isOpen: mobileMenuConfig.isOpen });
  }

  hamburgerBtn.addEventListener("click", toggleMobileMenu);
}
