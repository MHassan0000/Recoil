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

  // Entrance animation
  useEffect(() => {
    if (!navRef.current) return
    const items = navRef.current.querySelectorAll("li, .logo, .auth-item, .menu-btn")
    gsap.fromTo(
      items,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
    )
  }, [])

  // Slide mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return
    gsap.to(mobileMenuRef.current, {
      x: isOpen ? 0 : "100%",
      duration: 0.45,
      ease: isOpen ? "power3.out" : "power3.in",
    })
  }, [isOpen])

  const userId = (session as any)?.user?.id ?? (session as any)?.id ?? ""
  const userImage = (session as any)?.user?.image || (session as any)?.user?.picture || null

  return (
    <header className="py-5 mt-5 xl:mt-3 bg-black text-white shadow-md">
      <nav
        ref={navRef}
        className="w-full mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <div className="logo flex items-center gap-3">
          <img src="/images/infinity.png" alt="logo" className="w-[60px] xl:w-[75px]" />
          <span className="text-3xl xl:text-5xl font-bold cursor-pointer"><Link href={"/"}>Recoil</Link></span>
        </div>

        {/* Center links (desktop) */}
        <ul className={`hidden md:flex gap-8 text-lg xl:text-xl ${session ? "ml-10" : ""}`}>
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
                {userImage && (
                  <img
                    src={String(userImage)}
                    alt="avatar"
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                )}
                <span className="text-sm">{session.user?.name ?? "User"}</span>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => signIn()} // opens NextAuth provider selection modal
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full text-sm"
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

        <nav className="flex flex-col gap-4 mt-4">
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
                {userImage && (
                  <img
                    src={String(userImage)}
                    alt="avatar"
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                )}
                <span>{session.user?.name ?? "User"}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn()} // same modal for both Google & GitHub
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
