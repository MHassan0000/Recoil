import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/app/components/Skeleton";
import UserStartups from "@/app/components/UserStartups";
import React, { Suspense } from "react";
import Image from "next/image";
import { CalendarDays, Mail, User2 } from "lucide-react";

export const revalidate = 60; // Revalidate this page every 60 seconds
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
    if (!user) return notFound();

    const userName = user.name ?? "Unknown user";
    const userUsername = user.username ?? "unknown";

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#0d0d0f] via-[#111113] to-[#18181b] text-white px-6 py-20 md:px-24 relative overflow-hidden">
            {/* Background Accent Blur */}
            <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-3xl rounded-full pointer-events-none" />

            {/* ===== Header ===== */}
            <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-3 py-2 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
                    {userName}
                </h1>
                <p className="text-gray-400 text-lg font-light">@{userUsername}</p>
            </div>

            {/* ===== Profile Card ===== */}
            <div className="max-w-7xl mx-auto bg-[#171717]/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-800/60 hover:border-yellow-400/40 transition-all duration-300 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Profile Image */}
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:shadow-yellow-500/30">
                            {user.image ? (
                                <Image
                                    src={user.image ? user.image : "/images/user.png"}
                                    alt={userName}
                                    width={160}
                                    height={160}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                                    <User2 size={48} />
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-yellow-400 to-amber-300 text-black text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                            Creator
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="flex-1 space-y-5 text-center md:text-left">
                        <h2 className="text-3xl font-semibold text-yellow-400">
                            About {userName}
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
                            {user?.bio || "This user hasn’t written a bio yet."}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-gray-400 text-sm mt-6 justify-center md:justify-start">
                            <span className="flex items-center gap-2">
                                <CalendarDays size={16} className="text-yellow-400" />
                                Joined{" "}
                                {formatDate(user._createdAt)}
                            </span>
                            <span className="flex items-center gap-2">
                                <Mail size={16} className="text-yellow-400" />
                                {user.email || "No public email"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent my-10" />

                {/* ===== User's Startups Section ===== */}
                <div>
                    <h3 className="text-3xl  font-extrabold text-yellow-400 mb-8 text-center ">
                        {userName}&apos;s Startups
                    </h3>
                    <Suspense fallback={<Skeleton className="h-8 w-48 rounded-md" />}>
                        <UserStartups id={id} authorName={userName} />
                    </Suspense>
                </div>
            </div>

            {/* ===== Footer Accent ===== */}
            <div className="max-w-5xl mx-auto mt-24 text-center text-gray-600 text-sm relative z-10">
                <div className="h-px w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 opacity-50 mb-6"></div>
                <p>
                    © {new Date().getFullYear()} <span className="text-yellow-400">Recoil</span> — Empowering creators and innovators worldwide.
                </p>
            </div>
        </section>
    );
};


