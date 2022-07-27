import "./style.css";

const hamburgerBtn = document.getElementById("hamburger-btn") as Element;
const hamburgerTop = document.getElementById("hamburger-top") as Element;
const hamburgerCenter = document.getElementById("hamburger-center") as Element;
const hamburgerBottom = document.getElementById("hamburger-bottom") as Element;

interface MobileMenuConfig {
  centerTranslate: number; // = lineWidth / 2
  edgeTranslate: number; // = verticalGap / lineHeight
  isOpen: boolean;
}
const mobileMenuConfig: MobileMenuConfig = {
  centerTranslate: Math.round(36 / 2),
  edgeTranslate: 8 + 4,
  isOpen: false,
};

function toggleMobileMenu() {
  const { centerTranslate, edgeTranslate, isOpen } = mobileMenuConfig;
  // Transform and show/hide center
  (hamburgerCenter as HTMLDivElement).style.transform = `translateX(${isOpen ? 0 : centerTranslate}px)`;
  (hamburgerCenter as HTMLDivElement).style.opacity = isOpen ? "1" : "0";
  // Transform edges
  const rotate = isOpen ? 0 : 45;
  const translate = isOpen ? 0 : edgeTranslate;
  (hamburgerTop as HTMLDivElement).style.transform = `translateY(${translate}px) rotate(-${rotate}deg)`;
  (hamburgerBottom as HTMLDivElement).style.transform = `translateY(-${translate}px) rotate(${rotate}deg)`;
  // Toggle isOpen
  mobileMenuConfig.isOpen = !isOpen;
}

hamburgerBtn.addEventListener("click", toggleMobileMenu);
