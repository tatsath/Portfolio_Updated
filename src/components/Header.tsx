"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
      if (window.innerWidth > 968) {
        setIsMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const linkStyle = {
    display: "block",
    padding: "10px 15px",
    fontSize: "17px",
    fontWeight: 500,
    transition: "var(--hover-transition)",
    color: "var(--text-primary)",
    position: "relative" as const,
  };

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backdropFilter: "blur(10px)",
        backgroundColor: "var(--bg-header)",
        boxShadow: "0 1px 5px var(--shadow-color)",
        zIndex: 1000,
        transition: "all 0.4s ease",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div className="logo">
          <Link
            href="/"
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "var(--text-headings)",
              letterSpacing: "-0.5px",
            }}
          >
            <span style={{ color: "var(--accent-primary)" }}>Hariom</span>{" "}
            Tatsat
          </Link>
        </div>
        <input
          type="checkbox"
          id="menu-toggle"
          checked={isMenuOpen}
          onChange={(e) => setIsMenuOpen(e.target.checked)}
          style={{ display: "none" }}
        />
        <label
          htmlFor="menu-toggle"
          className="menu-icon"
          style={{
            display: isMobile ? "block" : "none",
            color: "var(--text-headings)",
            fontSize: "28px",
            cursor: "pointer",
            zIndex: 1002,
          }}
        >
          {isMenuOpen ? "✕" : "☰"}
        </label>
        <ul
          className="menu"
          id="main-menu"
          style={{
            display: isMobile ? (isMenuOpen ? "flex" : "none") : "flex",
            justifyContent: isMobile ? "flex-start" : "center",
            alignItems: isMobile ? "stretch" : "center",
            gap: "8px",
            listStyle: "none",
            flexWrap: isMobile ? "nowrap" : "wrap",
            position: isMobile ? "absolute" : "relative",
            top: isMobile ? "100%" : "auto",
            left: isMobile ? 0 : "auto",
            right: isMobile ? 0 : "auto",
            backgroundColor: isMobile ? "var(--bg-main)" : "transparent",
            boxShadow: isMobile ? "0 4px 12px var(--shadow-color)" : "none",
            padding: isMobile ? "20px" : 0,
            margin: 0,
            border: isMobile ? "1px solid var(--text-secondary)" : "none",
            borderTop: isMobile ? "1px solid var(--text-secondary)" : "none",
            zIndex: 1001,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <li>
            <Link href="/" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/ai-interpretability" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              AI Interpretability
            </Link>
          </li>
          <li>
            <Link href="/financial-ai" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Financial AI
            </Link>
          </li>
          <li>
            <Link href="/#videos" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Videos
            </Link>
          </li>
          <li>
            <Link href="/#speaking" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Speaking
            </Link>
          </li>
          <li>
            <Link href="/#books" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Books
            </Link>
          </li>
          <li>
            <Link href="/#papers" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Papers
            </Link>
          </li>
          {/* <li>
            <Link href="/#media" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Media
            </Link>
          </li> */}
          <li>
            <Link href="/contact" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
