import {auth} from "@/auth"
import { redirect } from "next/navigation";
import StartupForm from "../../../components/StartupForm";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
  <section className="relative min-h-screen bg-gradient-to-b from-[#0e0e10] via-[#111] to-[#1a1a1d] text-white px-4 sm:px-6 py-12 md:px-20 flex flex-col items-center justify-center">
      {/* ====== Gradient Overlay Accent ====== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.15),transparent_70%)] pointer-events-none" />

      {/* ====== Header ====== */}
      <div className="text-center max-w-3xl mb-14 z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          <span className="text-yellow-400">Submit</span> Your Startup
        </h1>
        <p className="text-gray-400 text-lg">
          Share your vision, pitch your idea, and get discovered by thousands of entrepreneurs and investors.
        </p>
      </div>

      {/* ====== Form Container ====== */}
      <div
        className="relative z-10 w-full max-w-full sm:max-w-2xl md:max-w-3xl bg-[#171717]/70 backdrop-blur-md
        border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12
        transition-transform duration-300 hover:scale-[1.01]"
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-full opacity-70"></div>

        <h2 className="text-2xl font-semibold text-yellow-400 mb-6 text-center">
          Enter Your Startup Details
        </h2>

        {/* Startup form will go here */}
        <StartupForm />
      </div>

      {/* ====== Footer Note ====== */}
      <p className="text-gray-600 text-sm mt-16 z-10">
        Your data is safe with us — submitted startups are reviewed before being published.
      </p>
    </section>
  );
};

export default Page;
