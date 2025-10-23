import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import { CalendarDays, Mail, User2 } from "lucide-react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  const session = await auth();

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0e0e10] via-[#111] to-[#1a1a1d] text-white px-6 py-16 md:px-20">
      {/* ===== Header ===== */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          {user.name}
        </h1>
        <p className="text-gray-400 text-lg">@{user.username}</p>
      </div>

      {/* ===== Profile Card ===== */}
      <div className="max-w-4xl mx-auto bg-[#171717] rounded-3xl shadow-lg p-8 md:p-12 border border-gray-800">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg transition-transform duration-300 group-hover:scale-105">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                  <User2 size={48} />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Creator
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-5 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-yellow-400">
              About {user.name}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {user.bio || "This user hasn’t written a bio yet."}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-gray-400 text-sm mt-6">
              <span className="flex items-center gap-2">
                <CalendarDays size={16} />
                Joined{" "}
                {new Date(user._createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Mail size={16} />
                {user.email || "No public email"}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-10" />

        {/* ===== User's Startups Section ===== */}
        <div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center md:text-left">
            {user.name.split(" ")[0]}'s Startups
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {user.startups && user.startups.length > 0 ? (
              user.startups.map((startup: any) => (
                <a
                  key={startup._id}
                  href={`/startup/${startup._id}`}
                  className="group block bg-[#1e1e1e] border border-gray-800 rounded-2xl p-5 hover:border-yellow-400 hover:shadow-yellow-400/20 transition-all duration-300"
                >
                  <div className="h-40 w-full overflow-hidden rounded-xl mb-4">
                    {startup.image ? (
                      <img
                        src={startup.image}
                        alt={startup.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {startup.title}
                  </h4>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {startup.description || "No description available"}
                  </p>
                </a>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No startups found for this user.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===== Footer Accent ===== */}
      <div className="max-w-5xl mx-auto mt-20 text-center text-gray-600 text-sm">
        <div className="h-px w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 opacity-50 mb-6"></div>
        <p>
          © {new Date().getFullYear()} Recoil — Empowering creators and
          innovators worldwide.
        </p>
      </div>
    </section>
  );
};

export default Page;
