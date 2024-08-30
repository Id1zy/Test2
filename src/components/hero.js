"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import MapComponent from "@/components/ui/map";
import Navbar from "@/components/ui/navbar";

export default function Hero() {
  const [isPanic, setIsPanic] = useState(false);

  const handlePanic = () => {
    setIsPanic(true);
    console.log("PANIC BUTTON PRESSED!");
  };

  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center justify-start text-white ">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center mt-12">
        Servicio de Emergencia
      </h1>
      <p className="text-xl md:text-2xl mb-12 text-center max-w-2xl">
        en caso de Emergencia, apretar el boton.
      </p>
      <Button
        variant="destructive"
        size="lg"
        className={`w-48 h-48 rounded-full text-2xl font-bold shadow-lg transition-all duration-300 ease-in-out ${
          isPanic
            ? "animate-pulse bg-yellow-500"
            : "hover:bg-red-600 hover:scale-105"
        }`}
        onClick={handlePanic}
      >
        {isPanic ? "PANICKING!" : "PANIC"}
        <AlertCircle className="ml-2 h-6 w-6" />
      </Button>
      {isPanic && (
        <>
          <p className="mt-8 text-xl animate-bounce">
            Marcando al lugar mas cercano!
          </p>
          <div className="mt-12 w-full max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Mapa</h2>
            <MapComponent />
            <div className="mt-4 flex justify-around">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2" />
                <span>Hospital</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2" />
                <span>Police Station</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2" />
                <span>Fire Station</span>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
