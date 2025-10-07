"use client"
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TitleHeaderProps {
  title: string;
  subscript?: string;
  showLine?: boolean;
  color_from?: string;
  color_to?: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({
  title,
  subscript,
  showLine = true,
  color_from = "#23161b",
  color_to = "#551b24",
}) => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      const h1 = headerRef.current.querySelector("h1");
      const p = headerRef.current.querySelector("p");
      const line = headerRef.current.querySelector(".header-line");

      if (h1) {
        tl.from(h1, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      if (p) {
        tl.from(
          p,
          {
            y: 40,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      if (showLine && line) {
        tl.from(
          line,
          {
            scaleX: 0,
            transformOrigin: "center",
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, [showLine]);

  return (
    <div ref={headerRef} className="text-center my-10">
      <h1 className="text-3xl xl:text-7xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
        {title}
      </h1>

      {subscript && (
        <p className="text-gray-500 xl:text-3xl text-base md:text-lg max-w-2xl mx-auto">
          {subscript}
        </p>
      )}

      {showLine && (
        <div
          className={`header-line mt-6 w-50 h-1 bg-gradient-to-r mx-auto rounded-full`}
          style={{
            backgroundImage: `linear-gradient(to right, ${color_from}, ${color_to})`,
          }}
        />
      )}
    </div>
  );
};

export default TitleHeader;
