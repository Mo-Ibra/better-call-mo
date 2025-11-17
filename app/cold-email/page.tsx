import ColdEmailClient from "@/components/ColdEmailClient";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ColdEmailPage() {
  return (
    <ColdEmailClient />
  );
}
