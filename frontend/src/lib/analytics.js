// Analytics utility — all Firebase Analytics calls go through here.
// Never call logEvent directly in components; use these helpers instead.
// PII rule: no names, phone numbers, addresses, or messages are ever sent.

import { logEvent } from "firebase/analytics";
import { getAnalyticsInstance } from "./firebase";
import { EVENTS } from "./analyticsEvents";

// ── Internal helpers ─────────────────────────────────────────────────────────

const getDeviceType = () => {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
};

// Fire a single event — silently fails so analytics never breaks the app.
const fire = async (eventName, params = {}) => {
  try {
    const analytics = await getAnalyticsInstance();
    if (analytics) logEvent(analytics, eventName, params);
    if (process.env.NODE_ENV === "development") {
      console.debug("[Analytics]", eventName, params);
    }
  } catch {
    /* Silently ignore — analytics must never break the UI */
  }
};

// ── Public helpers ───────────────────────────────────────────────────────────

/** Track a page view. Call once on each route render. */
export const trackPageView = ({ pageName, pagePath, language }) => {
  const eventName =
    pageName === "home" ? EVENTS.PAGE_VIEW_HOME : EVENTS.PAGE_VIEW_PACKAGES;
  fire(eventName, {
    page_name: pageName,
    page_path: pagePath,
    language,
    device_type: getDeviceType(),
  });
};

/** Track any generic event with optional params. */
export const trackEvent = (eventName, params = {}) => {
  fire(eventName, { device_type: getDeviceType(), ...params });
};

/** Track a button or CTA click. */
export const trackButtonClick = (eventName, { language, section, page, ...rest } = {}) => {
  fire(eventName, {
    language,
    section_name: section,
    page_name: page,
    device_type: getDeviceType(),
    ...rest,
  });
};

/**
 * Track any external / outbound link click.
 * Fires three events:
 *   1. EXTERNAL_LINK_CLICK  (generic, always)
 *   2. specificEvent         (e.g. hero_whatsapp_click, optional)
 *   3. OUTBOUND_NAVIGATION_START
 * Also stores the destination in sessionStorage for return tracking.
 */
export const trackExternalLink = ({
  specificEvent,
  linkName,
  linkType,
  destinationDomain,
  page,
  section,
  language,
}) => {
  const shared = {
    link_name: linkName,
    link_type: linkType,
    destination_domain: destinationDomain,
    page_name: page,
    section_name: section,
    language,
    device_type: getDeviceType(),
  };

  fire(EVENTS.EXTERNAL_LINK_CLICK, shared);
  if (specificEvent) fire(specificEvent, shared);
  fire(EVENTS.OUTBOUND_NAVIGATION_START, {
    destination_type: linkType,
    destination_domain: destinationDomain,
    source_page: page,
    source_section: section,
    language,
  });

  // Store outbound context so we can detect return visits
  try {
    sessionStorage.setItem(
      "_aa_outbound",
      JSON.stringify({ type: linkType, domain: destinationDomain })
    );
  } catch {
    /* sessionStorage unavailable */
  }
};

/**
 * Fire a booking-form event.
 * Only safe, non-PII metadata is sent (field names, error types, language).
 */
export const trackFormEvent = (eventName, { language, page, fieldName, errorType, lastField, completionPct } = {}) => {
  const params = { language, page_name: page };
  if (fieldName !== undefined) params.field_name = fieldName;
  if (errorType !== undefined) params.error_type = errorType;
  if (lastField !== undefined) params.last_completed_field = lastField;
  if (completionPct !== undefined) params.form_completion_percentage = completionPct;
  fire(eventName, params);
};

/** Track scroll depth milestone (25 / 50 / 75 / 100). */
export const trackScrollDepth = (depth, { page, pagePath, language }) => {
  const map = {
    25: EVENTS.SCROLL_DEPTH_25,
    50: EVENTS.SCROLL_DEPTH_50,
    75: EVENTS.SCROLL_DEPTH_75,
    100: EVENTS.SCROLL_DEPTH_100,
  };
  if (map[depth]) {
    fire(map[depth], {
      page_name: page,
      page_path: pagePath,
      language,
      device_type: getDeviceType(),
    });
  }
};

/** Track that a section became visible. Called from useSectionView. */
export const trackSectionView = (eventName, { page, language }) => {
  fire(eventName, {
    page_name: page,
    language,
    device_type: getDeviceType(),
  });
};

/**
 * Check sessionStorage for a stored outbound navigation and fire the
 * return event if found. Call this on page focus / visibility restore.
 */
export const trackReturnAfterOutbound = (currentPage, language) => {
  try {
    const raw = sessionStorage.getItem("_aa_outbound");
    if (!raw) return;
    sessionStorage.removeItem("_aa_outbound");
    const { type, domain } = JSON.parse(raw);
    fire(EVENTS.WEBSITE_RETURN_AFTER_OUTBOUND, {
      returning_from: type,
      returning_from_domain: domain,
      return_page: currentPage,
      language,
    });
  } catch {
    /* Ignore malformed storage */
  }
};
