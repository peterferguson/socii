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
* Default Group Deposit Options
*/
export const groupDepositOptions = [
  {
    amount: "£0"
  },
  {
    amount: "£10"
  },
  {
    amount: "£25"
  },
  {
    amount: "£50"
  },
  {
    amount: "£100"
  },
];

/*
* Default Group Initial Lump-Sum Options
*/
export const groupLumpSumOptions = [
  {
    amount: "£0"
  },
  {
    amount: "£25"
  },
  {
    amount: "£50"
  },
  {
    amount: "£100"
  },
  {
    amount: "£250"
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
