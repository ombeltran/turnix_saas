import {
  defaultBusinessBranding,
  type BusinessBranding,
} from "@/types/business-branding";
import {
  initialBusinessSettings,
  type BusinessSettings,
} from "@/mocks/settings";

export const BUSINESS_BRANDING_STORAGE_KEY = "turnix-business-branding";
export const BUSINESS_PROFILE_STORAGE_KEY = "turnix-business-profile";

export function readBusinessBranding(): BusinessBranding {
  if (typeof window === "undefined") {
    return defaultBusinessBranding;
  }

  try {
    const storedValue = window.localStorage.getItem(
      BUSINESS_BRANDING_STORAGE_KEY,
    );

    if (!storedValue) {
      return defaultBusinessBranding;
    }

    return {
      ...defaultBusinessBranding,
      ...(JSON.parse(storedValue) as Partial<BusinessBranding>),
    };
  } catch {
    return defaultBusinessBranding;
  }
}

export function saveBusinessBranding(branding: BusinessBranding) {
  window.localStorage.setItem(
    BUSINESS_BRANDING_STORAGE_KEY,
    JSON.stringify(branding),
  );
}

export function readBusinessProfile(): BusinessSettings {
  if (typeof window === "undefined") {
    return initialBusinessSettings;
  }

  try {
    const storedValue = window.localStorage.getItem(BUSINESS_PROFILE_STORAGE_KEY);

    if (!storedValue) {
      return initialBusinessSettings;
    }

    return {
      ...initialBusinessSettings,
      ...(JSON.parse(storedValue) as Partial<BusinessSettings>),
    };
  } catch {
    return initialBusinessSettings;
  }
}

export function saveBusinessProfile(profile: BusinessSettings) {
  window.localStorage.setItem(
    BUSINESS_PROFILE_STORAGE_KEY,
    JSON.stringify(profile),
  );
}
