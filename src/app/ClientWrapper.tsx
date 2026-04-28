"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // পেজ চেঞ্জ শুরু হলে লোডিং দেখাবে
    setIsLoading(true);

    // ১ সেকেন্ড পর লোডিং বন্ধ হবে
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      {isLoading && <Loading />}
      {/* লোডিং এর সময় পেজ যেন স্ক্রল না হয় বা জগাখিচুড়ি না লাগে তাই অপাসিটি কন্ট্রোল */}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </>
  );
}