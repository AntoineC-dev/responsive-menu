import { primaryNav } from "./selectors.config";

function getPrimaryNavAnimationDelay() {
  let delay = 150; // tailwind default
  primaryNav.classList.forEach((item) => {
    if (item.includes("duration-")) {
      delay = parseInt(item.substring(9));
    }
  });
  return delay;
}

export interface MobileMenuConfig {
  hamburgerTranslate: number; // = verticalGap / lineHeight
  isOpen: boolean;
  primaryNavAnimationDuration: number;
  primaryNavItemsDelay: number;
}

export const mobileMenuConfig: MobileMenuConfig = {
  hamburgerTranslate: 6 + 4,
  isOpen: false,
  primaryNavAnimationDuration: getPrimaryNavAnimationDelay(),
  primaryNavItemsDelay: 25,
};
