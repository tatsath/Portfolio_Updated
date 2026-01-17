"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
            display: "none",
            color: "var(--text-headings)",
            fontSize: "28px",
            cursor: "pointer",
          }}
        >
          ☰
        </label>
        <ul
          className="menu"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            listStyle: "none",
            flexWrap: "wrap",
          }}
        >
          <li>
            <Link href="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/ai-interpretability" style={linkStyle}>
              AI Interpretability
            </Link>
          </li>
          <li>
            <Link href="/blog" style={linkStyle}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/#videos" style={linkStyle}>
              Videos
            </Link>
          </li>
          <li>
            <Link href="/#speaking" style={linkStyle}>
              Speaking
            </Link>
          </li>
          <li>
            <Link href="/#books" style={linkStyle}>
              Books
            </Link>
          </li>
          <li>
            <Link href="/#papers" style={linkStyle}>
              Papers
            </Link>
          </li>
          <li>
            <Link href="/#media" style={linkStyle}>
              Media
            </Link>
          </li>
          <li>
            <Link href="/#contact" style={linkStyle}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
