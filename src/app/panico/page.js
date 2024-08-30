import React from "react";
import dynamic from "next/dynamic";

// Cargar Hero dinámicamente con SSR deshabilitado
const Hero = dynamic(() => import("@/src/components/hero"), { ssr: false });

export default function Home() {
  return <Hero />;
}
