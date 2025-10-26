"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Bookmark, X } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const navRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  // Ensure drawer width is compact on small phones (iPhone 12 ~ 390px viewport)
  const getDrawerWidth = () => {
    if (typeof window === "undefined") return 280;
    const w = Math.min(320, Math.floor(window.innerWidth * 0.78)); // max 320px, otherwise 78%
    return Math.max(260, w); // at least 260px
  };

  // Entrance animation for desktop nav items
  useEffect(() => {
    if (!navRef.current) return;
    const items = navRef.current.querySelectorAll(".nav-item, .logo, .auth-item");
    gsap.fromTo(
      items,
      { y: -12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" }
    );
  }, []);

  // Drawer open/close animation & focus trap basics
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;

    const width = getDrawerWidth();
    gsap.set(drawerRef.current, { x: width, width }); // start off-screen (to the right)

    const tl = gsap.timeline({ paused: true });
    tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.18, ease: "power1.out" }, 0);
    tl.to(drawerRef.current, { x: 0, duration: 0.36, ease: "power3.out" }, 0);

    if (open) {
      tl.play();
      document.body.style.overflow = "hidden";
      // set focus to first link inside drawer for a11y
      const first = drawerRef.current.querySelector<HTMLElement>("a,button");
      first?.focus();
    } else {
      tl.reverse();
      document.body.style.overflow = "auto";
    }

    // cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
      tl.kill();
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const userId = (session as any)?.user?.id ?? (session as any)?.id ?? "";
  const userImage = (session as any)?.user?.image ?? null;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    setOpen(false);
  };

  // helper to handle navigation from drawer (closes drawer)
  const handleNavClick = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <section
        ref={navRef}
        className="w-full py-5 bg-black/90 backdrop-blur-md border-b border-black/40 text-white"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 logo">
                <img src="/images/infinity.png" alt="Recoil" className="w-9 h-9 md:w-10 md:h-10" />
                <span className="font-bold text-xl md:text-2xl">Recoil</span>
              </Link>
            </div>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8 text-lg">
              <li className="nav-item">
                <Link href="/" className="relative inline-block group">
                  <span className="text-white group-hover:text-gray-200 transition">Home</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white rounded-full group-hover:w-full transition-all duration-200" />
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/services" className="relative inline-block group">
                  <span className="text-white group-hover:text-gray-200 transition">Services</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white rounded-full group-hover:w-full transition-all duration-200" />
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/Contact" className="relative inline-block group">
                  <span className="text-white group-hover:text-gray-200 transition">Contact</span>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white rounded-full group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
            </ul>

            {/* Desktop auth area */}
            <div className="hidden md:flex items-center gap-4 auth-item">
              {status === "loading" ? (
                <span className="text-sm text-gray-300">Loading...</span>
              ) : session?.user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href={`/Bookmark/${encodeURIComponent(String(userId))}`}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-400 to-orange-500 shadow"
                    title="Bookmarks"
                  >
                    <Bookmark className="w-5 h-5 text-black" />
                  </Link>

                  <Link
                    href="/Startup/Create"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow"
                    title="Create"
                  >
                    <Plus className="w-5 h-5 text-black" />
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium text-sm"
                  >
                    Logout
                  </button>

                  <Link href={`/User/${encodeURIComponent(String(userId))}`} className="flex items-center gap-2">
                    {userImage ? (
                      <img src={String(userImage)} alt="User" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                    )}
                    <span className="text-sm">{session.user?.name ?? "User"}</span>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile hamburger (solid black circle background) */}
            <div className="md:hidden flex items-center">
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="w-10 h-10 rounded-full bg-black shadow flex items-center justify-center border border-white/6"
              >
                {/* simple animated bars -> we animate transform via class toggles */}
                <div className="relative w-5 h-4">
                  <span
                    className={`absolute left-0 top-0 w-5 h-[2px] bg-white block transition-transform duration-300 ${open ? "translate-y-[8px] rotate-45" : ""}`}
                  />
                  <span
                    className={`absolute left-0 top-1.25 w-5 h-[2px] bg-white block transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
                  />
                  <span
                    className={`absolute left-0 bottom-0 w-5 h-[2px] bg-white block transition-transform duration-300 ${open ? "translate-y-[-8px] -rotate-45" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 opacity-0 pointer-events-none md:hidden z-40"
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        style={{ transition: "opacity 200ms ease" }}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className="fixed top-0 right-0 h-full bg-gray-900 md:hidden z-50 p-6 overflow-auto"
        aria-hidden={!open}
        role="dialog"
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between mb-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
            <img src="/images/infinity.png" alt="Recoil" className="w-8 h-8" />
            <span className="font-bold text-lg">Recoil</span>
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md bg-black/80">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <section className="flex flex-col gap-4 text-lg mb-6">
          <Link href="/" onClick={() => setOpen(false)} className="py-2">Home</Link>
          <Link href="/services" onClick={() => setOpen(false)} className="py-2">Services</Link>
          <Link href="/Contact" onClick={() => setOpen(false)} className="py-2">Contact</Link>
        </section>

        <div className="mt-auto pt-6 border-t border-gray-800">
          {session?.user ? (
            <>
              <Link
                href={`/Bookmark/${encodeURIComponent(String(userId))}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-3 text-yellow-400"
              >
                <Bookmark className="w-5 h-5" />
                <span>Bookmarks</span>
              </Link>

              <Link
                href="/Startup/Create"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-3 text-white"
              >
                <Plus className="w-5 h-5" />
                <span>Create Startup</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="w-full mt-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { signIn(); setOpen(false); }}
              className="w-full mt-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
            >
              Login
            </button>
          )}
        </div>
      </aside>
    </header>
  );
}
