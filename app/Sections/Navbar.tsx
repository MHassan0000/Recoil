"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Bookmark } from "lucide-react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const navRef = useRef<HTMLDivElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

  
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
  const userImage = (session as any)?.user?.image || null

  return (
    <header className="xl:py-4 py-2 w-full bg-black/80 backdrop-blur-md text-white shadow-md">
      <nav
        ref={navRef}
        className="w-full mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <div className="logo flex items-center gap-3 cursor-pointer">
          <Link href={"/"}>
            <img src="/images/infinity.png" alt="logo" className="w-[60px] xl:w-[75px]" />
          </Link>
          <Link href={"/"}>
            <span className="text-3xl xl:text-5xl font-bold hover:text-gray-400">Recoil</span>
          </Link>
        </div>

        {/* Center links (desktop) */}
        <ul className={`hidden md:flex gap-8 text-lg xl:text-xl ${session ? "ml-10" : ""}`}>
          <li>
            <Link href="/" className="relative group transition-all duration-300">
              <span className="text-white group-hover:text-gray-200 transition-colors duration-300">
                Home
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link href="/services" className="relative group transition-all duration-300">
              <span className="text-white group-hover:text-gray-200 transition-colors duration-300">
                Services
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
          <li>
            <Link href="/studio" className="relative group transition-all duration-300">
              <span className="text-white group-hover:text-gray-200 transition-colors duration-300">
                Studio
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </li>
        </ul>

        {/* Auth area (desktop) */}
        <div className="hidden md:flex items-center gap-5 auth-item">
          {status === "loading" ? (
            <span className="text-sm text-gray-300">Loading...</span>
          ) : session && session.user ? (
            <div className="flex items-center gap-5">
              {/* Bookmark Button */}
              <Link
                href={`/Bookmark/${encodeURIComponent(String(userId))}`}
                className="relative group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:scale-110"
                title="Bookmarks"
              >
                <Bookmark className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
              </Link>

              {/* Create Button */}
              <Link
                href="/Startup/Create"
                className="relative group flex items-center justify-center w-10 h-10 rounded-full bg-white transition-all duration-300 shadow-lg hover:scale-110"
              >
                <Plus className="w-5 h-5 text-black group-hover:rotate-90 transition-transform duration-300" />
              </Link>

              <button
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push("/");
                }}
                className="px-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium py-2 rounded-xl
             shadow-md shadow-red-900/50 hover:shadow-lg hover:shadow-red-700/60
             hover:from-red-500 hover:to-red-600 transform hover:-translate-y-[1px]
             transition-all duration-300"
              >
                Logout
              </button>

              <Link
                href={`/User/${encodeURIComponent(String(userId))}`}
                className="flex items-center gap-2 auth-item hover:opacity-90"
              >
                {userImage && (
                  <img
                    src={String(userImage) ? String(userImage) : "/images/user.png"}
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-full object-cover filter-invert"
                  />
                )}
                <span className="text-sm">{session.user?.name ?? "User"}</span>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-2 rounded-xl
             shadow-md shadow-blue-900/50 hover:shadow-lg hover:shadow-blue-700/60
             hover:from-blue-500 hover:to-blue-600 transform hover:-translate-y-[1px]
             transition-all duration-300"
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
              {/* Bookmark Button (Mobile) */}
              <Link
                href={`/Bookmark/${encodeURIComponent(String(userId))}`}
                className="flex items-center justify-start gap-3 py-2 text-yellow-400 hover:text-yellow-500 transition-colors mb-3"
              >
                <Bookmark className="w-5 h-5" />
                <span>Bookmarks</span>
              </Link>

              <Link
                href="/Startup/Create"
                className="mb-4 w-5 h-5 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg hover:scale-105"
              >
                <Plus className="w-2 h-2 text-black" />
              </Link>

              <button
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push("/");
                }}
                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white mb-3"
              >
                Logout
              </button>

              <Link
                href={`/User/${encodeURIComponent(String(userId))}`}
                className="flex items-center gap-3"
              >
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
              onClick={() => signIn()}
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
