"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
// Asegúrate de que esta ruta es correcta
import SignUp from "@/components/ui/sign_up";

export default function SignPage() {
  const [showSign, setShowSign] = useState(false);

  const toggleLogin = () => setShowSign(!showLogin);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
     

      <SignUp />
    </div>
  );
}
