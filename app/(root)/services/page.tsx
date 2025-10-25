// /app/services/page.tsx
import React from "react";
import Link from "next/link";
import {
  Rocket,
  Users,
  TrendingUp,
  Handshake,
  ServerCog,
  Search,
  CheckCircle,
} from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050506] text-gray-200 px-6 md:px-16 lg:px-28 py-20">
      {/* HERO */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500">
          Our Services
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mx-auto max-w-3xl leading-relaxed">
          Recoil helps founders present, grow and validate their ideas. Our platform combines discovery,
          community feedback, and lightweight analytics so your startup can get momentum — without the noise.
        </p>
      </section>

      {/* FEATURE GRID */}
      <section className="max-w-7xl mx-auto mb-24">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Pitch Presentation",
              desc:
                "Create a structured pitch with images, summary, team info and a clear call-to-action. Designed to convert visitors into followers.",
              icon: <Rocket className="w-6 h-6" />,
            },
            {
              title: "Community & Networking",
              desc:
                "Connect with founders, mentors and early users — start conversations, find cofounders and recruit contributors.",
              icon: <Users className="w-6 h-6" />,
            },
            {
              title: "Discovery & Categories",
              desc:
                "Smart discovery surfaces startups by category, interest, and traction so the right audience finds you fast.",
              icon: <Search className="w-6 h-6" />,
            },
            {
              title: "Engagement Analytics",
              desc:
                "Simple, useful metrics — views, bookmarks and trends — to measure how your pitch resonates and where to focus.",
              icon: <TrendingUp className="w-6 h-6" />,
            },
            {
              title: "Collaboration Tools",
              desc:
                "Share updates, gather feedback and iterate publicly or privately with teammates and advisors.",
              icon: <Handshake className="w-6 h-6" />,
            },
            {
              title: "Secure Platform",
              desc:
                "We use hardened hosting and sensible defaults to keep your data safe while providing a fast UX.",
              icon: <ServerCog className="w-6 h-6" />,
            },
          ].map((f) => (
            <article
              key={f.title}
              className="group bg-[#0f0f10] border border-white/6 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-400/10 transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-none w-12 h-12 rounded-lg bg-gradient-to-tr from-yellow-400 to-orange-400 text-black flex items-center justify-center shadow-sm">
                  {f.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US - horizontal cards */}
      <section className="max-w-6xl mx-auto mb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Why Recoil</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <div className="p-6 bg-[#0e0e10] border border-white/6 rounded-xl">
            <h4 className="text-lg font-semibold text-yellow-400 mb-2">Focused Visibility</h4>
            <p className="text-gray-400 text-sm">
              We prioritize targeted exposure — connect with users and partners who care about your domain.
            </p>
          </div>

          <div className="p-6 bg-[#0e0e10] border border-white/6 rounded-xl">
            <h4 className="text-lg font-semibold text-pink-400 mb-2">Actionable Signals</h4>
            <p className="text-gray-400 text-sm">
              Bookmarks and views are surfaced in an actionable way so you can iterate quickly and with confidence.
            </p>
          </div>

          <div className="p-6 bg-[#0e0e10] border border-white/6 rounded-xl">
            <h4 className="text-lg font-semibold text-green-400 mb-2">Community First</h4>
            <p className="text-gray-400 text-sm">
              A moderated, high-signal community helps you get feedback instead of noise — meaningful growth, not vanity.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (steps) */}
      <section className="max-w-5xl mx-auto mb-28">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">How it works</h2>

        <ol className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 md:items-start">
          {[
            {
              step: "Create your profile",
              desc:
                "Sign up and complete your founder profile so people know who you are and what you build.",
            },
            {
              step: "Submit a concise pitch",
              desc:
                "Use the Create Startup flow to submit title, short description, category and an illustrative image.",
            },
            {
              step: "Engage and iterate",
              desc:
                "Share updates, respond to feedback, and track simple engagement metrics to refine your story.",
            },
          ].map((s, i) => (
            <li
              key={s.step}
              className="bg-[#0f0f10] rounded-xl p-6 border border-white/6"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center text-black">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-md font-semibold text-white">{s.step}</h3>
              </div>
              <p className="text-sm text-gray-400">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto text-center mb-24">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to share your pitch?
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Submit your startup and connect with an audience of founders, mentors and early supporters.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/Startup/Create"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-black font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-500 transition"
          >
            Submit your startup
          </Link>

          <Link
            href="/startups"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-white border border-white/10 hover:bg-white/5 transition text-sm"
          >
            Browse startups
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto mb-28">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">What founders say</h3>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {[
            {
              quote:
                "Posting on Recoil helped us find two early adopters who became part of our pilot program.",
              name: "Aisha Malik — Founder, BloomTech",
            },
            {
              quote:
                "The feedback we received allowed us to prioritize features before launch.",
              name: "David Chen — Co-founder, CodeSphere",
            },
            {
              quote:
                "A focused, high-quality community — the kind of place I enjoy sharing progress.",
              name: "Sofia Rodriguez — Product Designer, LumiLabs",
            },
          ].map((t, i) => (
            <blockquote
              key={i}
              className="bg-[#0f0f10] p-6 rounded-xl border border-white/6 text-gray-300"
            >
              <p className="mb-4 text-sm leading-relaxed">“{t.quote}”</p>
              <footer className="text-xs text-gray-500">{t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto mb-20">
        <h3 className="text-2xl font-bold text-white mb-6">Frequently asked questions</h3>
        <div className="space-y-4">
          <details className="bg-[#0f0f10] p-4 rounded-lg border border-white/6">
            <summary className="cursor-pointer text-white font-medium">Who can submit a startup?</summary>
            <p className="mt-3 text-sm text-gray-400">
              Any registered user can submit a pitch. We encourage clear, honest descriptions and accurate category selection.
            </p>
          </details>

          <details className="bg-[#0f0f10] p-4 rounded-lg border border-white/6">
            <summary className="cursor-pointer text-white font-medium">Can I update my pitch?</summary>
            <p className="mt-3 text-sm text-gray-400">
              Yes — you can update your pitch details and images at any time to reflect product changes or milestones.
            </p>
          </details>

          <details className="bg-[#0f0f10] p-4 rounded-lg border border-white/6">
            <summary className="cursor-pointer text-white font-medium">How do bookmarks work?</summary>
            <p className="mt-3 text-sm text-gray-400">
              Bookmarks save startups to your profile for later. Removing a bookmark deletes it from your saved list immediately.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
