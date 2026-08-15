export type BusinessBranding = {
  logoUrl: string;
  heroImageUrl: string;
  primaryColor: string;
  secondaryColor: string;
  buttonTextColor: string;
  heroTitle: string;
  heroDescription: string;
  bookingButtonLabel: string;
  showServiceImages: boolean;
  showContactSection: boolean;
};

export const defaultBusinessBranding: BusinessBranding = {
  logoUrl: "",
  heroImageUrl:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=85",
  primaryColor: "#004ac6",
  secondaryColor: "#eef3fc",
  buttonTextColor: "#ffffff",
  heroTitle: "Beauty appointments, made simple",
  heroDescription:
    "Choose your service, professional and preferred time in just a few steps.",
  bookingButtonLabel: "Book now",
  showServiceImages: true,
  showContactSection: true,
};
