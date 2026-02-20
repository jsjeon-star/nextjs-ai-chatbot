import { Suspense } from "react";
import { ArtTravelerPassport } from "@/components/art-traveler-passport";

export default function ArtTravelerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ArtTravelerPassport />
    </Suspense>
  );
}
