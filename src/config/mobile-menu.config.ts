export interface MobileMenuConfig {
  hamburgerTranslate: number; // = verticalGap / lineHeight
  isOpen: boolean;
}
export const mobileMenuConfig: MobileMenuConfig = {
  hamburgerTranslate: 6 + 4,
  isOpen: false,
};
