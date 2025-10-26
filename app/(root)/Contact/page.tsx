import React from "react";
import Contact from "../../components/Contact"; 

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] text-white">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-5xl">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-16 px-4">
        <div className="max-w-[80rem] mx-auto text-center text-gray-500 text-sm relative z-10 pb-8">
          <div className="h-px w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 opacity-50 mb-6"></div>
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-yellow-400 font-semibold">Recoil</span> — Empowering creators and innovators worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
