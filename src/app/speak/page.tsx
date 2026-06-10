"use client";

import Header from "@/components/Header";

const highlights = [
  "Author of Machine Learning & Data Science Blueprints for Finance (O'Reilly, 2020) — #1 new release on Amazon in AI",
  "Featured speaker at Federal Reserve Bank of Atlanta, NVIDIA GTC, AI4, NexGen Banking Summit, and Momentum AI Finance",
  "Published researcher in AI interpretability — Beyond the Black Box: Interpretability of LLMs in Finance (arXiv, 2025)",
  "Recipient of the Indian Achievers' Award in Machine Learning; EB-1 Extraordinary Ability (Einstein Visa)",
  "VP at Barclays Investment Bank; 15+ years bridging quantitative finance, machine learning, and AI",
];

export default function SpeakPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-main)" }}>
      <Header />

      <main
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        {/* Identity block */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: "48px",
            alignItems: "center",
            marginBottom: "56px",
          }}
          className="speak-identity"
        >
          <div>
            <img
              src="/assets/Picture_bio.jpg"
              alt="Hariom Tatsat"
              style={{
                width: "180px",
                height: "auto",
                borderRadius: "8px",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                boxShadow: "0 4px 20px var(--shadow-color)",
                marginBottom: "12px",
              }}
            />
            <a
              href="/assets/Picture_bio.jpg"
              download="Hariom_Tatsat_Photo.jpg"
              style={{
                display: "block",
                textAlign: "center",
                padding: "7px 0",
                border: "1px solid var(--text-secondary)",
                borderRadius: "6px",
                color: "var(--text-secondary)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textDecoration: "none",
                width: "180px",
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--text-headings)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-headings)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--text-secondary)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
              }}
            >
              ↓ Download Photo
            </a>
          </div>

          <div>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 42px)",
                fontWeight: 700,
                color: "var(--text-headings)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                margin: "0 0 10px",
                lineHeight: 1.1,
              }}
            >
              Hariom Tatsat
            </h1>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 20px",
              }}
            >
              AI Researcher · O'Reilly Author · Speaker
            </p>
            <a
              href="mailto:hariom_tatsat@mfe.berkeley.edu"
              style={{
                display: "inline-block",
                padding: "10px 22px",
                border: "1px solid var(--text-headings)",
                borderRadius: "6px",
                color: "var(--text-headings)",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textDecoration: "none",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--text-headings)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg-main)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-headings)";
              }}
            >
              Speaking Inquiry →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--text-secondary), transparent)",
            opacity: 0.4,
            marginBottom: "48px",
          }}
        />

        {/* Highlights */}
        <section style={{ marginBottom: "56px" }}>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginBottom: "24px",
            }}
          >
            Highlights
          </h2>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {highlights.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(128,128,128,0.15)",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--text-primary)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    marginTop: "6px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "var(--text-headings)",
                    display: "inline-block",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--text-secondary), transparent)",
            opacity: 0.4,
            marginBottom: "48px",
          }}
        />

        {/* Bio */}
        <section style={{ marginBottom: "56px" }}>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginBottom: "20px",
            }}
          >
            Bio
          </h2>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.8,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Hariom has years of experience bridging AI, machine learning,
            quantitative techniques, and finance. He is an O'Reilly author and
            published researcher, with multiple research contributions in AI,
            machine learning, and mechanistic interpretability, particularly
            focused on making large language models more transparent and reliable
            in financial and agentic AI settings. He has been a featured speaker
            at several conferences and industry forums and received the Indian
            Achiever Award in Machine Learning. He completed his MS at UC
            Berkeley and his BE at IIT (India).
          </p>
        </section>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--text-secondary), transparent)",
            opacity: 0.4,
            marginBottom: "48px",
          }}
        />

        {/* Contact */}
        <section>
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginBottom: "16px",
            }}
          >
            Speaking Inquiries
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-primary)",
              lineHeight: 1.7,
              marginBottom: "20px",
            }}
          >
            For conference talks, keynotes, and panel appearances, reach out
            directly by email.
          </p>
          <a
            href="mailto:hariom_tatsat@mfe.berkeley.edu"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              backgroundColor: "var(--text-headings)",
              color: "var(--bg-main)",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
          >
            hariom_tatsat@mfe.berkeley.edu
          </a>
        </section>
      </main>
    </div>
  );
}
