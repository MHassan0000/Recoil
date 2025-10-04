
"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
  const { data: session, status } = useSession()
  const navRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // entrance animation for desktop items
  useEffect(() => {
    if (!navRef.current) return
    const items = navRef.current.querySelectorAll("li, .logo, .auth-item, .menu-btn")
    gsap.fromTo(
      items,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    )
  }, [])

  // slide mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return
    gsap.to(mobileMenuRef.current, {
      x: isOpen ? 0 : "100%",
      duration: 0.45,
      ease: isOpen ? "power3.out" : "power3.in",
    })
  }, [isOpen])

  // session id fallback (some setups put id on session.id or session.user.id)
  const userId = (session as any)?.user?.id ?? (session as any)?.id ?? ""

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md">
      <nav
        ref={navRef}
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <div className="logo flex items-center gap-3">
          {/* public image path */}
          <img src="/images/infinity.png" alt="logo" width={44} height={44} className="object-contain" />
          <span className="text-xl font-bold">Recoil</span>
        </div>

        {/* Center links (desktop) */}
    <ul className={`hidden md:flex gap-8 text-lg ${session? "ml-10":""} `}>
          <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link href="/services" className="hover:text-gray-300">Services</Link></li>
          <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
        </ul>

        {/* Auth area (desktop) */}
        <div className="hidden md:flex items-center gap-4 auth-item">
          {status === "loading" ? (
            <span className="text-sm text-gray-300">Loading...</span>
          ) : session && session.user ? (
            <div className="flex items-center gap-4">
              <Link href="/startup/create" className="text-sm hover:text-gray-300 auth-item">Create</Link>

              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm"
              >
                Logout
              </button>

              <Link href={`/user/${encodeURIComponent(String(userId))}`} className="flex items-center gap-2 auth-item hover:opacity-90">
                {/* show avatar if available (basic <img> avoids next.config domains issues) */}
                {session.user?.image ? (
                  <img src={String(session.user.image)} alt="avatar" width={28} height={28} className="rounded-full object-cover" />
                ) : null}
                <span className="text-sm">{session.user?.name ?? "User"}</span>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-sm"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden menu-btn"
          onClick={() => setIsOpen(v => !v)}
          aria-label="Open menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 w-64 h-full bg-gray-800 p-6 transform translate-x-full md:hidden flex flex-col"
      >
        <button className="self-end text-white" onClick={() => setIsOpen(false)}>✕</button>

        <nav className="flex flex-col gap-4 mt-4 ">
          <Link href="/" className="text-lg">Home</Link>
          <Link href="/services" className="text-lg">Services</Link>
          <Link href="/contact" className="text-lg">Contact</Link>
        </nav>

        <div className="mt-auto">
          {session && session.user ? (
            <>
              <Link href="/startup/create" className="block mb-3">Create</Link>
              <button
                onClick={() => signOut()}
                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white mb-3"
              >
                Logout
              </button>
              <Link href={`/user/${encodeURIComponent(String(userId))}`} className="flex items-center gap-3">
                {session.user?.image ? (
                  <img src={String(session.user.image)} alt="avatar" width={36} height={36} className="rounded-full object-cover" />
                ) : null}
                <span>{session.user?.name ?? "User"}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
