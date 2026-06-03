import Header from "@/components/Header";
import ContactBlock from "@/components/ContactBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking, Collaboration & Inquiries | Hariom Tatsat",
  description:
    "Conference talks, podcast appearances, research collaboration, and media inquiries — get in touch with Hariom Tatsat.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      <Header />
      <main
        className="max-w-4xl mx-auto px-4 sm:px-6"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        <div className="mb-10">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--text-headings)" }}
          >
            Speaking, collaboration &amp; inquiries
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            I speak at conferences and podcasts on Financial AI, AI interpretability, and quantitative methods. I am also open to research collaborations and media inquiries. Fill in the form below — I read every message.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
          }}
          className="lg:grid-cols-[1fr_280px]"
        >
          <ContactBlock />

          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              paddingTop: "8px",
            }}
            className="hidden lg:flex"
          >
            <div
              style={{
                padding: "24px",
                borderRadius: "12px",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--shadow-color)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--text-headings)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Past venues
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {[
                  "Federal Reserve Bank of Atlanta",
                  "NVIDIA GTC 2026",
                  "AI4 Conference 2025",
                  "O'Reilly",
                  "The AI Summit",
                ].map((v) => (
                  <li
                    key={v}
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      paddingLeft: "12px",
                      borderLeft: "2px solid var(--accent-primary)",
                    }}
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                padding: "24px",
                borderRadius: "12px",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--shadow-color)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--text-headings)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Prefer email?
              </h3>
              <a
                href="mailto:hariom_tatsat@mfe.berkeley.edu"
                style={{
                  fontSize: "14px",
                  color: "var(--accent-primary)",
                  wordBreak: "break-all",
                }}
              >
                hariom_tatsat@mfe.berkeley.edu
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
