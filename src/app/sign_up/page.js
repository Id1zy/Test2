import React from "react";
import dynamic from "next/dynamic";

const SignPage = dynamic(() => import("@/src/components/sign_up"), { ssr: false });

export default function Home() {
  return <SignPage />;
}
