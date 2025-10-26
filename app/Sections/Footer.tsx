"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/90 text-gray-300 border-t border-gray-800 mt-20">
      <div
        className="
          max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10
          justify-items-center lg:justify-items-start
          text-center 
        "
      >
        {/* Brand */}
        <div>
          <div className="flex justify-center lg:justify-start items-center gap-3 mb-3">
            <img src="/images/infinity.png" alt="Recoil Logo" className="w-10 h-10" />
            <h2 className="text-2xl font-bold text-white">Recoil</h2>
          </div>
          <p className="text-gray-400 text-sm text-left sm:text-center leading-relaxed max-w-xs">
            Recoil connects startups and innovators worldwide — helping you share, discover, and grow together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-lg">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/Contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-lg">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3 text-lg">Connect With Us</h3>
          <div className="flex justify-center lg:justify-start gap-4 mb-4">
            <Link href="https://github.com" target="_blank" className="hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="mailto:support@recoil.com" className="hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-sm text-gray-400">
            Got questions? <br />
            <span className="text-white font-medium">support@recoil.com</span>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Recoil</span>. All rights reserved.
      </div>
    </footer>
  );
}
