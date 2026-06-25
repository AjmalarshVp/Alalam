// Centralized registry of all Firebase Analytics event names.
// Import EVENTS from this file — never hardcode event strings in components.

export const EVENTS = {
  // ── Page views ─────────────────────────────────────────────────────────────
  PAGE_VIEW_HOME: "page_view_home",
  PAGE_VIEW_PACKAGES: "page_view_packages",

  // ── Hero section ────────────────────────────────────────────────────────────
  HERO_SECTION_VIEW: "hero_section_view",
  HERO_BOOK_NOW_CLICK: "hero_book_now_click",
  HERO_PACKAGES_CLICK: "hero_packages_click",
  HERO_WHATSAPP_CLICK: "hero_whatsapp_click",

  // ── Header ──────────────────────────────────────────────────────────────────
  HEADER_LOGO_CLICK: "header_logo_click",
  LANGUAGE_SWITCH_ENGLISH: "language_switch_english",
  LANGUAGE_SWITCH_ARABIC: "language_switch_arabic",
  HEADER_MENU_OPEN: "header_menu_open",
  HEADER_MENU_CLOSE: "header_menu_close",
  HEADER_MENU_ITEM_CLICK: "header_menu_item_click",

  // ── Services section ────────────────────────────────────────────────────────
  SERVICES_SECTION_VIEW: "services_section_view",

  // ── How It Works section ────────────────────────────────────────────────────
  HOW_IT_WORKS_SECTION_VIEW: "how_it_works_section_view",
  HOW_IT_WORKS_BOOK_NOW_CLICK: "how_it_works_book_now_click",

  // ── Real Transformations section ─────────────────────────────────────────────
  REAL_TRANSFORMATIONS_SECTION_VIEW: "real_transformations_section_view",

  // ── Final CTA section ────────────────────────────────────────────────────────
  FINAL_CTA_BOOK_NOW_CLICK: "final_cta_book_now_click",
  FINAL_CTA_WHATSAPP_CLICK: "final_cta_whatsapp_click",

  // ── Footer section ───────────────────────────────────────────────────────────
  FOOTER_SECTION_VIEW: "footer_section_view",
  FOOTER_WHATSAPP_CLICK: "footer_whatsapp_click",
  FOOTER_PHONE_CLICK: "footer_phone_click",
  FOOTER_EMAIL_CLICK: "footer_email_click",
  FOOTER_INSTAGRAM_CLICK: "footer_instagram_click",

  // ── Floating WhatsApp button ─────────────────────────────────────────────────
  FLOAT_WHATSAPP_CLICK: "float_whatsapp_click",

  // ── Packages page ────────────────────────────────────────────────────────────
  PACKAGES_SECTION_VIEW: "packages_section_view",
  PACKAGE_CARD_VIEW: "package_card_view",
  PACKAGE_MONTHLY_BOOK_NOW_CLICK: "package_monthly_book_now_click",
  PACKAGE_QUARTERLY_BOOK_NOW_CLICK: "package_quarterly_book_now_click",
  PACKAGE_YEARLY_BOOK_NOW_CLICK: "package_yearly_book_now_click",

  // ── Booking form ─────────────────────────────────────────────────────────────
  BOOKING_FORM_START: "booking_form_start",
  BOOKING_FORM_NAME_FOCUS: "booking_form_name_field_focus",
  BOOKING_FORM_PHONE_FOCUS: "booking_form_phone_field_focus",
  BOOKING_FORM_SERVICE_SELECT: "booking_form_service_field_select",
  BOOKING_FORM_MESSAGE_FOCUS: "booking_form_message_field_focus",
  BOOKING_FORM_SUBMIT_SUCCESS: "booking_form_submit_success",
  BOOKING_FORM_SUBMIT_ERROR: "booking_form_submit_error",
  BOOKING_FORM_VALIDATION_ERROR: "booking_form_validation_error",
  BOOKING_FORM_ABANDON: "booking_form_abandon",

  // ── External / outbound navigation ───────────────────────────────────────────
  EXTERNAL_LINK_CLICK: "external_link_click",
  OUTBOUND_NAVIGATION_START: "outbound_navigation_start",
  WEBSITE_RETURN_AFTER_OUTBOUND: "website_return_after_outbound",

  // ── Scroll depth ─────────────────────────────────────────────────────────────
  SCROLL_DEPTH_25: "scroll_depth_25",
  SCROLL_DEPTH_50: "scroll_depth_50",
  SCROLL_DEPTH_75: "scroll_depth_75",
  SCROLL_DEPTH_100: "scroll_depth_100",
};

// Package-specific book-now events indexed by plan position (0=monthly, 1=quarterly, 2=yearly)
export const PACKAGE_BOOK_NOW_EVENTS = [
  EVENTS.PACKAGE_MONTHLY_BOOK_NOW_CLICK,
  EVENTS.PACKAGE_QUARTERLY_BOOK_NOW_CLICK,
  EVENTS.PACKAGE_YEARLY_BOOK_NOW_CLICK,
];
