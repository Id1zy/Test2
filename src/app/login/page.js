import React from "react";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/src/components/login"), { ssr: false });

export default function Home() {
  return <Login />;
}
