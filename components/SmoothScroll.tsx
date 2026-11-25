"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

const easing = (time: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * time));

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  if (reducedMotion !== false) return children;

  return (
    <ReactLenis root options={{ duration: 1.5, easing }}>
      {children}
    </ReactLenis>
  );
}
