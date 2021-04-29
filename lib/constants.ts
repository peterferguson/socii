import AppleLogo from "@icons/apple.svg";
import FacebookLogo from "@icons/fb.svg";
import TwitterLogo from "@icons/twitter.svg";
import GoogleLogo from "@icons/google.svg";
import { googleAuthProvider, facebookAuthProvider } from "@lib/firebase";


/*
 * Group Privacy Settings
 */
export const groupPrivacyOptions = [
  {
    name: "Private",
    description: "Activity feed visible to group only",
  },
  {
    name: "Public",
    description: "Activity feed visible to anyone",
  },
];

/*
 * Sign In Options & Logos for Entry Page
 */
export const signInOptions = [
  { logo: GoogleLogo, provider: googleAuthProvider },
  { logo: AppleLogo, provider: null },
  { logo: TwitterLogo, provider: null },
  { logo: FacebookLogo, provider: facebookAuthProvider },
];

export const tailwindColorMap = {
  "bg-teal-200": "#99F6E4",
  "bg-red-200": "#FECACA",
  "bg-brand": "#0fa9e6",
};
