import { useRouter } from "next/router";
export default function CryptoPair() {
  const router = useRouter();
  const { pair } = router.query;
  return (
    <div
      className="h-screen items-center justify-center mx-auto 
                    flex text-5xl font-poppins text-brand-light"
    >
      {`Crypto pair ${pair} coming soon ...ish`}
    </div>
  );
}
