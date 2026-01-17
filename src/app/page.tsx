"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";

declare global {
  interface Window {
    AOS: {
      init: (options: {
        duration?: number;
        easing?: string;
        once?: boolean;
      }) => void;
    };
  }
}

export default function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("All Years");

  useEffect(() => {
    // Initialize AOS from CDN
    const initAOS = () => {
      if (typeof window !== "undefined" && window.AOS) {
        window.AOS.init({
          duration: 800,
          easing: "ease-in-out-quad",
          once: true,
        });
      } else {
        // Retry if AOS not loaded yet
        setTimeout(initAOS, 100);
      }
    };
    initAOS();

    // Back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Particle animation
    const particlesContainer = document.getElementById("particles-js");
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.width = `${Math.random() * 4 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        const animName = `particleAnim${i}`;
        const styleSheet = document.styleSheets[0];

        const keyframes = `@keyframes ${animName} {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: ${Math.random() * 0.1 + 0.1};
          }
          50% { 
            transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(${Math.random() * 0.3 + 0.7}); 
            opacity: ${Math.random() * 0.05 + 0.05};
          }
        }`;

        try {
          if (styleSheet && typeof (styleSheet as any).insertRule === "function") {
            (styleSheet as any).insertRule(keyframes, styleSheet.cssRules.length);
            particle.style.animation = `${animName} ${Math.random() * 15 + 10}s linear infinite`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
          }
        } catch (e) {
          console.warn("Could not insert particle animation rule:", e);
        }
        particlesContainer.appendChild(particle);
      }
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (contactDropdownOpen && !target.closest('[data-contact-dropdown]')) {
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

  const containerStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "15px",
    paddingRight: "15px",
    maxWidth: "1200px",
    width: "100%",
  };

  const cardSectionStyle = {
    padding: "80px 0",
  };

  const ctitleStyle = {
    fontSize: "36px",
    marginBottom: "40px",
    textAlign: "center" as const,
    fontWeight: 700,
    color: "var(--text-headings)",
    position: "relative" as const,
    paddingBottom: "15px",
  };

  const cardContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
  };

  const cardStyle = {
    borderRadius: "12px",
    overflow: "hidden" as const,
    boxShadow: "var(--card-shadow)",
    transition: "var(--hover-transition)",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: "85px" }}>
        {/* Hero Section */}
        <section
          id="hero"
          style={{
            paddingTop: "100px",
            paddingBottom: "60px",
            minHeight: "auto",
            position: "relative",
            overflow: "hidden",
            background: "var(--bg-main)",
          }}
        >
          <div
            className="hero-particles"
            id="particles-js"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.3,
            }}
          />
          
          {/* Background Image - Positioned on Right Side, Showing More of Left Side */}
          <div
            className="hero-background-image"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "50%",
              height: "100%",
              zIndex: 1,
              pointerEvents: "none",
              backgroundImage: "url('/assets/htny.webp')",
              backgroundSize: "cover",
              backgroundPosition: "70% center",
              backgroundRepeat: "no-repeat",
              opacity: 1.0,
            }}
          />

          <div className="container" style={{ ...containerStyle, maxWidth: "1400px", position: "relative", zIndex: 2 }}>
            {/* Hero Content Grid - Text Left, Image Right */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "60px",
                alignItems: "center",
                minHeight: "400px",
              }}
              className="hero-content-grid"
            >
              {/* Left Side - Text Content */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "var(--bg-main)",
                  padding: "40px",
                  borderRadius: "8px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Name and Title Section */}
                <div
                  style={{
                    textAlign: "left",
                    marginBottom: "40px",
                  }}
                  className="hero-title-section"
                >
                  <h1
                    style={{
                      fontSize: "clamp(36px, 8vw, 64px)",
                      fontWeight: 700,
                      color: "var(--text-headings)",
                      margin: "0 0 20px 0",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      lineHeight: 1.1,
                    }}
                  >
                    HARIOM TATSAT
                  </h1>
                  <div
                    style={{
                      fontSize: "clamp(12px, 2vw, 16px)",
                      fontWeight: 500,
                      color: "var(--text-headings)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "15px",
                      justifyContent: "flex-start",
                    }}
                  >
                    <span>AUTHOR</span>
                    <span style={{ color: "var(--text-secondary)" }}>|</span>
                    <span>AI QUANT</span>
                    <span style={{ color: "var(--text-secondary)" }}>|</span>
                    <span>ADVISOR</span>
                    <span style={{ color: "var(--text-secondary)" }}>|</span>
                    <span>STOIC</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                <a
                  href="https://github.com/tatsath"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "transparent",
                    color: "var(--text-primary)",
                    border: "1px solid var(--text-secondary)",
                    transition: "var(--hover-transition)",
                    fontSize: "16px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--text-primary)";
                    e.currentTarget.style.color = "var(--bg-main)";
                    e.currentTarget.style.borderColor = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.borderColor = "var(--text-secondary)";
                  }}
                >
                  <i className="fab fa-github" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hariomtatsat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "transparent",
                    color: "var(--text-primary)",
                    border: "1px solid var(--text-secondary)",
                    transition: "var(--hover-transition)",
                    fontSize: "16px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--text-primary)";
                    e.currentTarget.style.color = "var(--bg-main)";
                    e.currentTarget.style.borderColor = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.borderColor = "var(--text-secondary)";
                  }}
                >
                  <i className="fab fa-linkedin-in" />
                </a>
                <a
                  href="https://x.com/HariomTatsat24"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "transparent",
                    color: "var(--text-primary)",
                    border: "1px solid var(--text-secondary)",
                    transition: "var(--hover-transition)",
                    fontSize: "16px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--text-primary)";
                    e.currentTarget.style.color = "var(--bg-main)";
                    e.currentTarget.style.borderColor = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.borderColor = "var(--text-secondary)";
                  }}
                >
                  <i className="fab fa-twitter" />
                </a>
              </div>
                </div>

                {/* Biography Section */}
                <div
                  style={{
                    marginTop: "30px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(16px, 2.5vw, 18px)",
                      color: "var(--text-primary)",
                      lineHeight: 1.8,
                      marginBottom: "20px",
                      textAlign: "left",
                    }}
                  >
                    Hariom has years of experience bridging AI, machine learning and quantitative techniques with Finance. He is an O'Reilly author and published researcher. He advises startups and has been a featured speaker at several conferences and industry forums. He received the Indian Achiever Award in Machine Learning (2023). Hariom has performed several research in neuroscience-inspired mechanistic interpretability in the context of responsible AI. He has a deep interest in physics, philosophy and simulation hypothesis.
                  </p>
                </div>
              </div>

              {/* Right Side - Empty space for background image to show through */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div
          style={{
            width: "100%",
            padding: "80px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              maxWidth: "800px",
              height: "2px",
              background: "linear-gradient(to right, transparent, var(--text-primary), var(--text-primary), transparent)",
              opacity: 0.4,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--text-primary)",
                opacity: 0.6,
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        {/* Videos and Podcasts Section */}
        <section
          id="videos"
          style={{
            padding: "80px 0",
            backgroundColor: "var(--bg-main)",
          }}
        >
          <div className="container" style={containerStyle}>
            <div className="ctitle" style={ctitleStyle}>
              Videos and Podcasts
              </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
                marginTop: "40px",
              }}
            >
              {/* Video: AI Interpretability - 2025 (Latest) */}
              <div
                className="card"
                data-aos="fade-up"
                style={{
                  ...cardStyle,
                  border: "2px solid var(--accent-primary)",
                }}
              >
                <a
                  href="https://www.youtube.com/watch?v=aZbXdcbx93E"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="ccimg"
                    style={{
                  overflow: "hidden",
                      position: "relative",
                      height: "200px",
                }}
              >
                <img
                      src="/assets/Interp_Vegas.png"
                      alt="AI Interpretability"
                  style={{
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.5s ease",
                        objectFit: "cover",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        padding: "6px 12px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderRadius: "4px",
                      }}
                    >
                      Conference Video
              </div>
                  </div>
                </a>
              <div
                  className="cdesc"
                style={{
                    padding: "25px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "10px",
                    }}
                  >
                    Conference Video · AI4 2025
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "8px",
                    }}
                  >
                    AI Interpretability in Finance
                  </h3>
                  <p
                  style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    2025
                  </p>
              </div>
              </div>

              {/* Video: Harnessing data for AI Use Cases - 2024 */}
              <div
                className="card"
                data-aos="fade-up"
                data-aos-delay="100"
                style={{
                  ...cardStyle,
                  border: "2px solid var(--accent-primary)",
                }}
              >
                <a
                  href="https://www.youtube.com/watch?v=w5M4AaVTVoQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="ccimg"
                    style={{
                  overflow: "hidden",
                      position: "relative",
                      height: "200px",
                }}
              >
                <img
                      src="/assets/aug14.png"
                      alt="AI Use Cases in Finance"
                  style={{
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.5s ease",
                        objectFit: "cover",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        padding: "6px 12px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderRadius: "4px",
                      }}
                    >
                      Conference Video
              </div>
                  </div>
                </a>
              <div
                  className="cdesc"
                style={{
                    padding: "25px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "10px",
                    }}
                  >
                    Conference Video · AI Summit New York
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "8px",
                    }}
                  >
                    Harnessing data for AI Use Cases in Finance
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    2024
                  </p>
                </div>
              </div>

              {/* Video: Webinar on AI and ML in Finance - 2021 */}
              <div
                className="card"
                data-aos="fade-up"
                data-aos-delay="200"
                style={{
                  ...cardStyle,
                  border: "2px solid var(--accent-primary)",
                }}
              >
                <a
                  href="https://www.youtube.com/watch?v=X-VjX4Nt0_Q&t=622s"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                }}
              >
                <img
                      src="/assets/Featuredtalk4.jpeg"
                      alt="Webinar on AI and ML in Finance"
                  style={{
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.5s ease",
                        objectFit: "cover",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        padding: "6px 12px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderRadius: "4px",
                      }}
                    >
                      Webinar Video
              </div>
            </div>
                </a>
            <div
                  className="cdesc"
              style={{
                    padding: "25px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "10px",
                    }}
                  >
                    Webinar Video · AI and Machine Learning
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "8px",
                    }}
                  >
                    Webinar on AI and Machine Learning in Finance
                  </h3>
              <p
                style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    2021
                  </p>
                </div>
            </div>

              {/* Video: Machine Learning in Finance - 2021 */}
            <div
                className="card"
                data-aos="fade-up"
                data-aos-delay="300"
              style={{
                  ...cardStyle,
                  border: "2px solid var(--accent-primary)",
              }}
            >
              <a
                  href="https://www.youtube.com/watch?v=nxu129vN82s&t=163s"
                target="_blank"
                rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="ccimg"
                style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/ds.webp"
                      alt="Machine Learning in Finance"
                style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                }}
                onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        padding: "6px 12px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "11px",
                        fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                        borderRadius: "4px",
                      }}
                    >
                      Tutorial Video
            </div>
          </div>
                </a>
                <div
                  className="cdesc"
          style={{
                    padding: "25px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
            backgroundColor: "var(--bg-card)",
          }}
        >
            <div
              style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "10px",
                    }}
                  >
                    Tutorial Video · Machine Learning
                  </div>
                  <h3
                style={{
                      fontSize: "18px",
                  fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "8px",
                    }}
                  >
                    Machine Learning in Finance
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                  color: "var(--text-secondary)",
                }}
              >
                    2021
                  </p>
              </div>
              </div>

              {/* Video: Reinforcement Learning for Trading - 2021 */}
              <div
                className="card"
                data-aos="fade-up"
                data-aos-delay="400"
                style={{
                  ...cardStyle,
                  border: "2px solid var(--accent-primary)",
                }}
              >
                <a
                  href="https://www.youtube.com/watch?v=Jknlz0m13ZM&t=250s"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="ccimg"
                style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/rein.png"
                      alt="Reinforcement Learning for Trading"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
              <div
                style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        padding: "6px 12px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "11px",
                  fontWeight: 600,
                        textTransform: "uppercase",
                  letterSpacing: "0.1em",
                        borderRadius: "4px",
                }}
              >
                      Tutorial Video
              </div>
                  </div>
                </a>
              <div
                  className="cdesc"
                style={{
                    padding: "25px",
                    flexGrow: 1,
                  fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
              <div
                style={{
                      fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                      marginBottom: "10px",
                }}
              >
                    Tutorial Video · Reinforcement Learning
              </div>
                  <h3
          style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "8px",
                    }}
                  >
                    Reinforcement Learning for Trading
                  </h3>
                  <p
              style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    2021
                  </p>
                </div>
              </div>

              {/* Podcast: Reinforcement Learning in Finance - 2024 */}
              <div
                className="card"
                data-aos="fade-up"
                data-aos-delay="500"
                style={{
                  ...cardStyle,
                  border: "2px solid var(--accent-primary)",
                }}
              >
                <a
                  href="https://open.spotify.com/episode/0qmbifSURd4wVL29mv10gY?si=b33497739d2b4342&nd=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/sp.jpg"
                      alt="Podcast"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        padding: "6px 12px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderRadius: "4px",
                      }}
                    >
                      Podcast
                    </div>
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "25px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "10px",
                    }}
                  >
                    Podcast · Reinforcement Learning in Finance
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "8px",
                    }}
                  >
                    AI in Finance Podcast
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    2024
                  </p>
                </div>
              </div>

              {/* Podcast: FINCIRCLE AI Democratization - 2024 */}
              <div
                className="card"
                data-aos="fade-up"
                data-aos-delay="600"
                style={{
                  ...cardStyle,
                  border: "2px solid var(--accent-primary)",
                }}
              >
                <a
                  href="https://podcasts.apple.com/ph/podcast/ai-democratization/id1525554695?i=1000535643697"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/Fincircle pocast.png"
                      alt="FINCIRCLE Podcast"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        padding: "6px 12px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderRadius: "4px",
                      }}
                    >
                      Podcast
                    </div>
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "25px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "10px",
                    }}
                  >
                    Podcast · FINCIRCLE
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "8px",
                    }}
                  >
                    AI Democratization
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    2024
                  </p>
                </div>
              </div>

              {/* Podcast: Machine Learning in Finance - 2021 */}
              <div
                className="card"
                data-aos="fade-up"
                data-aos-delay="700"
                style={{
                  ...cardStyle,
                  border: "2px solid var(--accent-primary)",
                }}
              >
                <a
                  href="https://open.spotify.com/episode/6o9KcGXHwkaBuENykDpKKy?si=de471563ad384da2&nd=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/podcast2.png"
                      alt="Podcast ML in Finance"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "15px",
                        padding: "6px 12px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "11px",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderRadius: "4px",
                      }}
                    >
                      Podcast
                    </div>
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "25px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                      marginBottom: "10px",
                    }}
                  >
                    Podcast · Machine Learning in Finance
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "8px",
                    }}
                  >
                    Machine Learning in Finance Podcast
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                    }}
                  >
                    2021
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator */}
        <div
          style={{
            width: "100%",
            padding: "80px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              maxWidth: "800px",
              height: "2px",
              background: "linear-gradient(to right, transparent, var(--text-primary), var(--text-primary), transparent)",
              opacity: 0.4,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--text-primary)",
                opacity: 0.6,
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        {/* Experience Timeline - DISABLED (can be re-enabled in future) */}
        {/* To re-enable, change {false && ( to {true && ( */}
        {false && (
        <div
          id="history"
          className="card-section"
          style={{ ...cardSectionStyle, backgroundColor: "var(--bg-card)" }}
        >
          <div className="container" style={containerStyle}>
            <div
              className="ctitle"
              style={{
                ...ctitleStyle,
              }}
            >
              Professional Experience
            </div>

            {/* Experience Entry 1 */}
            <div
              className="entry row"
              data-aos="fade-up"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "30px",
                marginBottom: "40px",
              }}
            >
              <div
                className="timespan"
                style={{
                  gridColumn: "span 2",
                  fontSize: "16px",
                  textAlign: "right",
                  paddingRight: "25px",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                }}
              >
                2017 - Present
              </div>
              <div
                className="ico"
                style={{
                  gridColumn: "span 1",
                  borderLeft: "2px solid var(--accent-primary)",
                  position: "relative",
                  height: "100%",
                  minHeight: "100px",
                }}
              >
                <div
                  className="entry-dot"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-10px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-main)",
                    border: "3px solid var(--accent-primary)",
                    zIndex: 2,
                  }}
                />
                <img
                  src="/assets/barclays.jpeg"
                  alt="Barclays"
                  style={{
                    borderRadius: "10px",
                    width: "60px",
                    marginLeft: "20px",
                    boxShadow: "var(--card-shadow)",
                  }}
                />
              </div>
              <div
                className="desc"
                style={{
                  gridColumn: "span 9",
                  paddingLeft: "20px",
                  paddingBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "22px",
                    marginBottom: "10px",
                    color: "var(--text-headings)",
                  }}
                >
                  Vice President at Barclays Investment Bank, NY
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  Leading data-driven decision-making using statistics, machine
                  learning and AI.
                </p>
              </div>
            </div>

            {/* Experience Entry 2 */}
            <div
              className="entry row"
              data-aos="fade-up"
              data-aos-delay="100"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "30px",
                marginBottom: "40px",
              }}
            >
              <div
                className="timespan"
                style={{
                  gridColumn: "span 2",
                  fontSize: "16px",
                  textAlign: "right",
                  paddingRight: "25px",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                }}
              >
                2014 - 2016
              </div>
              <div
                className="ico"
                style={{
                  gridColumn: "span 1",
                  borderLeft: "2px solid var(--accent-primary)",
                  position: "relative",
                  height: "100%",
                  minHeight: "100px",
                }}
              >
                <div
                  className="entry-dot"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-10px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-main)",
                    border: "3px solid var(--accent-primary)",
                    zIndex: 2,
                  }}
                />
                <img
                  src="/assets/FAB.jpeg"
                  alt="FAB"
                  style={{
                    borderRadius: "10px",
                    width: "60px",
                    marginLeft: "20px",
                    boxShadow: "var(--card-shadow)",
                  }}
                />
              </div>
              <div
                className="desc"
                style={{
                  gridColumn: "span 9",
                  paddingLeft: "20px",
                  paddingBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "22px",
                    marginBottom: "10px",
                    color: "var(--text-headings)",
                  }}
                >
                  Desk Quant at First Abu Dhabi Bank (FAB)
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  Pricing and hedging of Financial Instruments for exotic rates
                  and credit desk. Used financial mathematics for data driven
                  decision-making.
                </p>
              </div>
            </div>

            {/* Experience Entry 3 */}
            <div
              className="entry row"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "30px",
                marginBottom: "40px",
              }}
            >
              <div
                className="timespan"
                style={{
                  gridColumn: "span 2",
                  fontSize: "16px",
                  textAlign: "right",
                  paddingRight: "25px",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                }}
              >
                2012 - 2014
              </div>
              <div
                className="ico"
                style={{
                  gridColumn: "span 1",
                  borderLeft: "2px solid var(--accent-primary)",
                  position: "relative",
                  height: "100%",
                  minHeight: "100px",
                }}
              >
                <div
                  className="entry-dot"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-10px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-main)",
                    border: "3px solid var(--accent-primary)",
                    zIndex: 2,
                  }}
                />
                <img
                  src="/assets/RBS.jpeg"
                  alt="RBS"
                  style={{
                    borderRadius: "10px",
                    width: "60px",
                    marginLeft: "20px",
                    boxShadow: "var(--card-shadow)",
                  }}
                />
              </div>
              <div
                className="desc"
                style={{
                  gridColumn: "span 9",
                  paddingLeft: "20px",
                  paddingBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "22px",
                    marginBottom: "10px",
                    color: "var(--text-headings)",
                  }}
                >
                  Senior Quant at RBS
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  Led Counterparty Credit Risk and CVA Quant teams. Worked on
                  simulation on Big-Data for Financial decision making.
                </p>
              </div>
            </div>

            {/* Experience Entry 4 */}
            <div
              className="entry row"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "30px",
                marginBottom: "40px",
              }}
            >
              <div
                className="timespan"
                style={{
                  gridColumn: "span 2",
                  fontSize: "16px",
                  textAlign: "right",
                  paddingRight: "25px",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                }}
              >
                2010 - 2012
              </div>
              <div
                className="ico"
                style={{
                  gridColumn: "span 1",
                  borderLeft: "2px solid var(--accent-primary)",
                  position: "relative",
                  height: "100%",
                  minHeight: "100px",
                }}
              >
                <div
                  className="entry-dot"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "-10px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-main)",
                    border: "3px solid var(--accent-primary)",
                    zIndex: 2,
                  }}
                />
                <img
                  src="/assets/nomura.jpeg"
                  alt="Nomura"
                  style={{
                    borderRadius: "10px",
                    width: "60px",
                    marginLeft: "20px",
                    boxShadow: "var(--card-shadow)",
                  }}
                />
              </div>
              <div
                className="desc"
                style={{
                  gridColumn: "span 9",
                  paddingLeft: "20px",
                  paddingBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "22px",
                    marginBottom: "10px",
                    color: "var(--text-headings)",
                  }}
                >
                  Associate at Nomura
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                >
                  Pricing and hedging of Financial Instruments for credit
                  derivatives desk.
                </p>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Speaking Section */}
        <div
          className="card-section"
          id="speaking"
          style={{ ...cardSectionStyle, backgroundColor: "var(--bg-main)" }}
        >
          <div className="container" style={containerStyle}>
            <div className="ctitle" style={ctitleStyle}>
              Speaking
            </div>

            {/* Year Filter */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap", justifyContent: "center" }}>
              {["All Years", "2025-2026", "2020-2024"].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: selectedYear === year ? "none" : "1px solid var(--accent-primary)",
                    backgroundColor: selectedYear === year ? "var(--text-primary)" : "transparent",
                    color: selectedYear === year ? "var(--bg-main)" : "var(--text-primary)",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="card-container" style={cardContainerStyle}>
              {/* 2025-2026 Events */}
              {(selectedYear === "All Years" || selectedYear === "2025-2026") && (
                <>
                  {/* Momentum AI Finance USA 2025 - Nov 2025 */}
                  <div className="card" data-aos="fade-up" style={cardStyle}>
                    <a
                      href="https://www.linkedin.com/posts/reutersmomentum_momentumai-aiinfinance-reutersevents-activity-7396280453994795008-BNEm?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAFvk8oBy9tFYIlSmfbOJjR10UJKrDoaqaI"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          height: "250px",
                        }}
                      >
                        <img
                          src="/assets/momentum.png"
                          alt="Momentum AI Finance USA 2025"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                    </a>
                    <div
                      className="cdesc"
                      style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                        backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          Nov 2025
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          Conference
                        </span>
                      </div>
              <h3
                style={{
                  fontSize: "22px",
                          fontWeight: 700,
                  color: "var(--text-headings)",
                          marginBottom: "8px",
                }}
              >
                        Momentum AI Finance USA 2025
              </h3>
                    </div>
                  </div>
                  
                  {/* NexGen Banking Summit USA 2025 - Nov 2025 */}
                  <div className="card" data-aos="fade-up" data-aos-delay="100" style={cardStyle}>
                    <a
                      href="https://www.linkedin.com/posts/nexgen-banking-summit_nexgenbankingsummit-aiinfinance-quantanalytics-activity-7391910260099375104-Tdt_?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAFvk8oBy9tFYIlSmfbOJjR10UJKrDoaqaI"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                  style={{
                        overflow: "hidden",
                        position: "relative",
                        height: "250px",
                      }}
                      >
                        <img
                          src="/assets/Bank-tech.png"
                          alt="NexGen Banking Summit USA 2025"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                    </a>
                    <div
                      className="cdesc"
                      style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                  fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          Nov 2025
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          Summit
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                  color: "var(--text-headings)",
                          marginBottom: "8px",
                }}
              >
                        NexGen Banking Summit USA 2025
              </h3>
                  </div>
                  </div>
                  
                  {/* AI4 2025 Conference - Aug 2025 */}
                  <div className="card" data-aos="fade-up" data-aos-delay="200" style={cardStyle}>
                    <a
                      href="https://www.linkedin.com/posts/hariomtatsat_genai-interpretability-finance-activity-7359161390869147649-iYKU?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAFvk8oBy9tFYIlSmfbOJjR10UJKrDoaqaI"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                  style={{
                          overflow: "hidden",
                          position: "relative",
                          height: "250px",
                        }}
                      >
                        <img
                          src="/assets/Interp_vegas1.png"
                          alt="AI4 2025 Conference"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                  }}
                  onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                    </a>
                <div
                      className="cdesc"
                  style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          Aug 2025
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          Conference
                        </span>
                  </div>
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "var(--text-headings)",
                          marginBottom: "8px",
                        }}
                      >
                        AI4 2025 Conference
                      </h3>
                  </div>
                  </div>
                </>
              )}

              {/* 2020-2024 Events */}
              {(selectedYear === "All Years" || selectedYear === "2020-2024") && (
                <>
                  {/* Data Science Salon - Reinforcement Learning Interpretability - 2022 */}
                  <div className="card" data-aos="fade-up" style={cardStyle}>
                    <a
                      href="https://www.datascience.salon/hariom-tatsat/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          height: "250px",
                        }}
                      >
                        <img
                          src="/assets/Featuredtalk3.jpeg"
                          alt="Data Science Salon - Reinforcement Learning Interpretability"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                    </a>
                    <div
                      className="cdesc"
                      style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                        backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          2022
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          Conference
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "var(--text-headings)",
                          marginBottom: "8px",
                        }}
                      >
                        Data Science Salon - Reinforcement Learning Interpretability
                      </h3>
                    </div>
                  </div>

                  {/* FinTech DevNight NYC - Sep 2024 */}
                  <div className="card" data-aos="fade-up" style={cardStyle}>
                    <a
                      href="https://www.linkedin.com/posts/finteda_fintech-ai-quantfinance-activity-7369003354510864389-gljR?utm_source=share&utm_medium=member_desktop_web&rcm=ACoAAAFvk8oBy9tFYIlSmfbOJjR10UJKrDoaqaI"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          height: "250px",
                        }}
                      >
                        <img
                          src="/assets/finteda.png"
                          alt="FinTech DevNight NYC"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                </div>
                    </a>
                <div
                      className="cdesc"
                  style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          Sep 2024
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          DevNight
                        </span>
              </div>
              <h3
                style={{
                  fontSize: "22px",
                          fontWeight: 700,
                  color: "var(--text-headings)",
                          marginBottom: "8px",
                }}
              >
                        FinTech DevNight NYC - QUANT X AI
              </h3>
                  </div>
                  </div>
                  
                  {/* Mia AI Global AI Summit - Sep 2024 */}
                  <div className="card" data-aos="fade-up" data-aos-delay="100" style={cardStyle}>
                    <a
                      href="https://www.linkedin.com/posts/janna-salokangas-999a07a1_mia-ai-global-ai-summit-is-here-join-activity-7237044317695950848-nTqP?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAAFvk8oBy9tFYIlSmfbOJjR10UJKrDoaqaI"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                  style={{
                        overflow: "hidden",
                        position: "relative",
                        height: "250px",
                      }}
                      >
                        <img
                          src="/assets/mia.png"
                          alt="Mia AI Global AI Summit"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                  }}
                  onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                    </a>
                    <div
                      className="cdesc"
                      style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          Sep 2024
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          Summit
                        </span>
                  </div>
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "var(--text-headings)",
                          marginBottom: "8px",
                        }}
                      >
                        Mia AI Global AI Summit
                      </h3>
                  </div>
                  </div>

                  {/* Data Science Salon - 2024 */}
                  <div className="card" data-aos="fade-up" data-aos-delay="200" style={cardStyle}>
                    <a
                      href="https://www.datascience.salon/miami-2024"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          height: "250px",
                        }}
                      >
                        <img
                          src="/assets/Featuredtalk2.jpeg"
                          alt="Data Science Salon"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                </div>
                    </a>
                    <div
                      className="cdesc"
                      style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                        backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          2024
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          Conference
                        </span>
                  </div>
              <h3
                style={{
                  fontSize: "22px",
                          fontWeight: 700,
                          color: "var(--text-headings)",
                          marginBottom: "8px",
                        }}
                      >
                        Data Science Salon
                      </h3>
              </div>
            </div>

                  {/* AI Summit New York - 2024 */}
                  <div className="card" data-aos="fade-up" data-aos-delay="300" style={cardStyle}>
                    <a
                      href="https://theaisummit.com/newyork/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          height: "250px",
                        }}
                      >
                        <img
                          src="/assets/ai_summit_newyork.jpg"
                          alt="AI Summit New York 2024"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                    </a>
                    <div
                      className="cdesc"
                      style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                        backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          2024
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          Summit
                        </span>
                      </div>
              <h3
                style={{
                  fontSize: "22px",
                          fontWeight: 700,
                  color: "var(--text-headings)",
                          marginBottom: "8px",
                }}
              >
                        AI Summit New York 2024
              </h3>
                    </div>
                  </div>

                  {/* CQF Institute - 2024 */}
                  <div className="card" data-aos="fade-up" data-aos-delay="400" style={cardStyle}>
                    <a
                      href="https://www.linkedin.com/feed/update/urn:li:activity:6955158172781191169/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                  style={{
                        overflow: "hidden",
                        position: "relative",
                        height: "250px",
                      }}
                      >
                        <img
                          src="/assets/CQF.jpeg"
                          alt="CQF Institute"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                    </a>
                    <div
                      className="cdesc"
                      style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          2024
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          Conference
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "var(--text-headings)",
                          marginBottom: "8px",
                        }}
                      >
                        CQF Institute
                      </h3>
                  </div>
                  </div>

                  {/* AI Fin NYC - 2024 */}
                  <div className="card" data-aos="fade-up" data-aos-delay="500" style={cardStyle}>
                    <a
                      href="https://aifin.nyc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                    >
                      <div
                        className="ccimg"
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          height: "250px",
                        }}
                      >
                        <img
                          src="/assets/htt2.jpeg"
                          alt="AI Fin NYC"
                          style={{
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.5s ease",
                            objectFit: "cover",
                  }}
                  onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />
                      </div>
                    </a>
                    <div
                      className="cdesc"
                      style={{
                        padding: "25px",
                        flexGrow: 1,
                        fontSize: "16px",
                        lineHeight: 1.6,
                        color: "var(--text-primary)",
                        backgroundColor: "var(--bg-card)",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--text-primary)",
                            color: "var(--bg-main)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          2024
                        </span>
                        <span
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "var(--bg-card)",
                            color: "var(--text-primary)",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          Panel
                        </span>
                  </div>
                      <h3
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "var(--text-headings)",
                          marginBottom: "8px",
                        }}
                      >
                    AI Fin NYC
                      </h3>
                  </div>
                  </div>
                </>
              )}
                  </div>
              </div>
            </div>

        {/* Section Separator */}
        <div
          style={{
            width: "100%",
            padding: "80px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              maxWidth: "800px",
              height: "2px",
              background: "linear-gradient(to right, transparent, var(--text-primary), var(--text-primary), transparent)",
              opacity: 0.4,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--text-primary)",
                opacity: 0.6,
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        {/* Books Section */}
        <div
          className="card-section"
          id="books"
          style={{ ...cardSectionStyle, backgroundColor: "var(--bg-main)" }}
        >
          <div className="container" style={containerStyle}>
            <div className="ctitle" style={ctitleStyle}>
              Books
            </div>

            {/* Book Section */}
            <div
              data-aos="fade-up"
              className="book-section-container"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "50px",
                marginBottom: "60px",
                padding: "60px",
                backgroundColor: "var(--bg-card)",
                borderRadius: "16px",
                boxShadow: "var(--card-shadow)",
                maxWidth: "1200px",
                margin: "0 auto 60px",
              }}
            >
              <div style={{ flexShrink: 0 }} className="book-image-container">
                <img
                  src="/assets/2two.jpg"
                  alt="Machine Learning & Data Science Blueprints for Finance"
                  style={{
                    width: "300px",
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
                  }}
                />
              </div>
            <div className="book-content-container">
                <p
                  style={{
                    fontSize: "18px",
                    color: "var(--text-secondary)",
                    marginBottom: "30px",
                    fontStyle: "italic",
                  }}
                >
                  No. 1 new release on Amazon.com in the AI category
                </p>
                
                <div
                  style={{
                    marginBottom: "30px",
                    padding: "20px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "20px",
                    }}
                  >
                    Features of this book:
                  </h4>
                  <ul
                    style={{
                      fontSize: "15px",
                      color: "var(--text-primary)",
                      lineHeight: 1.8,
                      paddingLeft: "20px",
                      margin: 0,
                    }}
                  >
                    <li style={{ marginBottom: "8px" }}>20+ real-world case studies of AI/ML in Finance</li>
                    <li style={{ marginBottom: "8px" }}>Supervised learning for trading, pricing, and portfolio management</li>
                    <li style={{ marginBottom: "8px" }}>Classification models for risk prediction and fraud detection</li>
                    <li style={{ marginBottom: "8px" }}>Dimensionality reduction for portfolio optimization</li>
                    <li style={{ marginBottom: "8px" }}>Clustering algorithms for pattern recognition</li>
                    <li style={{ marginBottom: "8px" }}>Reinforcement learning for trading and hedging</li>
                    <li style={{ marginBottom: "8px" }}>NLP techniques for sentiment analysis</li>
                    <li style={{ marginBottom: "8px" }}>Code examples included for practice</li>
                  </ul>
                </div>

                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginTop: "30px" }}>
                  <a
                    href="https://www.amazon.com/Machine-Learning-Science-Blueprints-Finance/dp/1492073059"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "14px 28px",
                      backgroundColor: "var(--accent-primary)",
                      color: "var(--bg-main)",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "var(--hover-transition)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Buy on Amazon
                  </a>
                  <a
                    href="https://www.oreilly.com/library/view/machine-learning-and/9781492073054/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "14px 28px",
                      backgroundColor: "transparent",
                      color: "var(--accent-primary)",
                      border: "2px solid var(--accent-primary)",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "var(--hover-transition)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent-primary)";
                      e.currentTarget.style.color = "var(--bg-main)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--accent-primary)";
                    }}
                  >
                    Read on O'Reilly
                  </a>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    marginTop: "20px",
                    fontStyle: "italic",
                  }}
                >
                  Published: December 2020 by O'Reilly Media | Authors: Hariom Tatsat, Sahil Puri & Brad Lookabaugh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Separator */}
        <div
          style={{
            width: "100%",
            padding: "80px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              maxWidth: "800px",
              height: "2px",
              background: "linear-gradient(to right, transparent, var(--text-primary), var(--text-primary), transparent)",
              opacity: 0.4,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--text-primary)",
                opacity: 0.6,
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        {/* Papers Section */}
        <div
          className="card-section"
          id="papers"
          style={{ ...cardSectionStyle, backgroundColor: "var(--bg-card)" }}
        >
          <div className="container" style={containerStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
              <div className="ctitle" style={ctitleStyle}>
                Papers
              </div>
              <a
                href="https://scholar.google.com/citations?hl=en&user=IU2b2KQAAAAJ"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "transparent",
                  color: "var(--accent-primary)",
                  border: "1px solid var(--accent-primary)",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent-primary)";
                  e.currentTarget.style.color = "var(--bg-main)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--accent-primary)";
                }}
              >
                View on Google Scholar →
              </a>
            </div>
            <div className="card-container" style={cardContainerStyle}>
              {/* Paper 1 - Beyond the Black Box */}
              <div className="card" data-aos="fade-up" style={cardStyle}>
                <div
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "10px",
                        fontWeight: 600,
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      arXiv
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    Beyond the Black Box: Interpretability of LLMs in Finance
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "15px",
                      flexGrow: 1,
                    }}
                  >
                    Explores methods for making large language models transparent and trustworthy in financial applications. The paper introduces neuroscience-inspired mechanistic interpretability techniques to understand model decision-making processes.
                  </p>
                  <a
                    href="https://arxiv.org/abs/2505.24650"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      backgroundColor: "transparent",
                      color: "var(--accent-primary)",
                      border: "1px solid var(--accent-primary)",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      alignSelf: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent-primary)";
                      e.currentTarget.style.color = "var(--bg-main)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--accent-primary)";
                    }}
                  >
                    Read Paper →
                  </a>
                </div>
              </div>

              {/* Paper 2 - New Google Scholar Paper */}
              <div className="card" data-aos="fade-up" style={cardStyle}>
                <div
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "10px",
                        fontWeight: 600,
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Google Scholar
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    Research Publication
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "15px",
                      flexGrow: 1,
                    }}
                  >
                    A research contribution exploring advanced topics in AI and finance. This work contributes to the understanding of computational methods and their applications in financial systems.
                  </p>
                  <a
                    href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=IU2b2KQAAAAJ&citation_for_view=IU2b2KQAAAAJ:u-x6o8ySG0sC"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      backgroundColor: "transparent",
                      color: "var(--accent-primary)",
                      border: "1px solid var(--accent-primary)",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      alignSelf: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent-primary)";
                      e.currentTarget.style.color = "var(--bg-main)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--accent-primary)";
                    }}
                  >
                    Read Paper →
                  </a>
                </div>
              </div>

              {/* Paper 3 - Robust Risk-Aware Reinforcement Learning */}
              <div className="card" data-aos="fade-up" style={cardStyle}>
                <div
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "10px",
                        fontWeight: 600,
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      SIAM
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    Robust Risk-Aware Reinforcement Learning
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "15px",
                      flexGrow: 1,
                    }}
                  >
                    A risk-aware reinforcement learning framework that addresses financial decision-making under uncertainty. The approach combines robust optimization with risk-sensitive policies to improve performance in volatile market conditions.
                  </p>
                  <a
                    href="https://epubs.siam.org/doi/abs/10.1137/21M144640X"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      backgroundColor: "transparent",
                      color: "var(--accent-primary)",
                      border: "1px solid var(--accent-primary)",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      alignSelf: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent-primary)";
                      e.currentTarget.style.color = "var(--bg-main)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--accent-primary)";
                    }}
                  >
                    Read Paper →
                  </a>
                </div>
              </div>

              {/* Paper 4 - Deep Q-Network Interpretability */}
              <div className="card" data-aos="fade-up" style={cardStyle}>
                <div
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "var(--accent-primary)",
                        color: "var(--bg-main)",
                        fontSize: "10px",
                        fontWeight: 600,
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      SSRN
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--text-headings)",
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    Deep Q-Network Interpretability: Applications to ETF Trading
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      marginBottom: "15px",
                      flexGrow: 1,
                    }}
                  >
                    Presents an interpretable deep reinforcement learning framework for exchange-traded fund trading strategies. The work enables visual, user-friendly insights into RL decision-making processes for financial applications.
                  </p>
                  <a
                    href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3973146"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      backgroundColor: "transparent",
                      color: "var(--accent-primary)",
                      border: "1px solid var(--accent-primary)",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      alignSelf: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent-primary)";
                      e.currentTarget.style.color = "var(--bg-main)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--accent-primary)";
                    }}
                  >
                    Read Paper →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Separator */}
        <div
          style={{
            width: "100%",
            padding: "80px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              maxWidth: "800px",
              height: "2px",
              background: "linear-gradient(to right, transparent, var(--text-primary), var(--text-primary), transparent)",
              opacity: 0.4,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--text-primary)",
                opacity: 0.6,
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        {/* Media Mentions Section */}
        <div
          className="card-section"
          id="media"
          style={{ ...cardSectionStyle, backgroundColor: "var(--bg-card)" }}
        >
          <div className="container" style={containerStyle}>
            <div className="ctitle" style={ctitleStyle}>
              Media Mentions
            </div>
            <div className="card-container" style={cardContainerStyle}>
              <div className="card" data-aos="fade-up" style={cardStyle}>
                <a
                  href="https://thechicagojournal.com/hariom-tatsat-a-quant-striving-to-bridge-the-worlds-of-finance-and-machine-learning/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/test2mention.png"
                      alt="Chicago Journal Article"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  A Quant Striving to Bridge the Worlds of Finance and ML
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="100" style={cardStyle}>
                <a
                  href="https://economicinsider.com/unveiling-the-next-gen-of-generative-ai-and-chatgpt-in-finance-in-transforming-the-financial-landscape/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/htec.webp"
                      alt="Economic Insider Article"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Unveiling the Next-Gen of Generative AI and ChatGPT in Finance
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="200" style={cardStyle}>
                <a
                  href="https://ceoweekly.com/a-remarkable-journey-from-a-small-town-in-india-to-wall-street-and-beyond/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/ceo.png"
                      alt="CEO Weekly Article"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  A Remarkable Journey: From a Small Town in India to Wall Street
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="300" style={cardStyle}>
                <a
                  href="https://usinsider.com/bridging-the-gap-between-machine-learning-and-finance-expert-insights-from-hariom-tatsat/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/us.jpg"
                      alt="US Insider Article"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Bridging the Gap Between ML and Finance
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="400" style={cardStyle}>
                <a
                  href="https://www.outlookindia.com/business-spotlight/hariom-tatsats-journey-of-financial-innovation-through-ai-and-machine-learning"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/ot.png"
                      alt="Outlook India Article"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Journey Of Financial Innovation Through AI And ML
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="500" style={cardStyle}>
                <a
                  href="https://sanfranciscopost.com/the-future-is-here-how-ai-will-transform-investment-and-asset-allocation/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/sf.png"
                      alt="San Francisco Post Article"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  The Future is Here: How AI Will Transform Investment and Asset
                  Allocation
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="600" style={cardStyle}>
                <a
                  href="https://nywire.com/up-and-close-interview-with-hariom-tatsat-author-and-expert-in-ai-in-finance/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/htny.webp"
                      alt="NY Wire Interview"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Up and Close Interview with Hariom Tatsat
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="700" style={cardStyle}>
                <a
                  href="https://nyweekly.com/business/reinforcement-learning-the-untapped-frontier-in-algorithmic-trading-spearheaded-by-hariom-tatsats-in-collaboration-with-leihigh-university/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/ny-weekly-logo.jpg"
                      alt="NY Weekly Article"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Reinforcement Learning: The Untapped Frontier in Algorithmic
                  Trading
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Separator */}
        <div
          style={{
            width: "100%",
            padding: "80px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              maxWidth: "800px",
              height: "2px",
              background: "linear-gradient(to right, transparent, var(--text-primary), var(--text-primary), transparent)",
              opacity: 0.4,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--text-primary)",
                opacity: 0.6,
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        {/* Articles and Posts */}
        <div
          className="card-section"
          id="article-posts"
          style={{ ...cardSectionStyle, backgroundColor: "var(--bg-main)" }}
        >
          <div className="container" style={containerStyle}>
            <div className="ctitle" style={ctitleStyle}>
              Articles and Posts
            </div>
            <div className="card-container" style={cardContainerStyle}>
              <div className="card" data-aos="fade-up" style={cardStyle}>
                <a
                  href="https://aimresearch.co/2023/10/04/adoption-of-ai-gen-ai-in-finance-with-hariom-tatsat/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/Featuredtalk1.jpeg"
                      alt="Adoption of AI/Gen AI in Finance with Hariom Tatsat"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Adoption of AI/Gen AI in Finance with Hariom Tatsat
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="100" style={cardStyle}>
                <a
                  href="https://www.linkedin.com/in/hariomtatsat/recent-activity/all/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/linkedin.jpg"
                      alt="LLM Interpretability in Finance"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Inside the Black box: LLM Interpretability in Finance
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="200" style={cardStyle}>
                <a
                  href="https://www.linkedin.com/posts/hariomtatsat_introducing-bloomberggpt-bloombergs-50-activity-7054862889060360193-nmV_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/bloombergpt.jpeg"
                      alt="Bloomberg GPT AI"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Is BloombergGPT the ultimate AI-based solution for
                  finance-related tasks?
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="300" style={cardStyle}>
                <a
                  href="https://www.linkedin.com/posts/hariomtatsat_machine-learning-and-data-science-blueprints-activity-6775450726555553792-Ub0D/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/ai_portfolio_management.png"
                      alt="AI in Portfolio management"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  AI in Portfolio management
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="400" style={cardStyle}>
                <a
                  href="https://www.linkedin.com/posts/hariomtatsat_machine-learning-and-data-science-blueprints-activity-6765329570196463616-wA_T/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/rl_in_finance.png"
                      alt="Reinforcement Learning in Finance"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Reinforcement Learning in Finance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses and Workshop - DISABLED */}
        {false && (
        <div
          className="card-section"
          id="courses"
          style={{ ...cardSectionStyle, backgroundColor: "var(--bg-card)" }}
        >
          <div className="container" style={containerStyle}>
            <div className="ctitle" style={ctitleStyle}>
              Courses and Workshop
            </div>
            <div className="card-container" style={cardContainerStyle}>
              <div className="card" data-aos="fade-up" data-aos-delay="100" style={cardStyle}>
                <a
                  href="https://finmlcourse.thinkific.com/courses/ML"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/one1.jpg"
                      alt="ML in Finance Course"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Machine Learning in Finance
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="200" style={cardStyle}>
                <a
                  href="https://finmlcourse.thinkific.com/courses/algo-trading-courses-multiverse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/three3.jpg"
                      alt="Algo Trading Course"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Algo Trading Multiverse
                </div>
              </div>

              <div className="card" data-aos="fade-up" style={cardStyle}>
                <a
                  href="https://masterclass.economictimes.indiatimes.com/ai-generative-ai-finance-services-hariom-tatsat"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/CT1.png"
                      alt="AI Finance Masterclass"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  AI and Generative AI for Finance Masterclass (Online
                  Interactive Workshop)
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="200" style={cardStyle}>
                <a
                  href="https://www.careers360.com/colleges/indian-school-of-business-hyderabad-campus/advanced-programme-in-leadership-and-digital-innovation-in-finance-certification-course"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/ISB.jpeg"
                      alt="ISB Programme"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Advanced Programme in Leadership and Digital Innovation
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Awards Section - DISABLED */}
        {false && (
        <div
          className="card-section"
          id="awards"
          style={{ ...cardSectionStyle, backgroundColor: "var(--bg-card)" }}
        >
          <div className="container" style={containerStyle}>
            <div className="ctitle" style={ctitleStyle}>
              Awards
            </div>
            <div className="card-container" style={cardContainerStyle}>
              <div className="card" data-aos="fade-up" style={cardStyle}>
                <a
                  href="https://drive.google.com/file/d/1Cph8GqihmE742pVF5m9mTr6-3TWYvn7r/view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/award1.png"
                      alt="Indian Achievers Forum Award"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Award for outstanding professional achievement and contribution
                  to nation building, presented by the Indian Achievers' Forum.
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="100" style={cardStyle}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/sr.png"
                      alt="Arxiv Publication RDEU"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Robust risk-aware RL using RDEU and Wasserstein distance to
                  optimize financial decisions under uncertainty and downside
                  risk.
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="200" style={cardStyle}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/ell1.png"
                      alt="SSRN Publication Interpretability"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Interpretability framework for Deep Q-Learning applied to ETF
                  trading, enabling visual, user-friendly insights into RL
                  decision-making processes.
                </div>
              </div>

              <div className="card" data-aos="fade-up" data-aos-delay="300" style={cardStyle}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div
                    className="ccimg"
                    style={{
                      overflow: "hidden",
                      position: "relative",
                      height: "200px",
                    }}
                  >
                    <img
                      src="/assets/ssrn.png"
                      alt="SSRN Publication Risk Tolerance"
                      style={{
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.5s ease",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </a>
                <div
                  className="cdesc"
                  style={{
                    padding: "20px",
                    flexGrow: 1,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  Analyzing investor risk tolerance using machine learning to
                  correct biases, adapt to market changes, and optimize
                  long-term asset allocation.
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Section Separator */}
        <div
          style={{
            width: "100%",
            padding: "80px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              maxWidth: "800px",
              height: "2px",
              background: "linear-gradient(to right, transparent, var(--text-primary), var(--text-primary), transparent)",
              opacity: 0.4,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "var(--text-primary)",
                opacity: 0.6,
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>

        {/* Contact Section */}
        <section
          id="contact"
          style={{
            padding: "80px 0",
            backgroundColor: "var(--bg-main)",
          }}
        >
          <div className="container" style={containerStyle}>
            <h2
              style={{
                ...ctitleStyle,
                marginBottom: "40px",
              }}
            >
              Contact
            </h2>
            <div
              style={{
                textAlign: "center",
                maxWidth: "600px",
                margin: "0 auto",
                position: "relative",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "var(--text-primary)",
                  marginBottom: "30px",
                  lineHeight: 1.8,
                }}
              >
                For inquiries, speaking engagements, or collaborations, please reach out:
              </p>
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
                data-contact-dropdown
              >
                <button
                  onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                  data-contact-dropdown
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "18px",
                    color: "var(--text-headings)",
                    padding: "15px 30px",
                    border: "2px solid var(--text-primary)",
                    borderRadius: "8px",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "var(--hover-transition)",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--text-primary)";
                    e.currentTarget.style.color = "var(--bg-main)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-headings)";
                  }}
                >
                  Contact
                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {contactDropdownOpen ? "▲" : "▼"}
                  </span>
                </button>
                {contactDropdownOpen && (
                  <div
                    data-contact-dropdown
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      marginTop: "10px",
                      backgroundColor: "var(--bg-main)",
                      border: "2px solid var(--text-primary)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px var(--shadow-color)",
                      minWidth: "250px",
                      zIndex: 1000,
                      overflow: "hidden",
                    }}
                  >
                    <a
                      href="mailto:hariom_tatsat@mfe.berkeley.edu"
                      onClick={() => setContactDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "15px 20px",
                        color: "var(--text-headings)",
                        textDecoration: "none",
                        fontSize: "16px",
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
                      onClick={() => setContactDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "15px 20px",
                        color: "var(--text-headings)",
                        textDecoration: "none",
                        fontSize: "16px",
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
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "var(--bg-footer)",
            color: "var(--text-primary)",
            padding: "60px 0 30px",
          }}
        >
          <div className="container" style={containerStyle}>
            <div
              className="copyright"
              style={{
                textAlign: "center",
                paddingTop: "30px",
                borderTop: "1px solid var(--text-secondary)",
                color: "var(--text-secondary)",
                fontSize: "14px",
              }}
            >
              © 2025 Hariom Tatsat. All Rights Reserved.
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <a
          href="#"
          className="back-to-top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "var(--button-bg-light)",
            color: "var(--button-text-dark)",
            display: showBackToTop ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            transition: "var(--hover-transition)",
            zIndex: 999,
            opacity: showBackToTop ? 1 : 0,
            visibility: showBackToTop ? "visible" : "hidden",
          }}
        >
          <i className="fas fa-arrow-up" />
        </a>
      </div>
    </>
  );
}
