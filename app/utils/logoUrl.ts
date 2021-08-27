export const logoUrl = (isin: string) =>
  `https://storage.googleapis.com/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/logos/${isin}.png`
