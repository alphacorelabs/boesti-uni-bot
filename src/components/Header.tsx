import React from "react";
import bouestiLogo from "@/assets/bouesti-logo.png";

export const Header: React.FC = () => {
  return (
    <header className="header-academic py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <img src={bouestiLogo} alt="Bamidele Olumilua University Logo" className="h-16 md:h-20 object-contain" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3">BOUESTI Admission Inquiry Chatbot</h1>

        <p className="text-lg md:text-xl opacity-90 mb-4">Get instant answers about admissions, programs, and requirements</p>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
          <p className="text-sm">
            Developed by <span className="font-semibold">Egbeyemi Adeniyi Olorunfemi</span>
          </p>
          <p className="text-xs opacity-80">Computer Science Department • Bamidele Olumilua University (BOUESTI)</p>
        </div>
      </div>
    </header>
  );
};
