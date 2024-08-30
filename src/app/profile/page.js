import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/ui/navbar";

const ProfileCard = dynamic(() => import("@/src/components/profile"), { ssr: false });

export default function Home() {
 
  
  return  <ProfileCard />;
}
