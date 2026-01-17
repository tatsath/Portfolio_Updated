"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
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

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (contactDropdownOpen && !target.closest('[data-header-contact-dropdown]')) {
        setContactDropdownOpen(false);
      }
    };

    if (contactDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contactDropdownOpen]);

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
            <Link href="/blog" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Blog
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
          <li>
            <Link href="/#media" style={linkStyle} onClick={() => setIsMenuOpen(false)}>
              Media
            </Link>
          </li>
          <li
            style={{
              position: "relative",
            }}
            data-header-contact-dropdown
          >
            <button
              onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
              data-header-contact-dropdown
              style={{
                ...linkStyle,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                width: isMobile ? "100%" : "auto",
                textAlign: isMobile ? "left" : "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-headings)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              Contact
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "10px",
                }}
              >
                {contactDropdownOpen ? "▲" : "▼"}
              </span>
            </button>
            {contactDropdownOpen && (
              <div
                data-header-contact-dropdown
                style={{
                  position: isMobile ? "relative" : "absolute",
                  top: isMobile ? "auto" : "100%",
                  right: isMobile ? "auto" : 0,
                  left: isMobile ? "auto" : "auto",
                  marginTop: isMobile ? "5px" : "5px",
                  backgroundColor: "var(--bg-main)",
                  border: "1px solid var(--text-secondary)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  minWidth: isMobile ? "100%" : "200px",
                  boxShadow: isMobile ? "none" : "0 2px 8px var(--shadow-color)",
                  zIndex: 1002,
                }}
              >
                <a
                  href="mailto:hariom_tatsat@mfe.berkeley.edu"
                  onClick={() => {
                    setContactDropdownOpen(false);
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    color: "var(--text-headings)",
                    textDecoration: "none",
                    fontSize: "15px",
                    borderBottom: "1px solid var(--text-secondary)",
                    transition: "var(--hover-transition)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-card)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Email
                </a>
                <a
                  href="https://topmate.io/hariom_t/642160?utm_source=public_profile&utm_campaign=hariom_t"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setContactDropdownOpen(false);
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    color: "var(--text-headings)",
                    textDecoration: "none",
                    fontSize: "15px",
                    transition: "var(--hover-transition)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-card)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Schedule a Meeting
                </a>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
